import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService, NbGlobalLogicalPosition } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ColorEvent } from 'ngx-color';
import { GameService } from 'src/app/_services/game/game.service';
import { TeamService } from 'src/app/_services/team/team.service';
import { Game } from 'src/app/_models/game';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {

  @Input()
  action: string = 'add';  // 'add' ou 'update';

  @Output()
  added: EventEmitter<Game> = new EventEmitter<Game>();
  @Output()
  updated: EventEmitter<Game> = new EventEmitter<Game>();

  translations: any;

  formGroup: FormGroup;
  game: Game;
  categories: string[] = ['U7/U9', 'U11F', 'U11M', 'U13F', 'U13M', 'U15F', 'U15M', 'U17M', 'U18F', 'U20M', 'SF', 'SM'];

  constructor(
    private fb: FormBuilder,
    private toastr: NbToastrService,
    private translate: TranslateService,
    private gameService: GameService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.game = new Game();
    this.createForm();
    this.getTranslations();
  }

  getTranslations() {
    this.translate
      .get([
        'FORMULAIRE.TOAST.AJOUT.SUCCES.MESSAGE',
        'FORMULAIRE.TOAST.MODIFICATION.SUCCES.MESSAGE',
        'FORMULAIRE.TOAST.ERREUR.MESSAGE',
      ])
      .subscribe((res: string[]) => {
        this.translations = res;
      });
  }

  createForm() {
    this.formGroup = this.fb.group({
      address: [''],
      category: ['', Validators.required],
      championship: [''],
      datetime: ['', Validators.required],
      color: [''],
      localTeam: ['', Validators.required],
      awayTeam: ['', Validators.required],
    });
  }

  async submitForm() {

    let game = { ...this.game };
    let localTeam = this.game.localTeam._id ? await this.teamService.update(this.game.localTeam).toPromise() : await this.teamService.add(this.game.localTeam).toPromise();
    game.localTeam = localTeam['_id'];
    let awayTeam = this.game.awayTeam._id ? await this.teamService.update(this.game.awayTeam).toPromise() : await this.teamService.add(this.game.awayTeam).toPromise();
    game.awayTeam = awayTeam['_id'];

    if (!game._id) {
      this.gameService.add(game).subscribe(
        (game: Game) => {
          this.toastr.show(
            '',
            this.translations['FORMULAIRE.TOAST.AJOUT.SUCCES.MESSAGE'],
            { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'success' }
          );
          this.game = new Game();
          this.formGroup.reset();
          this.added.emit(game);
        },
        (error) => {
          this.toastr.show(
            '',
            this.translations['FORMULAIRE.TOAST.ERREUR.MESSAGE'],
            { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'danger' }
          );
        }
      );
    }
    else {
      this.gameService.update(game).subscribe(
        (game: Game) => {
          this.toastr.show(
            '',
            this.translations['FORMULAIRE.TOAST.MODIFICATION.SUCCES.MESSAGE'],
            { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'success' }
          );
          this.game = new Game();
          this.formGroup.reset();
          this.updated.emit(game);
        },
        (error) => {
          this.toastr.show(
            '',
            this.translations['FORMULAIRE.TOAST.ERREUR.MESSAGE'],
            { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'danger' }
          );
        }
      );
    }
  }

  colorChanged($event: ColorEvent) {
    this.formGroup.controls.color.setValue($event.color.hex);
    this.game.color = $event.color.hex;
  }

}
