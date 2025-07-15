import { Component, OnInit } from '@angular/core';
import { CosfService } from '../cosf.service';
import { CommonModule } from '@angular/common';
import { Standing } from '../dto/standing';

@Component({
  selector: 'app-standing',
  imports: [CommonModule],
  templateUrl: './standing.component.html',
  styleUrl: './standing.component.scss'
})
export class StandingComponent implements OnInit {

  public standings: Standing[] = [];

  constructor(private cosfService: CosfService) {}

  ngOnInit(): void {
    this.getAllStandings();
  }

  getAllStandings(): void {
    this.cosfService.getAllStandings().subscribe(
      (response: Standing[]) => {
        console.log(response);
        this.standings = response;
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }
}
