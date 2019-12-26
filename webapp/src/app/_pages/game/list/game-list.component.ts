import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NbToastrService, NbGlobalLogicalPosition } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import * as moment from 'moment';
import { SETTINGS } from 'src/config/smart-table';
import { FiroSidebarComponent } from 'src/app/_components/firo-sidebar/firo-sidebar.component';
import { ColorCellComponent } from 'src/app/_components/ng2-smart-table/color-cell/color-cell.component';
import { GameFormComponent } from './../form/game-form.component';
import { GameService } from './../../../_services/game/game.service';
import { Game } from './../../../_models/game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  @ViewChild('addSidebar', { static: false })
  addSidebar: FiroSidebarComponent;
  @ViewChild('updateSidebar', { static: false })
  updateSidebar: FiroSidebarComponent;
  @ViewChild('updateFormComponent', { static: false })
  updateFormComponent: GameFormComponent;

  translations: any;
  source: LocalDataSource = new LocalDataSource();
  settings: any = SETTINGS;
  loading: boolean = true;

  constructor(
    private gameService: GameService,
    private router: Router,
    private toastr: NbToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    moment.locale('fr');
    this.getGames();
    this.getTranslations();
  }

  getTranslations() {
    this.loading = true;
    this.translate
      .get([
        'PAGES.MATCH.ALERTE.SUPPRIMER_MESSAGE',
        'PAGES.MATCH.LISTE.CATEGORY',
        'PAGES.MATCH.LISTE.CHAMPIONNAT',
        'PAGES.MATCH.LISTE.COULEUR',
        'PAGES.MATCH.LISTE.DATE',
        'PAGES.MATCH.LISTE.DOMICILE',
        'PAGES.MATCH.LISTE.EXTERIEUR',
        'PAGES.MATCH.LISTE.HEURE',
        'PAGES.MATCH.LISTE.LIEU',
        'PAGES.MATCH.TOAST.SUPPRIMER.SUCCES_TITRE',
        'PAGES.MATCH.TOAST.SUPPRIMER.SUCCES_MESSAGE',
        'PAGES.MATCH.TOAST.SUPPRIMER.ERREUR_TITRE',
        'PAGES.MATCH.TOAST.SUPPRIMER.ERREUR_MESSAGE'
      ])
      .subscribe((res: string[]) => {
        this.loading = false;
        this.translations = res;
        this.setTableSettings();
      });
  }

  setTableSettings() {
    this.settings.columns = {
      color: {
        title: this.translations['PAGES.MATCH.LISTE.COULEUR'],
        filter: false,
        type: 'custom',
        renderComponent: ColorCellComponent
      },
      category: { title: this.translations['PAGES.MATCH.LISTE.CATEGORY'] },
      championship: { title: this.translations['PAGES.MATCH.LISTE.CHAMPIONNAT'] },
      localTeam: {
        title: this.translations['PAGES.MATCH.LISTE.DOMICILE'],
        valuePrepareFunction: (team) => team.name,
        filterFunction: (team?: any, search?: string): boolean => {
          let match = true;
          Object.keys(team).map(u => team.name).filter(it => {
            match = it.toLowerCase().includes(search.toLowerCase());
          });
          if (match || search === '') {
            return true;
          } else {
            return false
          }
        },
      },
      awayTeam: {
        title: this.translations['PAGES.MATCH.LISTE.EXTERIEUR'],
        valuePrepareFunction: (team) => team.name,
        filterFunction: (team?: any, search?: string): boolean => {
          let match = true;
          Object.keys(team).map(u => team.name).filter(it => {
            match = it.toLowerCase().includes(search.toLowerCase());
          });
          if (match || search === '') {
            return true;
          } else {
            return false
          }
        },
      },
      date: { title: this.translations['PAGES.MATCH.LISTE.DATE'] },
      time: { title: this.translations['PAGES.MATCH.LISTE.HEURE'] },
      address: { title: this.translations['PAGES.MATCH.LISTE.LIEU'] },
    };
  }

  getGames() {
    this.gameService.getAll().subscribe((games: Game[]) => {
      this.source.load(games.map((game: any) => {
        game.date = moment(game.datetime).format('L');
        game.time = moment(game.datetime).format('LT');
        return game;
      }));
    });
  }

  showGame(event: any) {
    this.router.navigate(['/game/show', event.data._id]);
  }

  gameAdded(game: Game) {
    this.gameService.getOne(game._id).subscribe((game: Game) => {
      game.date = moment(game.datetime).format('L');
      game.time = moment(game.datetime).format('LT');
      this.source.append(game);
      this.toggleAddSidebar();
    });
  }

  gameUpdated(game: Game) {
    let old = this.source['data'].find((g: Game) => g._id == game._id);
    this.gameService.getOne(game._id).subscribe((game: Game) => {
      game.date = moment(game.datetime).format('L');
      game.time = moment(game.datetime).format('LT');
      this.toggleUpdateSidebar();
      this.source.update(old, game);
    });
  }

  deleteGame(event: any) {
    if (confirm(this.translations['PAGES.MATCH.ALERTE.SUPPRIMER_MESSAGE'])) {
      this.gameService.delete(event.data._id).subscribe(
        () => {
          this.source.remove(event.data);
          this.toastr.show(
            this.translations[
            'PAGES.MATCH.TOAST.SUPPRIMER.SUCCES_MESSAGE'
            ],
            this.translations[
            'PAGES.MATCH.TOAST.SUPPRIMER.SUCCES_TITRE'
            ],
            { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'success' }
          );
        },
        error => {
          this.toastr.show(
            this.translations[
            'PAGES.MATCH.TOAST.SUPPRIMER.ERREUR_MESSAGE'
            ],
            this.translations[
            'PAGES.MATCH.TOAST.SUPPRIMER.ERREUR_TITRE'
            ],
            { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'danger' }
          );
        }
      );
    }
  }

  toggleAddSidebar() {
    this.addSidebar.toggle();
  }

  toggleUpdateSidebar(event: any = null) {
    if (event) {
      this.updateFormComponent.game = event.data;
    }
    this.updateSidebar.toggle();
  }
}
