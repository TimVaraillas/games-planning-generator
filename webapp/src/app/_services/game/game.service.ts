import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../../_models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  uri = "http://localhost:3000/game";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.uri}`);
  }

  getOne(id: String) {
    return this.http.get(`${this.uri}/${id}`);
  }

  add(game: Game) {
    return this.http.post(`${this.uri}/add`, game);
  }

  update(game: Game) {
    return this.http.put(`${this.uri}/update/${game._id}`, game);
  }

  delete(id: String) {
    return this.http.delete(`${this.uri}/delete/${id}`);
  }
}
