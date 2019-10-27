import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/_services/tournament.service';
import Tournament from 'src/app/_models/tournament';
import { TranslateService } from '@ngx-translate/core';
import { NbToastrService, NbGlobalLogicalPosition } from '@nebular/theme';

@Component({
  selector: 'app-tournaments-list',
  templateUrl: './tournaments-list.component.html',
  styleUrls: ['./tournaments-list.component.scss']
})
export class TournamentsListComponent implements OnInit {

  tournaments: Tournament[] = [];

  constructor(
    private toastr: NbToastrService,
    private tournamentService: TournamentService,
    private translate: TranslateService
  ) {
    this.getTournaments();
  }

  ngOnInit() {
  }

  getTournaments() {
    this.tournamentService.get().subscribe((tournaments: Tournament[]) => {
      this.tournaments = tournaments;
    });
  }

  deleteTournament(id: String) {
    this.tournamentService.delete(id)
    .subscribe((data) => {
      this.getTournaments();
      this.translate.get(['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.SUCCES.TITRE', 'PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.SUCCES.MESSAGE']).subscribe((res: string[]) => {
        this.toastr.show(res['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.SUCCES.MESSAGE'], res['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.SUCCES.TITRE'], { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'success' })
      });
    }, (error) => {
      this.translate.get(['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.ERREUR.TITRE', 'PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.ERREUR.MESSAGE']).subscribe((res: string[]) => {
        this.toastr.show(res['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.ERREUR.MESSAGE'], res['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.ERREUR.TITRE'], { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'danger' })
      });
    }
  );
  }

}
