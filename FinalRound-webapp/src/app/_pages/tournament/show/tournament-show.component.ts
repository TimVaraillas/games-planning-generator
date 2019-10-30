import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as _ from 'lodash';

import { COMPETITORS } from '../../../../assets/data/mock-competitors';
import { SingleEliminationTournament } from 'src/app/_models/tournament';
import { TournamentService } from 'src/app/_services/tournament/tournament.service';
import { LocalDataSource } from 'ng2-smart-table';
import { SETTINGS } from 'src/config/smart-table';

@Component({
  selector: 'app-tournament-show',
  templateUrl: './tournament-show.component.html',
  styleUrls: ['./tournament-show.component.scss']
})
export class TournamentShowComponent implements OnInit {

  tournament: SingleEliminationTournament = new SingleEliminationTournament();

  // Initialisation des données de la smart table : compétiteurs 
  smartTableSettings: any = SETTINGS;
  smartTableSource: LocalDataSource  = new LocalDataSource();

  
  grid: any [] = [];
  scrollRightInterval: any;
  scrollLeftInterval: any;

  @ViewChild('gridContainer', {static: false}) gridElement: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tournamentService: TournamentService
  ) {
    this.smartTableSettings.columns = { name: { title: 'Nom du compétiteur', filter: true, width: '90%' } }; 
    this.smartTableSettings.actions.edit = false;
    this.getTournament();
  }

  ngOnInit() {
  }

  getTournament() {
    let id = this.route.snapshot.paramMap.get("id");
    this.tournamentService.getOne(id).subscribe((tournament: SingleEliminationTournament) => {
      if(!tournament) {
        this.router.navigate(['/404']);
      } else {
        this.tournament = tournament;
        this.tournament.competitors = COMPETITORS.slice(0, 99);
        this.smartTableSource.load(this.tournament.competitors);
      }
    });
  }

  generateSingleEliminationGrid() {
    this.tournament.generateGrid();
  }

  startScrollRight() {
    this.scrollRightInterval = setInterval(() => {
      this.gridElement.nativeElement.scrollTo({ left: (this.gridElement.nativeElement.scrollLeft + 10) });
    }, 15);
  }

  stopScrollRight() {
    clearInterval(this.scrollRightInterval);
  }

  startScrollLeft() {
    this.scrollLeftInterval = setInterval(() => {
      this.gridElement.nativeElement.scrollTo({ left: (this.gridElement.nativeElement.scrollLeft - 10) });
    }, 15)
  }

  stopScrollLeft() {
    clearInterval(this.scrollLeftInterval);
  }

}
