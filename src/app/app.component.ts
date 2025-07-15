import { Component, OnInit } from '@angular/core';
import { CosfTeams } from './dto/cosf-teams';
import { CosfService } from './cosf.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StandingComponent } from "./standing/standing.component";
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  public teams: String[] = [];

  constructor(private cosfTeamsService: CosfService) {}

  
}
