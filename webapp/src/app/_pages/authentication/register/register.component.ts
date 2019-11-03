import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/_class/validators/custom-validators';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { NbToastrService, NbGlobalLogicalPosition } from '@nebular/theme';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  translations: any;

  user: User;
  registerForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    private toastr: NbToastrService,
  ) {
    if (this.authenticationService.loggedUserValue) { 
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.user = new User();
    this.createForm();
    this.getTranslations();
  }

  getTranslations() {
    this.translate.get([
      'AUTHENTIFICATION.ENREGISTREMENT.TOAST.ERREUR.EMAIL_EXISTE_DEJA.TITRE',
      'AUTHENTIFICATION.ENREGISTREMENT.TOAST.ERREUR.EMAIL_EXISTE_DEJA.MESSAGE',
      'AUTHENTIFICATION.ENREGISTREMENT.TOAST.ERREUR.AUTRE.TITRE',
      'AUTHENTIFICATION.ENREGISTREMENT.TOAST.ERREUR.AUTRE.MESSAGE'
    ]).subscribe((res: string[]) => {
      this.translations = res;
    });
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
    if (this.registerForm.valid) {
      this.authenticationService.register(this.user).subscribe((data: any) => {
        this.authenticationService.login(this.user).subscribe(() => this.router.navigate(['/']));
      }, (err) => {
        if (err.translationKey) {
          this.toastr.show(
            this.translations[`${err.translationKey}.MESSAGE`],
            this.translations[`${err.translationKey}.TITRE`],
            { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'danger', duration: 5000 }
          );
        } else {
          this.toastr.show(
            this.translations['AUTHENTIFICATION.ENREGISTREMENT.TOAST.ERREUR.AUTRE.MESSAGE'],
            this.translations['AUTHENTIFICATION.ENREGISTREMENT.TOAST.ERREUR.AUTRE.TITRE'],
            { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'danger', duration: 5000 }
          );
        }
      });
    }
  }

}
