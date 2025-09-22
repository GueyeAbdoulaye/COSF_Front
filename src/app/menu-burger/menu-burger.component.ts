import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface MenuItem {
  label: string;
  route: string;
  icon: string;
}
@Component({
  selector: 'app-menu-burger',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatButtonModule, MatDividerModule, MatIconModule], 
  templateUrl: './menu-burger.component.html',
  styleUrl: './menu-burger.component.scss'
})

export class MenuBurgerComponent implements OnDestroy {

  isMenuOpen = false;

  menuSections: MenuSection[] = [
    {
      title: 'Le Club',
      items: [
        { label: 'Histoire', route: '/histoire', icon: 'history' },
        { label: 'Effectif', route: '/effectif', icon: 'group' },
        { label: 'Inscription', route: '/inscription', icon: 'group' },
        { label: 'Inscris', route: '/inscris', icon: 'group' }
      ]
    },
    {
      title: 'Saison 25/26',
      items: [
        { label: 'Calendrier & Resultat', route: '/calendrier', icon: 'calendar_today' },
        { label: 'Classement', route: '/classement', icon: 'leaderboard' },
      ]
    },
    {
      title: 'Info',
      items: [
        { label: 'Accès', route: '/access', icon: 'map_search' },
        { label: 'Contact', route: '/contact', icon: 'contact_mail' }
      ]
    }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.toggleBodyScroll();
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.enableBodyScroll();
  }

  onMenuItemClick() {
    this.closeMenu();
  }

  trackBySection(index: number, section: MenuSection): string {
    return section.title;
  }

  trackByRoute(index: number, item: MenuItem): string {
    return item.route;
  }

  private toggleBodyScroll() {
    if (this.isMenuOpen) {
      this.disableBodyScroll();
    } else {
      this.enableBodyScroll();
    }
  }

  private disableBodyScroll() {
    document.body.style.overflow = 'hidden';
  }

  private enableBodyScroll() {
    document.body.style.overflow = '';
  }

  ngOnDestroy() {
    // S'assurer que le scroll est réactivé quand le component est détruit
    this.enableBodyScroll();
  }
}
