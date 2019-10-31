import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NbIconLibraries } from '@nebular/theme';
import { icons } from '../config/icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private iconLibraries: NbIconLibraries,
  ) {
    icons.addIcons(this.iconLibraries); // Ajouter les pack d'icones personnalisées
    this.translate.setDefaultLang('fr'); // Définir le langage par défaut
  }

}
