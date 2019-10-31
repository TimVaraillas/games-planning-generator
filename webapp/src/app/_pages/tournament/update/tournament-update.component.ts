import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService, NbGlobalLogicalPosition } from '@nebular/theme';
import { Tournament } from 'src/app/_models/tournament';
import { TranslateService } from '@ngx-translate/core';
import { TournamentService } from 'src/app/_services/tournament/tournament.service';

@Component({
  selector: 'app-tournament-update',
  templateUrl: './tournament-update.component.html',
  styleUrls: ['./tournament-update.component.scss']
})
export class TournamentUpdateComponent implements OnInit {

  @Input()
  set id(id: string) {
    console.log('id', id)
    this._id = id;
    this.getTournament();
  }
  
  @Output()
  updated: EventEmitter<Tournament> = new EventEmitter<Tournament>();
  
  translations: any;
  
  _id: string;
  updateTournamentForm: FormGroup;
  tournament: Tournament;

  constructor(
    private fb: FormBuilder,
    private toastr: NbToastrService,
    private translate: TranslateService,
    private tournamentService: TournamentService,
  ) {
    this.createForm();
    this.tournament = new Tournament();
  }
  
  ngOnInit() {
    this.getTranslations();
  }

  getTranslations() {
    this.translate.get([
      'PAGES.TOURNOI.AJOUTER.TOAST.SUCCES.TITRE',
      'PAGES.TOURNOI.AJOUTER.TOAST.SUCCES.MESSAGE',
      'PAGES.TOURNOI.AJOUTER.TOAST.ERREUR.TITRE',
      'PAGES.TOURNOI.AJOUTER.TOAST.ERREUR.MESSAGE'
    ]).subscribe((res: string[]) => {
      this.translations = res;
    });
  } 

  getTournament() {
    this.tournamentService.getOne(this._id).subscribe((tournament: Tournament) => this.tournament = tournament);
  }

  createForm() {
    this.updateTournamentForm = this.fb.group({
      tournamentName: ['', Validators.required ],
    });
  }

  updateTournament() {
    this.tournamentService.update(this.tournament)
      .subscribe((tournament: Tournament) => {
        this.toastr.show(
          this.translations['PAGES.TOURNOI.AJOUTER.TOAST.SUCCES.MESSAGE'],
          this.translations['PAGES.TOURNOI.AJOUTER.TOAST.SUCCES.TITRE'],
          { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'success' }
        );
        this.updateTournamentForm.reset();
        this.updated.emit(tournament);
      }, (error) => {
        this.toastr.show(
          this.translations['PAGES.TOURNOI.AJOUTER.TOAST.ERREUR.MESSAGE'],
          this.translations['PAGES.TOURNOI.AJOUTER.TOAST.ERREUR.TITRE'],
          { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'danger' }
        );
      });
  }

}
