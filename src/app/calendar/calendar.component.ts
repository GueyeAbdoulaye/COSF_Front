import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,

} from "@angular/core";
import { CalendarDto } from "../dto/calendar-dto";
import { MatIconModule } from "@angular/material/icon";
import { TeamDto } from "../dto/teams-dto";
import { DatePipe } from "@angular/common";
import { Subscription } from "rxjs";
import { CosfService } from "../services/cosf.service";
import { Constante } from "../../constante/constante";

@Component({
  selector: "app-calendar",
  imports: [ MatIconModule, DatePipe],
  templateUrl: "./calendar.component.html",
  styleUrl: "./calendar.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit, OnDestroy {

  public readonly constante = Constante;

  listMatchs: CalendarDto[] = [];

  // Cache teams by ID to avoid repeated API calls
  teamsCache: { [key: number]: TeamDto } = {};

  nameLogo: String = "logo_basket1";

  isMatchNotComingUp: boolean = false;

  subscriptions: Subscription[] = [];

  // Prevent multiple rapid clicks
  isLoading: boolean = false;

  constructor(
    private cosfService: CosfService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllUpcomingMatches();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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

  private loadTeamsForMatches(): void {
    // Get unique team IDs to avoid duplicate API calls
    const uniqueTeamIds = [...new Set(this.listMatchs
      .map(match => match.awaitTeamId)
      .filter(id => id && !this.teamsCache[id])
    )];

    uniqueTeamIds.forEach(teamId => {
      this.loadTeam(teamId);
    });
  }

  getAllMatches(): void {
    if (this.isLoading) return; // Prevent multiple rapid calls
    this.isLoading = true;
    
    // Clear previous data to avoid conflicts
    this.listMatchs = [];
    this.teamsCache = {};
    
    let sub = this.cosfService.getAllCalendars().subscribe(
      (response: CalendarDto[]) => {
        this.listMatchs = response;
        this.isMatchNotComingUp = response.length === 0;
        this.loadTeamsForMatches();
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      (error: any) => {
        console.error(error.message);
        this.isMatchNotComingUp = true;
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    );
    this.subscriptions.push(sub);
  }

  getAllPlayedMatches(): void {
    if (this.isLoading) return; // Prevent multiple rapid calls
    this.isLoading = true;
    
    // Clear previous data to avoid conflicts
    this.listMatchs = [];
    this.teamsCache = {};
    
    let sub = this.cosfService.getAllPlayedMatches().subscribe(
      (response: CalendarDto[]) => {
        this.listMatchs = response;
        this.isMatchNotComingUp = response.length === 0;
        this.loadTeamsForMatches();
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      (error: any) => {
        console.error(error.message);
        this.isMatchNotComingUp = true;
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    );

    this.subscriptions.push(sub);
  }

  getAllUpcomingMatches(): void {
    if (this.isLoading) return; // Prevent multiple rapid calls
    this.isLoading = true;
    
    // Clear previous data to avoid conflicts
    this.listMatchs = [];
    this.teamsCache = {};
    
    let sub = this.cosfService.getAllUpcomingMatches().subscribe(
      (response: CalendarDto[]) => {
        this.listMatchs = response;
        this.isMatchNotComingUp = response.length === 0;
        this.loadTeamsForMatches();
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      (error: any) => {
        console.error(error.message);
        this.isMatchNotComingUp = true;
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    );

    this.subscriptions.push(sub);
  }
}
