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
    console.log(tournament);
    // this.http.post(`${this.uri}/add`, obj).subscribe(res => console.log('Done'));
  }
}
