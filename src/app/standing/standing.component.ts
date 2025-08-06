import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StandingDto } from "../dto/standing-dto";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { TeamDto } from "../dto/teams-dto";
import { Subscription } from "rxjs";
import { CosfService } from "../services/cosf.service";


@Component({
  selector: "app-standing",
  imports: [CommonModule, MatTableModule],
  templateUrl: "./standing.component.html",
  styleUrl: "./standing.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandingComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    "position",
    "equipe",
    "points",
    "wins",
    "losses",
    "draws",
    "pointScored",
    "pointAgainst",
  ];
  dataSource = new MatTableDataSource<StandingDto>();

  public standingSeason: StandingDto[] = [];

  subscriptions: Subscription[] = [];
  nameLogo: String = "logo_basket1";

  // Cache teams by ID to avoid repeated API calls
  teamsCache: { [key: number]: TeamDto } = {};

  constructor(
    private cosfService: CosfService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getStandingBySeason(2)
  }

  getTeamFromCache(id: number): TeamDto | undefined {
    return this.teamsCache[id];
  }

  private loadTeam(id: number): void {
    if (!this.teamsCache[id] && id) {
      let subscription = this.cosfService.getTeamById(id).subscribe(
        (response: TeamDto) => {
          this.teamsCache[id] = response;
          this.cdr.markForCheck(); // Trigger change detection when team data is loaded
        },
        (error: any) => {
          console.error("Error fetching team: " + error.message);
        }
      );
      this.subscriptions.push(subscription);
    }
  }

  private loadTeamsForStanding(): void {
    this.standingSeason.forEach((classement) => {
      if (classement.teamId) {
        this.loadTeam(classement.teamId);
      }
    });
  }

  getStandingBySeason(seasonId: number): void {
    // Clear previous data
    this.standingSeason = [];
    this.dataSource.data = [];
    this.teamsCache = {};
    
    const subscription = this.cosfService.getStandingBySeasonId(seasonId).subscribe(
      (response: StandingDto[]) => {
        this.standingSeason = response;
        this.dataSource.data = response;
        this.loadTeamsForStanding();
        this.cdr.markForCheck();
      },
      (error: any) => {
        alert(error.message);
      }
    );
    this.subscriptions.push(subscription);
  }



  ngOnDestroy(): void {
    // Clean up subscriptions to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
