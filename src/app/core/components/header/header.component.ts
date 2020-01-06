import { logout } from './../../../auth/actions/auth.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { selectUser, selectLoggedIn } from '@bb-app/auth/selectors';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import * as fromAuth from '../../../auth/reducers';
import { AuthActions } from '@bb-app/auth/actions';

@Component({
  selector: 'bb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  private unsubscribe$ = new Subject<void>();
  // readonly loggedInUser$ = this.store.pipe(select(selectUser), filter(user => user !== null));
  readonly loggedIn$ = this.store.pipe(select(selectLoggedIn));
  constructor(private store: Store<fromAuth.State>) { }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logout(event) {
    this.store.dispatch(AuthActions.logout());
    event.preventDefault();
  }

}
