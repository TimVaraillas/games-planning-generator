import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService, NbGlobalLogicalPosition } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  translations: any;

  user: User;
  loginForm: FormGroup;

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
      'AUTHENTIFICATION.CONNEXION.TOAST.ERREUR.EMAIL.TITRE',
      'AUTHENTIFICATION.CONNEXION.TOAST.ERREUR.EMAIL.MESSAGE',
      'AUTHENTIFICATION.CONNEXION.TOAST.ERREUR.MOT_DE_PASSE.TITRE',
      'AUTHENTIFICATION.CONNEXION.TOAST.ERREUR.MOT_DE_PASSE.MESSAGE',
      'AUTHENTIFICATION.CONNEXION.TOAST.ERREUR.AUTRE.TITRE',
      'AUTHENTIFICATION.CONNEXION.TOAST.ERREUR.AUTRE.MESSAGE'
    ]).subscribe((res: string[]) => {
      this.translations = res;
    });
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email]) ],
      password: ['', Validators.required ]
    });
  }

  login() {
    this.authenticationService.login(this.user).subscribe((data: any) => {
      this.router.navigate(['/']);
    }, (err) => {
      if (err.translationKey) {
        this.toastr.show(
          this.translations[`${err.translationKey}.MESSAGE`],
          this.translations[`${err.translationKey}.TITRE`],
          { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'danger', duration: 5000 }
        );
      } else {
        this.toastr.show(
          this.translations['AUTHENTIFICATION.CONNEXION.TOAST.ERREUR.AUTRE.MESSAGE'],
          this.translations['AUTHENTIFICATION.CONNEXION.TOAST.ERREUR.AUTRE.TITRE'],
          { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'danger', duration: 5000 }
        );
      }
    })
  }
}
