import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { SETTINGS } from 'src/config/smart-table';
import { TournamentService } from 'src/app/_services/tournament/tournament.service';
import { NbToastrService, NbGlobalLogicalPosition } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Tournament } from 'src/app/_models/tournament';
import { FiroSidebarComponent } from 'src/app/_components/firo-sidebar/firo-sidebar.component';
import { TournamentUpdateComponent } from '../update/tournament-update.component';

@Component({
  selector: 'app-tournaments-list',
  templateUrl: './tournaments-list.component.html',
  styleUrls: ['./tournaments-list.component.scss']
})
export class TournamentsListComponent implements OnInit {

  @ViewChild('addSidebar', { static: false })
  addSidebar: FiroSidebarComponent;

  @ViewChild('updateSidebar', { static: false })
  updateSidebar: FiroSidebarComponent;

  @ViewChild('updateComponent', { static: false })
  updateComponent: TournamentUpdateComponent;

  translations: any;

  source: LocalDataSource  = new LocalDataSource();
  settings: any = SETTINGS;


  constructor(
    private router: Router,
    private toastr: NbToastrService,
    private tournamentService: TournamentService,
    private translate: TranslateService
  ) {
    this.settings.columns = { name: { title: 'Nom du tournoi', filter: true, width: '90%' } }; 
    this.getTournaments();
  }

  ngOnInit() {
    this.getTranslations();
  }

  getTranslations() {
    this.translate.get([
      'PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.SUCCES.TITRE',
      'PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.SUCCES.MESSAGE',
      'PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.ERREUR.TITRE',
      'PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.ERREUR.MESSAGE'
    ]).subscribe((res: string[]) => {
      this.translations = res;
    });
  } 

  toggleAddSidebar() {
    this.addSidebar.toggle();
  }

  toggleUpdateSidebar(event: any = null) {
    this.updateSidebar.toggle();
    if (event) {
      this.updateComponent.id = event.data._id;
    }
  }

  getTournaments() {
    this.tournamentService.getAll().subscribe((tournaments: Tournament[]) => {
      this.source.load(tournaments);
    });
  }

  tournamentAdded(tournament: Tournament) {
    this.source.append(tournament);
    this.toggleAddSidebar();
  }

  tournamentUpdated(tournament: Tournament) {
    this.source.getAll().then((tournaments: Tournament[]) => {
      let old = tournaments.find((t) => { return t._id == tournament._id });
      tournaments[tournaments.indexOf(old)] = tournament;
      this.source.reset();
      this.source.load(tournaments);
    });
    this.toggleUpdateSidebar();
  }

  showTournament(event: any) {
    this.router.navigate(['/tournament/show', event.data._id]);
  }

  deleteTournament(event: any) {
    if ( confirm( 'Êtes-vous sûr de vouloir supprimer ce tournoi ?' ) ) {
      this.tournamentService.delete(event.data._id)
      .subscribe(() => {
        this.source.remove(event.data);
        this.toastr.show(
          this.translations['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.SUCCES.MESSAGE'],
          this.translations['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.SUCCES.TITRE'],
          { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'success' }
        );
      }, (error) => {
        this.toastr.show(
          this.translations['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.ERREUR.MESSAGE'],
          this.translations['PAGES.TOURNOI.LISTE.TOAST.SUPPRIMER.ERREUR.TITRE'],
          { position: NbGlobalLogicalPosition.BOTTOM_END, status: 'danger' }
        );
      });
    }
  }

}
