import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //Login service
  public login(login: FormGroup): Observable<any> {
    return this.http.post<any>(
      `${this.apiServerUrl}/auth/authenticate`,
      login.value
    );
  }

  saveToken(token: string): void {
    localStorage.setItem("jwt", token);
  }

  getToken(): string | null {
    return localStorage.getItem("jwt");
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token; // Returns true if token exists, false otherwise
  }

  logout(): void {
    localStorage.removeItem("jwt");
  }
  

  
  

}
