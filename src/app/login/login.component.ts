import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  UntypedFormGroup,
  FormGroupDirective,
  FormControl,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CommonModule } from "@angular/common";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup = new UntypedFormGroup({});
  hidePassword = true;

  returnUrl: string = "/home"; // valeur par défaut

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();

    // Lire le returnUrl depuis les query params
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/home";

    // Protection contre les redirections externes
    if (!this.returnUrl.startsWith("/")) {
      this.returnUrl = "/home";
    }
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ]),
    });
  }

  // Method to navigate to the register page
  navigateToRegister() {
    this.router.navigate(["/register"]); // Adjust the path if necessary
  }

  onSubmit(formGroupDirective: FormGroupDirective) {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm).subscribe({
        next: (response) => {
          const token = response.token;
          this.authService.saveToken(token);

          // Rediriger vers la page initialement demandée
          this.router.navigateByUrl(this.returnUrl);

          formGroupDirective.resetForm();
        },
        error: (error) => {
          alert("Login failed. Please try again.");
        },
      });
    } else {
      console.log("Form is invalid");
    }
  }
}
