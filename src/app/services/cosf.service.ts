import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { FormGroup } from "@angular/forms";
import { InscriptionDto } from "../dto/inscriptionDto";
import { environment } from "../../environments/environment";
import { TeamDto } from "../dto/teams-dto";
import { StandingDto } from "../dto/standing-dto";
import { CalendarDto } from "../dto/calendar-dto";
import { ContactDto } from "../dto/contact-dto";

@Injectable({
  providedIn: "root",
})
export class CosfService {
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //Service about Team
  public getAllTeams(): Observable<String[]> {
    return this.http.get<String[]>(`${this.apiServerUrl}/api/v1/teams/all`);
  }

  public getTeamById(id: number): Observable<TeamDto> {
    return this.http.get<TeamDto>(`${this.apiServerUrl}/api/v1/teams/${id}`);
  }

  //Service about Standing
  public getAllStandings(): Observable<StandingDto[]> {
    return this.http.get<StandingDto[]>(
      `${this.apiServerUrl}/api/v1/standing/all`
    );
  }
  public getStandingBySeasonId(seasonId: number): Observable<StandingDto[]> {
    return this.http.get<StandingDto[]>(
      `${this.apiServerUrl}/api/v1/standing/${seasonId}`
    );
  }

  //Service about Calendar
  public getAllCalendars(): Observable<CalendarDto[]> {
    return this.http.get<CalendarDto[]>(
      `${this.apiServerUrl}/api/v1/calendar/all`
    );
  }

  public getAllPlayedMatches(): Observable<CalendarDto[]> {
    return this.http.get<CalendarDto[]>(
      `${this.apiServerUrl}/api/v1/calendar/allplayed`
    );
  }

  public getAllUpcomingMatches(): Observable<CalendarDto[]> {
    return this.http.get<CalendarDto[]>(
      `${this.apiServerUrl}/api/v1/calendar/upcoming`
    );
  }

  public getLastMatch(): Observable<CalendarDto> {
    return this.http.get<CalendarDto>(`${this.apiServerUrl}/api/v1/calendar/last`);
  }

  public getNextMatch(): Observable<CalendarDto> {
    return this.http.get<CalendarDto>(`${this.apiServerUrl}/api/v1/calendar/next`);
  }

  //Service about Contact
  public sendContactForm(contact: ContactDto): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/api/v1/contact`, contact);
  }

  //Service about Effectif
  public getAllPlayers(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/api/v1/joueurs/all`);
  }

  //Service about inscription
  public registerClubMember(infoMember: FormGroup): Observable<InscriptionDto> {
    return this.http.post<InscriptionDto>(
      `${this.apiServerUrl}/api/v1/inscription/save`,
      infoMember.value
    );
  }

  public getAllInscription(): Observable<InscriptionDto[]> {
    return this.http.get<InscriptionDto[]>(
      `${this.apiServerUrl}/api/v1/inscription/all`
    );
  }

  public getInscriptionById(id: number): Observable<InscriptionDto> {
    return this.http.get<InscriptionDto>(
      `${this.apiServerUrl}/api/v1/inscription/${id}`
    );
  }
}
