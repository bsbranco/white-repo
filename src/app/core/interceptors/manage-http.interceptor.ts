
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';




import { logger, HttpCancelService } from './../services';
import { State, Http } from '../reducers';
import { requestStart, requestEnd } from '../actions/http.actions';



@Injectable()
export class ManageHttpInterceptor implements HttpInterceptor {

    constructor(private httpCancelService: HttpCancelService, private store: Store<State>) {}
    intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
        const request: Http = { id: randomNumber(), url: req.url };
        logger.debug(`[MANAGE_HTTP_INTERCEPTOR] Request started. Request: [${request.id}]:${request.url}`);
        this.store.dispatch(requestStart({ request }));
        return next.handle(req).pipe(
            takeUntil(this.httpCancelService.onCancelPendingRequests()),
            finalize(() => {
                logger.debug(`[MANAGE_HTTP_INTERCEPTOR] Request completed. Request: [${request.id}]:${request.url}`);
                this.store.dispatch(requestEnd({ request }));
            })
        );
    }
}

export const randomNumber = () => {
    return Math.ceil(Math.random() * 100 * 1000 * 1000 * 1000 * 1000 * 1000);
};
