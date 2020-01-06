
import { mergeMap, finalize } from 'rxjs/operators';
import { Observable, throwError, timer } from 'rxjs';

import { logger } from './logger.service';
import { HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';


export interface RetryParams {
    maxRetryAttempts?: number;
    scalingDuration?: number;
    excludedStatusCodes?: Array<number>;
}
export abstract class BaseService {

    // Http Headers
    protected httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor() { }

    protected genericRetryStrategy = (retryParams: RetryParams = {
        maxRetryAttempts: 3,
        scalingDuration: 500,
        excludedStatusCodes: [401, 403, 404]
    }) => (attempts: Observable<any>) => {
        return attempts.pipe(
            mergeMap((error, i) => {
                const retryAttempt = i + 1;
                // if maximum number of retries have been met
                // or response is a status code we don't wish to retry, throw error
                if (
                    retryAttempt > retryParams.maxRetryAttempts ||
                    retryParams.excludedStatusCodes.find(e => e === error.status)
                ) {
                    return throwError(error);
                }
                logger.debug(`Attempt ${retryAttempt}: retrying in ${retryAttempt * retryParams.scalingDuration}ms`);
                // retry after 1s, 2s, etc...
                return timer(retryAttempt * retryParams.scalingDuration);
            }),
            // finalize(() => logger.debug('We are done!'))
        );
    }
    protected handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };

    protected camelCaseKeys = (o) => {
        if (this.isObject(o)) {
            const n = {};
            Object.keys(o)
                .forEach((k) => {
                    n[this.camelCase(k)] = this.camelCaseKeys(o[k]);
                });

            return n;
        } else if (Array.isArray(o)) {
            return o.map((i) => this.camelCaseKeys(i));
        }
        return o;
    }
    protected camelCase = (s: string) => s.replace(/[_,-](\w)/g, m => m[1].toUpperCase());
    protected kebabCase = (s: string) => s.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
    protected snakeCase = (s: string) => s.replace(/[A-Z]/g, m => '_' + m.toLowerCase());

    protected isObject = (o: any) => o === Object(o) && !Array.isArray(o) && typeof o !== 'function';

    protected errorHandl(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        logger.debug(errorMessage);
        return throwError(errorMessage);
    }

    protected convertFiltersToHttpParams(filters: any): HttpParams {
        let params = new HttpParams();

        for (const filterName in filters) {
            if (filterName) {
                params = params.append(filterName, filters[filterName]);
            }
        }
        return params;
    }

}
