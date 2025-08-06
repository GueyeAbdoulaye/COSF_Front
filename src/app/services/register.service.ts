import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { RegisterDto } from "../dto/registerDto";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //Register Service
  public register(registerForm: FormGroup): Observable<RegisterDto> {
    return this.http.post<any>(
      `${this.apiServerUrl}/auth/register`,
      registerForm.value
    );
  }
  
}
