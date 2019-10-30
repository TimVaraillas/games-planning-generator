import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { SETTINGS } from 'src/config/smart-table';
import { TournamentService } from 'src/app/_services/tournament/tournament.service';
import { NbToastrService, NbGlobalLogicalPosition } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Tournament } from 'src/app/_models/tournament';
import { FiroSidebarComponent } from 'src/app/_components/firoSidebar/firo-sidebar/firo-sidebar.component';

@Component({
  selector: 'app-tournaments-list',
  templateUrl: './tournaments-list.component.html',
  styleUrls: ['./tournaments-list.component.scss']
})
export class TournamentsListComponent implements OnInit {

  source: LocalDataSource  = new LocalDataSource();
  settings: any = SETTINGS;

  @ViewChild('firoSidebar', { static: false })
  firoSidebar: FiroSidebarComponent;

  constructor(
    private router: Router,
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

  expandSidebar() {
    this.firoSidebar.expand();
  }

  collapseSidebar() {
    this.firoSidebar.collapse();
  }

  getTournaments() {
    this.tournamentService.getAll().subscribe((tournaments: Tournament[]) => {
      this.source.load(tournaments);
    });
  }

  tournamentAdded(tournament: Tournament) {
    this.source.append(tournament);
    this.collapseSidebar();
  }

  showTournament(event: any) {
    this.router.navigate(['/tournament/show', event.data._id]);
  }

  deleteTournament(event: any) {
    if ( confirm( 'Êtes-vous sûr de vouloir supprimer ce tournoi ?' ) ) {
      this.tournamentService.delete(event.data._id)
      .subscribe(() => {
        this.source.remove(event.data);
        this.translate.get([
          'PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.SUCCES.TITRE',
          'PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.SUCCES.MESSAGE'
        ]).subscribe((res: string[]) => {
          this.toastr.show(
            res['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.SUCCES.MESSAGE'],
            res['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.SUCCES.TITRE'],
            { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'success' }
          );
        });
      }, (error) => {
        this.translate.get([
          'PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.ERREUR.TITRE',
          'PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.ERREUR.MESSAGE'
        ]).subscribe((res: string[]) => {
          this.toastr.show(
            res['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.ERREUR.MESSAGE'],
            res['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.ERREUR.TITRE'],
            { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'danger' }
          );
        });
      });
    }
  }

}
