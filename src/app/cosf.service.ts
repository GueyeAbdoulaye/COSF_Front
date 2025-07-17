import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Teams } from './dto/cosf-teams';
import { Standing } from './dto/standing';
import { Calendar } from './dto/calendar';

@Injectable({
  providedIn: 'root'
})
export class CosfService {

    private apiServerUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) {}
  
    //Service about Team 
    public getAllTeams(): Observable<String[]> {
      return this.http.get<String[]>(`${this.apiServerUrl}/api/v1/teams/all`);
    }

    public getTeamById(id: number): Observable<Teams> {
      return this.http.get<Teams>(`${this.apiServerUrl}/api/v1/teams/${id}`);
    }

    //Service about Standing
    public getAllStandings(): Observable<Standing[]> {
      return this.http.get<Standing[]>(`${this.apiServerUrl}/api/v1/standing/all`);
    }

    //Service about Calendar
    public getAllCalendars(): Observable<Calendar[]> {
      return this.http.get<Calendar[]>(`${this.apiServerUrl}/api/v1/calendar/all`);
    }

    public getLastMatch(): Observable<Calendar> {
      return this.http.get<Calendar>(`${this.apiServerUrl}/api/v1/calendar/last`);
    }

     public getNextMatch(): Observable<Calendar> {
      return this.http.get<Calendar>(`${this.apiServerUrl}/api/v1/calendar/next`);
    }
  
}

