import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService, NbGlobalLogicalPosition } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Tournament } from 'src/app/_models/tournament';
import { TournamentService } from 'src/app/_services/tournament/tournament.service';

@Component({
  selector: 'app-tournament-add',
  templateUrl: './tournament-add.component.html',
  styleUrls: ['./tournament-add.component.scss']
})
export class TournamentAddComponent implements OnInit {
  @Output()
  added: EventEmitter<Tournament> = new EventEmitter<Tournament>();

  translations: any;

  addTournamentForm: FormGroup;
  tournament: Tournament;

  constructor(
    private fb: FormBuilder,
    private toastr: NbToastrService,
    private translate: TranslateService,
    private tournamentService: TournamentService
  ) {
    this.createForm();
    this.tournament = new Tournament();
  }

  ngOnInit() {
    this.getTranslations();
  }

  getTranslations() {
    this.translate
      .get([
        'PAGES.TOURNOI.AJOUTER.TOAST.SUCCES.TITRE',
        'PAGES.TOURNOI.AJOUTER.TOAST.SUCCES.MESSAGE',
        'PAGES.TOURNOI.AJOUTER.TOAST.ERREUR.TITRE',
        'PAGES.TOURNOI.AJOUTER.TOAST.ERREUR.MESSAGE'
      ])
      .subscribe((res: string[]) => {
        this.translations = res;
      });
  }

  createForm() {
    this.addTournamentForm = this.fb.group({
      tournamentName: ['', Validators.required]
    });
  }

  addTournament() {
    this.tournamentService.add(this.tournament).subscribe(
      (tournament: Tournament) => {
        this.toastr.show(
          this.translations['PAGES.TOURNOI.AJOUTER.TOAST.SUCCES.MESSAGE'],
          this.translations['PAGES.TOURNOI.AJOUTER.TOAST.SUCCES.TITRE'],
          { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'success' }
        );
        this.addTournamentForm.reset();
        this.added.emit(tournament);
      },
      error => {
        this.toastr.show(
          this.translations['PAGES.TOURNOI.AJOUTER.TOAST.ERREUR.MESSAGE'],
          this.translations['PAGES.TOURNOI.AJOUTER.TOAST.ERREUR.TITRE'],
          { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'danger' }
        );
      }
    );
  }
}
