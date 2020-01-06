import { State, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from '@bb-app/reducers';
import * as fromHttp from '../reducers';


export const selectHttpState =
    createFeatureSelector<fromRoot.State, fromHttp.State>(fromHttp.httpFeatureKey);
