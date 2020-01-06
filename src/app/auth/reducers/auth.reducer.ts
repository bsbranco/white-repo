import { createReducer, on } from '@ngrx/store';
import { User } from '../models';
import { AuthApiActions, AuthActions } from '../actions';


export const statusFeatureKey = 'status';


export interface State {
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  errorMessage?: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthApiActions.loginSuccess, (state, { user }) => ({ ...state, user })),
  on(AuthActions.logout, () => initialState)
);

export const getUser = (state: State) => state.user;
