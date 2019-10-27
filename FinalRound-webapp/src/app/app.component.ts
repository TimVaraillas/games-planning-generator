import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NbSidebarService, NbIconLibraries, NbContextMenuDirective, NbMenuService } from '@nebular/theme';
import { icons } from './utils/icons';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  items = [
    {
      title: 'Accueil',
      icon: 'home-outline',
      link: [],
    }
  ];

  selectedLanguage = { title: 'Français', icon: { icon: 'fr', pack: 'flag' } };
  languages = [
    { title: 'Deutsch', icon: { icon: 'de', pack: 'flag' } },
    { title: 'English', icon: { icon: 'en', pack: 'flag' } },
    { title: 'Español', icon: { icon: 'es', pack: 'flag' } },
    { title: 'Français', icon: { icon: 'fr', pack: 'flag' } }, 
    { title: 'Italiano', icon: { icon: 'it', pack: 'flag' } }, 
  ];
  @ViewChild(NbContextMenuDirective, { static: false }) languagesMenu: NbContextMenuDirective;

  constructor(
    private translate: TranslateService,
    private iconLibraries: NbIconLibraries,
    private sidebarService: NbSidebarService,
    private nbMenuService: NbMenuService
  ) {

    icons.addIcons(this.iconLibraries);

    this.nbMenuService.onItemClick().pipe(
      filter(({ tag }) => tag === 'lang-menu')
    ).subscribe(data => {
      this.setLanguage(data.item);
    });

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  setLanguage(lang) {
    console.log(lang);
    this.selectedLanguage = lang;
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
}
