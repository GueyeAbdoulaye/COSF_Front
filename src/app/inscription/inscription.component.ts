import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CosfService } from "../services/cosf.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from "@angular/material/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-inscription",
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
  ],
  templateUrl: "./inscription.component.html",
  styleUrl: "./inscription.component.scss",
})
export class InscriptionComponent implements OnDestroy, OnInit {
  inscriptionForm: FormGroup = new FormGroup({});
  subscription: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private cosfService: CosfService
  ){}

  ngOnInit(): void {
    // Initialize the form when the component is created
    this.initForm();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.subscription = [];
  }

  initForm(): void {
    this.inscriptionForm = this.fb.group({
      firstName: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      sex: new FormControl("", [Validators.required]),
      birthDate: new FormControl("", [Validators.required]),
      phone: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]{10}$"),
      ]),
      address: new FormControl("", [Validators.required]),
      postalCode: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      mutated: new FormControl("", [Validators.required]),
    });
  }

  resetForm(): void {
    this.inscriptionForm.reset();
    this.initForm(); // Reinitialize the form to its default state
  }

  onSubmit(formGroupDirective: FormGroupDirective): void {
    if (this.inscriptionForm.valid) {
      let sub = this.cosfService
        .registerClubMember(this.inscriptionForm)
        .subscribe({
          next: (response) => {
            formGroupDirective.resetForm(); // Reset the form group directive
            this.initForm(); // Reinitialize the form
            console.log("Member registered successfully:", response);
          },
          error: (error) => {
            console.error("Error registering member:", error);
          },
        });
      this.subscription.push(sub);
    }
  }
}
