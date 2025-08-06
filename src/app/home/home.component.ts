import { Component, OnDestroy, OnInit } from "@angular/core";
import { CalendarDto } from "../dto/calendar-dto";
import { DatePipe } from "@angular/common";
import { TeamDto } from "../dto/teams-dto";
import { ImageGalleryComponent } from "../image-gallery/image-gallery.component";
import { Subscription } from "rxjs";
import { CosfService } from "../services/cosf.service";

@Component({
  selector: "app-home",
  imports: [DatePipe, ImageGalleryComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit, OnDestroy {
  calendarLastMatch: CalendarDto | null = null;
  calendarNextMatch: CalendarDto | null = null;
  nameTeam?: TeamDto;
  nameTeamNext?: TeamDto; // Séparer les équipes pour éviter les conflits

  public isLastMatch: boolean = false; // Initialiser à false
  public isNextMatch: boolean = false;
  subscriptions: Subscription[] = [];

  nameLogo: String = "logo_basket1"

  constructor(private cosfService: CosfService) {}

  ngOnInit(): void {
    // Charger les deux matches en parallèle
    this.getLastMatch();
    this.getNextMatch();
  }

  getTeam(id: number, isForNextMatch: boolean = false): void {
    let sub = this.cosfService.getTeamById(id).subscribe(
      (response: TeamDto) => {
        if (isForNextMatch) {
          this.nameTeamNext = response;
        } else {
          this.nameTeam = response;
        }
      },
      (error: any) => {
        console.error('Erreur lors du chargement de l\'équipe:', error);
      }
    );
    this.subscriptions.push(sub);
  }

  getNextMatch(): void {
    let sub = this.cosfService.getNextMatch().subscribe(
      (response: CalendarDto) => {
        this.calendarNextMatch = response; // Correction : utiliser calendarNextMatch
        if (response && response.awaitTeamId){
          this.isNextMatch = true;
          this.getTeam(response.awaitTeamId, true); // true pour indiquer que c'est pour le prochain match
        }else {
          this.isNextMatch = false;
        }
      },
      (error: any) => {
        console.error('Erreur lors du chargement du prochain match:', error);
        this.isNextMatch = false;
      }
    );
    this.subscriptions.push(sub);
  }  // Additional methods can be added as needed
  getLastMatch(): void {
    let sub = this.cosfService.getLastMatch().subscribe(
      (response: CalendarDto) => {
        this.calendarLastMatch = response;
        if( response && response.awaitTeamId) {
          this.isLastMatch = true;
          this.getTeam(response.awaitTeamId, false); // false pour indiquer que c'est pour le dernier match
        } else {
          this.isLastMatch = false;
        }
      },
      (error: any) => {
        console.error('Erreur lors du chargement du dernier match:', error);
        this.isLastMatch = false;
      }
    );
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = []; // Clear subscriptions to prevent memory leaks
  }
}
