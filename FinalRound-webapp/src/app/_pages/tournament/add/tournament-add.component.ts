import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
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
    private tournamentService: TournamentService
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
    this.tournamentService.add(this.tournament);
  }

}
