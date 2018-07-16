import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap, switchMap } from 'rxjs/operators';
import { AuthResult } from '../models/auth';

import {
  AuthActionTypes,
  Login,
  HandleAuth,
  LoginFailure,
  LoginSuccess,
  Logout,
} from '../actions/auth.actions';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    exhaustMap(() =>
      this.authService
        .login()
    )
  );

  @Effect()
  handleAuth$ = this.actions$.pipe(
    ofType(AuthActionTypes.HandleAuth),
    switchMap(() =>
    this.authService
      .handleAuth()
      .pipe(
        map((authResult : AuthResult) => new LoginSuccess({authResult})),
        catchError(error => of(new LoginFailure(error)))
      )
  )
  );
 
  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
    tap(authed => {
      this.router.navigate(['/']);
    }),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
