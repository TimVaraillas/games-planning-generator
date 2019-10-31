import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/_class/validators/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      email: ['', Validators.compose([Validators.required, Validators.email]) ],
      password: [ '', Validators.compose([
        Validators.required,
        Validators.minLength(8), // au minimum 8 caractères
        CustomValidators.patternValidator(/\d/, { hasNumber: true }), // au moins un nombre
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }), // au moins une majuscule
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }), // au moins une minuscule
        CustomValidators.patternValidator(/[!?@#$%^&*()_+-=\[\]{};':"|,.<>\/?]/, { hasSpecialCharacters: true }),
      ])],
      confirmPassword: ['', Validators.required]
    }, {validator: CustomValidators.passwordMatchValidator });
  }

  register() {
    console.log(this.registerForm);
  }

}
