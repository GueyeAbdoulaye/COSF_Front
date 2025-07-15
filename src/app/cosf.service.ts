import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CosfTeams } from './dto/cosf-teams';
import { Standing } from './dto/standing';

@Injectable({
  providedIn: 'root'
})
export class CosfService {

    private apiServerUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) {}
  
    public getAllTeams(): Observable<String[]> {
      return this.http.get<String[]>(`${this.apiServerUrl}/api/v1/teams/all`);
    }

    public getAllStandings(): Observable<Standing[]> {
      return this.http.get<Standing[]>(`${this.apiServerUrl}/api/v1/standing/all`);
    }
  
}

