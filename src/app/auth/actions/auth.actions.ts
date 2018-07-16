import { Action } from '@ngrx/store';
import { User } from '../models/user';
import { AuthResult } from '../models/auth';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  HandleAuth = '[Auth] HandleAuth',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
}

export class HandleAuth implements Action {
    readonly type = AuthActionTypes.HandleAuth;
  }

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { authResult: AuthResult}) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActionsUnion =
  | Login
  | HandleAuth
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout;
