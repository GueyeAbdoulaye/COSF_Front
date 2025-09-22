import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuBurgerComponent } from "../menu-burger/menu-burger.component";
import { AuthService } from '../services/auth.service';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip'; // ✅ Import ajouté
import { Constante } from '../../constante/constante';


@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MenuBurgerComponent, MatIcon, MatTooltipModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public readonly constante = Constante;

  constructor(private authService: AuthService) {}


  // Check if the user is logged in
  // This method can be used in the template to conditionally show/hide elements
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Logout method to call the AuthService logout function
  // This can be bound to a button click in the template
  logout(): void {
    this.authService.logout();
  }

}
