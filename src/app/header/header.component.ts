import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuBurgerComponent } from "../menu-burger/menu-burger.component";

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MenuBurgerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
