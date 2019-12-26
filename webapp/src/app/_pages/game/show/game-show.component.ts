import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as _moment from 'moment';
import { GameService } from 'src/app/_services/game/game.service';
import { Game } from 'src/app/_models/game';
import { NbToastrService, NbGlobalLogicalPosition } from '@nebular/theme';

@Component({
  selector: 'app-game-show',
  templateUrl: './game-show.component.html',
  styleUrls: ['./game-show.component.scss']
})
export class GameShowComponent implements OnInit {

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
    this.getGame();
  }

  getTranslations() {
    this.translate.get([
      'PAGES.MATCH.ALERTE.SUPPRIMER_MESSAGE',
      'PAGES.MATCH.TOAST.SUPPRIMER.SUCCES_TITRE',
      'PAGES.MATCH.TOAST.SUPPRIMER.SUCCES_MESSAGE',
      'PAGES.MATCH.TOAST.SUPPRIMER.ERREUR_TITRE',
      'PAGES.MATCH.TOAST.SUPPRIMER.ERREUR_MESSAGE'
    ]).subscribe((res: string[]) => {
      this.translations = res;
    });
  }

  getGame() {
    let id = this.route.snapshot.paramMap.get("id");
    this.gameService.getOne(id).subscribe((game: Game) => {
      if (!game) {
        this.router.navigate(['/404']);
      } else {
        this.game = game;
      }
    });
  }

  deleteGame() {
    if (confirm(this.translations['PAGES.MATCH.ALERTE.SUPPRIMER_MESSAGE'])) {
      this.gameService.delete(this.game._id)
        .subscribe(() => {
          this.toastr.show(
            this.translations['PAGES.MATCH.TOAST.SUPPRIMER.SUCCES_MESSAGE'],
            this.translations['PAGES.MATCH.TOAST.SUPPRIMER.SUCCES_TITRE'],
            { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'success' }
          );
          this.router.navigate(['/game/list']);
        }, (error) => {
          this.toastr.show(
            this.translations['PAGES.MATCH.TOAST.SUPPRIMER.ERREUR_MESSAGE'],
            this.translations['PAGES.MATCH.TOAST.SUPPRIMER.ERREUR_TITRE'],
            { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'danger' }
          );
        });
    }
  }

}
