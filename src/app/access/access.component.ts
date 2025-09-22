import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { GoogleMapsModule } from "@angular/google-maps";
import { Constante } from "../../constante/constante";

@Component({
  selector: "app-access",
  imports: [MatButtonModule, MatDividerModule, MatIconModule, GoogleMapsModule],
  templateUrl: "./access.component.html",
  styleUrl: "./access.component.scss",
})
export class AccessComponent {
  zoom = 18;
  center: google.maps.LatLngLiteral = { lat: 45.6963463, lng: 4.8538717 };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition = { lat: 45.69633, lng: 4.8538717 };

   readonly constante = Constante;

  constructor() {
  }
  openInGoogleMaps() {
    const url = `https://www.google.com/maps/search/?api=1&query=${this.center.lat},${this.center.lng}`;
    window.open(url, "_blank");
  }
}
