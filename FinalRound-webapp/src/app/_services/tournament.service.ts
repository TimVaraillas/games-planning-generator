import { Injectable } from '@angular/core';
import Tournament from '../_models/tournament';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  uri = 'http://localhost:4000/tournament';

  constructor(private http: HttpClient) { }

  add(tournament: Tournament) {
    return this.http.post(`${this.uri}/add`, tournament);
  }
}
