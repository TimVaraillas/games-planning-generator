import { Component } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { NbSidebarService, NbIconLibraries, NbMenuService } from '@nebular/theme';
import { icons } from '../utils/icons';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  menuItems = [];

  selectedLanguage = { code: 'fr', title: 'Français', icon: { icon: 'fr', pack: 'flag' } };
  languages = [
    { code: 'de', title: 'Deutsch', icon: { icon: 'de', pack: 'flag' } },
    { code: 'en', title: 'English', icon: { icon: 'en', pack: 'flag' } },
    { code: 'es', title: 'Español', icon: { icon: 'es', pack: 'flag' } },
    { code: 'fr', title: 'Français', icon: { icon: 'fr', pack: 'flag' } }, 
    { code: 'it', title: 'Italiano', icon: { icon: 'it', pack: 'flag' } }, 
  ];

  constructor(
    private translate: TranslateService,
    private iconLibraries: NbIconLibraries,
    private sidebarService: NbSidebarService,
    private nbMenuService: NbMenuService
  ) {

    icons.addIcons(this.iconLibraries); // Ajouter les pack d'icones personnalisées

    this.translate.setDefaultLang(this.selectedLanguage.code); // Définir le langage par défaut
    
    this.setMenuItems(); // Définir les items du menu
    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.setMenuItems(); // Redefinir les items du menu traduits en cas de changement de langue
    });

    this.nbMenuService.onItemClick().pipe( // Ajouter un listener sur le menu de sélection de la langue
      filter(({ tag }) => tag === 'lang-menu')
    ).subscribe(data => {
      this.setLanguage(data.item);
    });

  }

  /**
   * Définir les items du menu pricipal
   */
  setMenuItems(): void {
    this.translate.get(['MENU.ACCUEIL', 'MENU.TOURNOIS_CREES']).subscribe((res: string[]) => {
      this.menuItems = [
        { title: res['MENU.ACCUEIL'], icon: { icon: 'home', pack: 'fas' }, link: "/" },
        { title: res['MENU.TOURNOIS_CREES'], icon: { icon: 'trophy', pack: 'fas' }, link: "/tournament/list" },
        { title: 'Ajouter un tournoi', icon: { icon: 'plus', pack: 'fas' }, link: "/tournament/add" }
      ]
    });
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
    this.sidebarService.toggle(true);
    return false;
  }
}
