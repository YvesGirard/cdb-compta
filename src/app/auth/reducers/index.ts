import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromRoot from '../../reducers';
  import * as fromAuth from './auth.reducer';
  import * as fromLogin from './login.reducer';
  
  export interface AuthState {
    status: fromAuth.State;
    login: fromLogin.State;
  }
  
  export interface State extends fromRoot.State {
    auth: AuthState;
  }
  
  export const reducers: ActionReducerMap<AuthState> = {
    status: fromAuth.reducer,
    login: fromLogin.reducer,
  };
  
  export const selectAuthState = createFeatureSelector<AuthState>('auth');
  
  export const selectAuthStatusState = createSelector(
    selectAuthState,
    (state: AuthState) => state.status
  );
  export const getLoggedIn = createSelector(
    selectAuthStatusState,
    fromAuth.getLoggedIn
  );
  export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);
  export const getAuth = createSelector(selectAuthStatusState, fromAuth.getAuth);
   
  export const isAdmin = createSelector(
    getUser,
    (user) => {
      return user.isAdmin();
    }
  );

  export const getToken = createSelector(
    getAuth,
    (auth) => {
      return auth.token;
    }
  );

  export const selectLoginPageState = createSelector(
    selectAuthState,
    (state: AuthState) => state.login
  );
  export const getLoginPageError = createSelector(
    selectLoginPageState,
    fromLogin.getError
  );
  export const getLoginPagePending = createSelector(
    selectLoginPageState,
    fromLogin.getPending
  );
