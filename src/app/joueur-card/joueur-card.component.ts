import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-joueur-card',
  imports: [],
  templateUrl: './joueur-card.component.html',
  styleUrl: './joueur-card.component.scss'
})
export class JoueurCardComponent {

  @Input() playerName: string = '';
  @Input() playerRole: string = '';
  @Input() numberPlayer: number = 0;

}
