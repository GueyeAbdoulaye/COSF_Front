import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Constante } from '../../constante/constante';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public readonly constante = Constante;

}
