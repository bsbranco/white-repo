import { createAction, props } from '@ngrx/store';
import { Http } from '../reducers';



export const requestStart = createAction('[Http] Http Request start',
  props<{ request: Http }>());
export const requestEnd = createAction('[Http] Http Request end',
props<{ request: Http }>());

export const requestsReset = createAction('[Http] Http Requests reset ');
