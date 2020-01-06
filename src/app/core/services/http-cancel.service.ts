import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { State, Http } from '@bb-app/core/reducers';

import { requestsReset } from '../actions/http.actions';


@Injectable({ providedIn: 'root' })
export class HttpCancelService {

    private pendingHTTPRequests$ = new Subject<void>();

    constructor(private store: Store<State>) { }

    public cancelPendingRequests(request?: Http) {
        this.store.dispatch(requestsReset());
        this.pendingHTTPRequests$.next();
    }
    public onCancelPendingRequests() {
        return this.pendingHTTPRequests$.asObservable();
    }

}
