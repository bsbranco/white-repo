import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Credentials, User } from '../models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const AUTH_COOKIE_NAME = 'auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authCookieValue: string;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  //  signUp(user: User): Observable<any> {
  //     let api = `${this.endpoint}/register-user`;
  //     return this.http.post(api, user)
  //       .pipe(
  //         catchError(this.handleError)
  //       )
  //   }


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

  getToken() {
    this.cookieService.get(AUTH_COOKIE_NAME);
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

}

