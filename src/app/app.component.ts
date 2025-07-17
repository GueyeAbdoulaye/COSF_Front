import { Component  } from '@angular/core';
import { CosfService } from './cosf.service';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from "./header/header.component";
import { ImageGalleryComponent } from "./image-gallery/image-gallery.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, HeaderComponent, ImageGalleryComponent, HomeComponent, FooterComponent,  RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  public teams: String[] = [];

  constructor(private cosfTeamsService: CosfService) {}

  
}
