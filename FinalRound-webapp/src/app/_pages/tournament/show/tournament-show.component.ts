import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';

import { COMPETITORS } from '../../../../assets/data/mock-competitors';
import { SingleEliminationTournament } from 'src/app/_models/tournament';

@Component({
  selector: 'app-tournament-show',
  templateUrl: './tournament-show.component.html',
  styleUrls: ['./tournament-show.component.scss']
})
export class TournamentShowComponent implements OnInit {

  tournament: SingleEliminationTournament;

  grid: any [] = [];

  scrollRightInterval: any;
  scrollLeftInterval: any;

  @ViewChild('gridContainer', {static: false}) gridElement: ElementRef;

  constructor() {
    this.tournament = new SingleEliminationTournament();
    this.tournament.competitors = COMPETITORS.slice(0, 99);
  }

  ngOnInit() {
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
