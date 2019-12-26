import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from 'src/app/_models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  uri = "http://localhost:3000/team";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.uri}`);
  }

  getOne(id: String) {
    return this.http.get(`${this.uri}/${id}`);
  }

  add(team: Team) {
    return this.http.post(`${this.uri}/add`, team);
  }

  update(team: Team) {
    return this.http.put(`${this.uri}/update/${team._id}`, team);
  }

  delete(id: String) {
    return this.http.delete(`${this.uri}/delete/${id}`);
  }
}
