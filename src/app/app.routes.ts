import { Routes } from "@angular/router";
import { CalendarComponent } from "./calendar/calendar.component";
import { StandingComponent } from "./standing/standing.component";
import { HomeComponent } from "./home/home.component";
import { AccessComponent } from "./access/access.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent, // Default route
  },
  {
    path: "calendrier",
    component: CalendarComponent,
  },
  {
    path: "classement",
    component: StandingComponent,
  },
  {
    path: "access",
    component: AccessComponent,
  },
  {
    path: "**",
    redirectTo: "", // Wildcard route for 404s
  },
];
