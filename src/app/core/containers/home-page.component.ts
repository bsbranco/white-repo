
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromAuth from '../../auth/reducers';
import { selectUser } from './../../auth/selectors/index';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'bb-home-page',
  templateUrl: 'home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnDestroy {

  private unsubscribe$ = new Subject<void>();
  readonly loggedInUser$ = this.store.pipe(select(selectUser), filter(user => user !== null));
  constructor(private store: Store<fromAuth.State>) { }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
