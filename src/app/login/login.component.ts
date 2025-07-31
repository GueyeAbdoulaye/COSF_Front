import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, UntypedFormGroup, FormGroupDirective } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm: UntypedFormGroup = new UntypedFormGroup({});
  hidePassword = true;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    });
  }

  onSubmit(formGroupDirective: FormGroupDirective) {
    if (this.loginForm.valid) {
     
      this.authService.login(this.loginForm).subscribe({
        next: (response) => {
          if(response) {
            //localStorage.setItem('token', response.token);
            alert('Login successful!');
            this.router.navigateByUrl('/home'); // Redirect to home or another page after successful login
            formGroupDirective.resetForm(); // Reset the form group directive
          } else {
            alert('Login failed. Please check your credentials.');
            // Optionally redirect to another page or perform other actions
          }
        },
        error: (error) => {
          console.error('Login failed', error);
            alert('Login failed. Please try again.');
        }
      });

    } else {
      console.log('Form is invalid');
    }
  }
}