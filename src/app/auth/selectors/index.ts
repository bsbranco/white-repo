import { AuthState, authFeatureKey, State } from '../reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { getUser } from '../reducers/auth.reducer';
import { getError, getPending } from '../reducers/login-page.reducer';

export const selectAuthState = createFeatureSelector<State, AuthState>(
  authFeatureKey
);

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);
export const selectUser = createSelector(
  selectAuthStatusState,
  getUser
);
export const selectLoggedIn = createSelector(selectUser, user => !!user);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage
);
export const selectLoginPageError = createSelector(
  selectLoginPageState,
  getError
);
export const selectLoginPagePending = createSelector(
  selectLoginPageState,
  getPending
);
