import { Component,OnInit } from '@angular/core';
import { Calendar } from '../dto/calendar';
import { CosfService } from '../cosf.service';

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {

  public calendars: Calendar[] = [];

  constructor(
    private cosfService: CosfService
  ) {}

  ngOnInit(): void {
    this.getAllCalendars();
  }

  getAllCalendars(): void {
    this.cosfService.getAllCalendars().subscribe(
      (response: Calendar[]) => {
        console.log(response);
        this.calendars = response;
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }

  

}
