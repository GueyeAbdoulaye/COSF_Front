import { Component, OnInit } from '@angular/core';
import { InscriptionDto } from '../dto/inscriptionDto';
import { CosfService } from '../services/cosf.service';
import { CardPlayerComponent } from "./cardPlayer/card-player";
import { Router } from '@angular/router';
import { DemandeInscriptionComponent } from "../demande-inscription/demande-inscription.component";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inscris',
  imports: [],
  templateUrl: './inscris.component.html',
  styleUrl: './inscris.component.scss'
})
export class InscrisComponent implements OnInit {

  listInscrisDto: InscriptionDto[] = []; 


  constructor(
    private cosfService: CosfService,
    private router: Router
  ){}

  ngOnInit(): void {
    // Fetch inscris data when the component is initialized
    this.getInscris();
  }

  getInscris() {
    this.cosfService.getAllInscription().subscribe({
      next: (data) => {
        this.listInscrisDto = data;
        console.log('Inscris data:', this.listInscrisDto);
      },
      error: (error) => {
        console.error('Error fetching inscris:', error);
      }
    });
  }

  getPageInscriptionById(id: number): void {
    this.router.navigate(["/demande-inscription", id]);
  }



}
