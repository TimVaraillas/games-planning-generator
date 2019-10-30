import { Injectable } from '@angular/core';
import { Tournament } from '../../_models/tournament';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  uri = "http://localhost:4000/tournament";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.uri}`);
  }

  getOne(id: String) {
    return this.http.get(`${this.uri}/${id}`);
  }

  add(tournament: Tournament) {
    return this.http.post(`${this.uri}/add`, tournament);
  }

  delete(id: String) {
    return this.http.delete(`${this.uri}/delete/${id}`);
  }
}
