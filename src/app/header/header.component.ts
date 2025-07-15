import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideMenu, lucideInstagram } from '@ng-icons/lucide';
import { HlmIconDirective } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-header',
  imports: [NgIconComponent, HlmIconDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [provideIcons({ lucideMenu, lucideInstagram })]
})
export class HeaderComponent {

}
