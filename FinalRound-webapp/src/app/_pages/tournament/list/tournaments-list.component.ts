import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { SETTINGS } from 'src/config/smart-table';
import { TournamentService } from 'src/app/_services/tournament/tournament.service';
import { NbToastrService, NbSidebarService, NbGlobalLogicalPosition } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Tournament } from 'src/app/_models/tournament';

@Component({
  selector: 'app-tournaments-list',
  templateUrl: './tournaments-list.component.html',
  styleUrls: ['./tournaments-list.component.scss']
})
export class TournamentsListComponent implements OnInit {

  source: LocalDataSource  = new LocalDataSource();
  settings: any = SETTINGS;

  constructor(
    private router: Router,
    private sidebarService: NbSidebarService,
    private toastr: NbToastrService,
    private tournamentService: TournamentService,
    private translate: TranslateService
  ) {
    this.settings.columns = { name: { title: 'Nom du tournoi', filter: true, width: '90%' } }; 
    this.settings.actions.edit = false;
    this.getTournaments();
  }

  ngOnInit() {
  }

  getTournaments() {
    this.tournamentService.get().subscribe((tournaments: Tournament[]) => {
      this.source.load(tournaments);
    });
  }

  toggleAddSidePanel() {
    this.sidebarService.toggle(false, 'right');
  }

  tournamentAdded(tournament: Tournament) {
    this.source.append(tournament);
    this.toggleAddSidePanel();
  }

  showTournament(event: any) {
    this.router.navigate(['/tournament/show', event.data._id]);
  }

  deleteTournament(event: any) {
    if ( confirm( "Êtes-vous sûr de vouloir supprimer ce tournoi ?" ) ) {
      this.tournamentService.delete(event.data._id)
      .subscribe((data) => {
        this.source.remove(event.data);
        this.translate.get(['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.SUCCES.TITRE', 'PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.SUCCES.MESSAGE']).subscribe((res: string[]) => {
          this.toastr.show(res['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.SUCCES.MESSAGE'], res['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.SUCCES.TITRE'], { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'success' })
        });
      }, (error) => {
        this.translate.get(['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.ERREUR.TITRE', 'PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.ERREUR.MESSAGE']).subscribe((res: string[]) => {
          this.toastr.show(res['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.ERREUR.MESSAGE'], res['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.ERREUR.TITRE'], { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'danger' })
        });
      });
    }
  }

}
