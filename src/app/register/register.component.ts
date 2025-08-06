import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { RegisterService } from "../services/register.service";
import { Router } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-register",
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent implements OnInit {
  registerForm: UntypedFormGroup = new FormGroup({});
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastname: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ]),
    });
  }

  onSubmit(formGroupDirective: FormGroupDirective) {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm).subscribe({
        next: () => {
          formGroupDirective.resetForm();
          this.registerForm.reset();
          this.router.navigate(["/login"]);
        },
      });
    }
  }
}
