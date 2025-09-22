import { Component, Input, OnInit } from '@angular/core';
import { InscriptionDto } from '../dto/inscriptionDto';
import { CosfService } from '../services/cosf.service';
import { Router } from '@angular/router';
import { Constante } from '../../constante/constante';

@Component({
  selector: 'app-demande-inscription',
  imports: [],
  templateUrl: './demande-inscription.component.html',
  styleUrl: './demande-inscription.component.scss'
})
export class DemandeInscriptionComponent implements OnInit {

  public readonly constante = Constante;
  @Input()
  inscritDto: InscriptionDto = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: new Date(),
    address: '',
    postalCode: '',
    city: '',
    country: '',
    sex: '',
    mutated: ''
  }

  constructor(
    private cosfService: CosfService,
    private router: Router
  ) {}


  ngOnInit(): void {
    const id = this.router.url.split('/').pop();
    if (id) {
      this.getInscritDto(Number(id));
    }
  }

  getInscritDto(id : number) {
    this.cosfService.getInscriptionById(id).subscribe({
      next: (data) => {
        this.inscritDto = data;
      },
      error: (error) => {
        console.error('Error fetching inscription:', error);
      }
    });
  }
}
