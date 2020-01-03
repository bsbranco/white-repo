import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Credentials, User } from '../models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login({ username, password }: Credentials): Observable<User> {
    return this.http.post<any>(`/users/authenticate`, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    return of(true);
  }

}

