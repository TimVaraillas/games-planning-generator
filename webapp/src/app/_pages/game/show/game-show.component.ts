import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as _moment from 'moment';
import * as _ from 'lodash'
import { GameService } from 'src/app/_services/game/game.service';
import { Game } from 'src/app/_models/game';
import { GameFormComponent } from './../form/game-form.component';
import { NbToastrService, NbGlobalLogicalPosition } from '@nebular/theme';
import { FiroSidebarComponent } from 'src/app/_components/firo-sidebar/firo-sidebar.component';

@Component({
  selector: 'app-game-show',
  templateUrl: './game-show.component.html',
  styleUrls: ['./game-show.component.scss']
})
export class GameShowComponent implements OnInit {

  @ViewChild('updateSidebar', { static: false })
  updateSidebar: FiroSidebarComponent;

  @ViewChild('updateFormComponent', { static: false })
  updateFormComponent: GameFormComponent;

  translations: any;
  moment = _moment;
  game: Game = new Game();

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private toastr: NbToastrService
  ) { }

  ngOnInit() {
    this.moment.locale('fr');
    this.getTranslations();
    this.loadGame();
  }

  getTranslations() {
    this.translate.get([
      'MATCH.ALERTE.SUPPRIMER_MESSAGE',
      'FORMULAIRE.TOAST.SUPPRESSION.SUCCES.MESSAGE',
      'FORMULAIRE.TOAST.ERREUR.MESSAGE'
    ]).subscribe((res: string[]) => {
      this.translations = res;
    });
  }

  loadGame() {
    let id = this.route.snapshot.paramMap.get("id");
    this.gameService.getOne(id).subscribe((game: Game) => {
      if (!game) {
        this.router.navigate(['/404']);
      } else {
        this.game = game;
      }
    });
  }

  toggleUpdateSidebar() {
    this.updateSidebar.toggle();
    this.updateFormComponent.game = _.cloneDeep(this.game);;
  }

  gameUpdated() {
    this.updateSidebar.toggle();
    this.loadGame();
  }

  deleteGame() {
    if (confirm(this.translations['MATCH.ALERTE.SUPPRIMER_MESSAGE'])) {
      this.gameService.delete(this.game._id)
        .subscribe(() => {
          this.toastr.show(
            '',
            this.translations['FORMULAIRE.TOAST.SUPPRESSION.SUCCES.MESSAGE'],
            { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'success' }
          );
          this.router.navigate(['/game/list']);
        }, (error) => {
          this.toastr.show(
            '',
            this.translations['FORMULAIRE.TOAST.ERREUR.MESSAGE'],
            { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'danger' }
          );
        });
    }
  }

}
