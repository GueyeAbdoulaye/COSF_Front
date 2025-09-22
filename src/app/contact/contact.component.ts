import { Component, OnInit } from "@angular/core";
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormGroupDirective,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CosfService } from "../services/cosf.service";
import { Constante } from "../../constante/constante";

@Component({
  selector: "app-contact",
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.scss",
})
export class ContactComponent implements OnInit {

  public readonly constante = Constante;
  contactForm: UntypedFormGroup = new UntypedFormGroup({});

  constructor(private fb: UntypedFormBuilder, private service: CosfService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.contactForm = this.fb.group({
      nom: ["", [Validators.required]],
      prenom: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      message: ["", [Validators.required]],
    });
  }

  onSubmit(formGroupDirective: FormGroupDirective) {
    if (this.contactForm.valid) {
      this.service.sendContactForm(this.contactForm.value).subscribe({
        next: (response) => {
          alert("Message envoyé avec succès !");
          // Optionally reset the form or show a success message
          formGroupDirective.resetForm(); // Reset the form group directive
        },
        error: (error) => {
          alert("Une erreur est survenue lors de l'envoi.");
        },
      });
    } else {
      console.log("Form is invalid");
    }
  }
}
