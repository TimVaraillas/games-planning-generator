import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { NbToastrService, NbGlobalLogicalPosition } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import Tournament from 'src/app/_models/tournament';
import { TournamentService } from 'src/app/_services/tournament.service';

@Component({
  selector: 'app-tournament-add',
  templateUrl: './tournament-add.component.html',
  styleUrls: ['./tournament-add.component.scss']
})
export class TournamentAddComponent implements OnInit {

  addTournamentForm: FormGroup;
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
  }

  createForm() {
    this.addTournamentForm = this.fb.group({
      tournamentName: ['', Validators.required ],
    });
  }

  addTournament() {
    this.tournamentService.add(this.tournament)
      .subscribe((data) => {
          this.translate.get(['PAGES.TOURNOI.AJOUTER.TOAST.SUCCES.TITRE', 'PAGES.TOURNOI.AJOUTER.TOAST.SUCCES.MESSAGE']).subscribe((res: string[]) => {
            this.toastr.show(res['PAGES.TOURNOI.AJOUTER.TOAST.SUCCES.MESSAGE'], res['PAGES.TOURNOI.AJOUTER.TOAST.SUCCES.TITRE'], { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'success' })
          });
        }, (error) => {
          this.translate.get(['PAGES.TOURNOI.AJOUTER.TOAST.ERREUR.TITRE', 'PAGES.TOURNOI.AJOUTER.TOAST.ERREUR.MESSAGE']).subscribe((res: string[]) => {
            this.toastr.show(res['PAGES.TOURNOI.AJOUTER.TOAST.ERREUR.MESSAGE'], res['PAGES.TOURNOI.AJOUTER.TOAST.ERREUR.TITRE'], { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'danger' })
          });
        }
      );
  }

}
