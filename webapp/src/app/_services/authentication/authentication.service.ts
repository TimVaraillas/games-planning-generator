import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from 'lodash';
import * as moment from "moment";
import { User } from 'src/app/_models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  uri = 'http://localhost:3000/user';

  private loggedUserSubject: BehaviorSubject<User>;
  public loggedUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loggedUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('loggedUser')));
    this.loggedUser = this.loggedUserSubject.asObservable();
  }

  public get loggedUserValue(): User {
    return this.loggedUserSubject.value;
  }

  login(user: User) {
    return this.http.post(`${this.uri}/login`, _.pick(user, ['email', 'password']))
      .pipe(map((data: any) => {
        let user: User = data.user;
        user.token = data.token
        localStorage.setItem('loggedUser', JSON.stringify(user));
        this.loggedUserSubject.next(user);
        return user;
      }));
  }

  register(user: User) {
    return this.http.post(`${this.uri}/register`, user);
  }
  
  logout() {
    localStorage.removeItem('loggedUser');
    this.loggedUserSubject.next(null);
    this.router.navigate(['/login']);
  }

}
