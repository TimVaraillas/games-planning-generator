import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { NbSidebarService, NbIconLibraries, NbMenuService } from '@nebular/theme';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  translations: any[] = [];

  loggedUser: User;
  mainMenuItems: any[] = [];
  userMenuItems: any[] = [];

  selectedLanguage = { code: 'fr', title: 'Français', icon: { icon: 'fr', pack: 'flag' } };
  languages = [
    { code: 'de', title: 'Deutsch', icon: { icon: 'de', pack: 'flag' } },
    { code: 'en', title: 'English', icon: { icon: 'en', pack: 'flag' } },
    { code: 'es', title: 'Español', icon: { icon: 'es', pack: 'flag' } },
    { code: 'fr', title: 'Français', icon: { icon: 'fr', pack: 'flag' } },
    { code: 'it', title: 'Italiano', icon: { icon: 'it', pack: 'flag' } }
  ];

  constructor(
    private authenticationService: AuthenticationService,
    private translate: TranslateService,
    private sidebarService: NbSidebarService,
    private nbMenuService: NbMenuService
  ) {
    this.getTranslations();
  }

  ngOnInit() {}

  getTranslations() {
    this.translate.get([
      'MENU.PRINCIPAL.ACCUEIL',
      'MENU.PRINCIPAL.TOURNOIS',
      'MENU.UTILISATEUR.PROFIL',
      'MENU.UTILISATEUR.DECONNEXION'
    ]).subscribe((res: string[]) => {
      this.translations = res;
      this.init();
    });
  }

  /**
   * Initialisation des menus
   */
  init() {
    this.setMenuItems(); // Définir les items du menu
    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.setMenuItems(); // Redefinir les items du menu traduits en cas de changement de langue
    });

    this.nbMenuService.onItemClick().pipe( // Ajouter un listener sur le menu de sélection de la langue
      filter(({ tag }) => tag === 'lang-menu')
    ).subscribe((data: any) => {
      this.setLanguage(data.item);
    });

    this.nbMenuService.onItemClick().pipe( // Ajouter un listener sur le menu utilisateur
      filter(({ tag }) => tag === 'user-actions')
    ).subscribe((data: any) => {
      if (data.item.action) {
        switch(data.item.action) {
          case 'logout':
            this.authenticationService.logout();
            break;
        }
      }
    });
    this.loggedUser = this.authenticationService.loggedUserValue;
  }

  /**
   * Définir les items du menu pricipal
   */
  setMenuItems(): void {
    this.mainMenuItems = [
      { title: this.translations['MENU.PRINCIPAL.ACCUEIL'], icon: { icon: 'home', pack: 'fas' }, link: '/' },
      { title: this.translations['MENU.PRINCIPAL.TOURNOIS'], icon: { icon: 'trophy', pack: 'fas' }, link: '/tournament/list' }
    ];
    this.userMenuItems = [
      { title: this.translations['MENU.UTILISATEUR.PROFIL'], icon: { icon: 'user', pack: 'fas' }, link: '/user/profile' },
      { title: this.translations['MENU.UTILISATEUR.DECONNEXION'], icon: { icon: 'power-off', pack: 'fas' }, action: 'logout' }
    ];
  }

  /**
   * Changer la langue
   * @param lang - langue
   */
  setLanguage(lang: any): void {
    this.selectedLanguage = lang;
    this.translate.use(lang.code);
  }

  /**
   * Modifier l'affichage du menu
   */
  toggleMenu() {
    this.sidebarService.toggle(true, 'left');
    return false;
  }

}
