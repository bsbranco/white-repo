import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromAuth from '../reducers';
import { LoginPageActions } from '../actions';
import { Credentials } from '../models';
import { selectLoginPagePending, selectLoginPageError } from '../selectors';


@Component({
  selector: 'bb-login-page',
  template: `
    <bb-login-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async"
    >
    </bb-login-form>
  `,
  styles: [],
})
export class LoginPageComponent implements OnInit {
  pending$ = this.store.pipe(select(selectLoginPagePending));
  error$ = this.store.pipe(select(selectLoginPageError));

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {}

  onSubmit(credentials: Credentials) {
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }
}
