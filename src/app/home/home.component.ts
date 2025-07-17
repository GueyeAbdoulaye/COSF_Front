import { Component, OnInit } from "@angular/core";
import { Calendar } from "../dto/calendar";
import { CosfService } from "../cosf.service";
import { DatePipe } from "@angular/common";
import { Teams } from "../dto/cosf-teams";
import { ImageGalleryComponent } from "../image-gallery/image-gallery.component";

@Component({
  selector: "app-home",
  imports: [DatePipe, ImageGalleryComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  calendarLastMatch: Calendar | null = null;
  calendarNextMatch: Calendar | null = null;
  nameTeam?: Teams;

  public isLastMatch: boolean = true;
  public isNextMatch: boolean = false;

  constructor(private cosfService: CosfService) {}

  ngOnInit(): void {
    this.getLastMatch();
    this.getNextMatch();
  }

  getTeam(id: number): void {
    this.cosfService.getTeamById(id).subscribe(
      (response: Teams) => {
        this.nameTeam = response;
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }

  getNextMatch(): void {
    this.cosfService.getNextMatch().subscribe(
      (response: Calendar) => {
        this.calendarLastMatch = response;
        if (response){
          this.isNextMatch = true;
         this.getTeam(response.awaitTeamId);
        }else {
          this.isNextMatch = false;
        }
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }

  // Additional methods can be added as needed
  getLastMatch(): void {
    this.cosfService.getLastMatch().subscribe(
      (response: Calendar) => {
        this.calendarLastMatch = response;
        if( response) {
          this.isLastMatch = true;
          this.getTeam(response.awaitTeamId);
        } else {
          this.isLastMatch = false;
        }
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }
}
