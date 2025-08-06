import { Routes } from "@angular/router";
import { CalendarComponent } from "./calendar/calendar.component";
import { StandingComponent } from "./standing/standing.component";
import { HomeComponent } from "./home/home.component";
import { AccessComponent } from "./access/access.component";
import { ContactComponent } from "./contact/contact.component";
import { EffectifComponent } from "./effectif/effectif.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { InscriptionComponent } from "./inscription/inscription.component";
import { InscrisComponent } from "./inscris/inscris.component";
import { DemandeInscriptionComponent } from "./demande-inscription/demande-inscription.component";
import { AuthGuard } from "./login/auth-guard/auth-guard";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent, // Default route
  },
  {
    path: "calendrier",
    component: CalendarComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "classement",
    component: StandingComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "access",
    component: AccessComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
  },
  {
    path: "effectif",
    component: EffectifComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent,  // Login route
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "inscription",
    component: InscriptionComponent
  },
  {
    path: "inscris",
    component: InscrisComponent,
    canActivate: [AuthGuard], // Add any guards if needed
  },
  {
    path: "demande-inscription/:id",
    component: DemandeInscriptionComponent
  },
  {
    path: "**",
    redirectTo: "", // Wildcard route for 404s
  },
];
