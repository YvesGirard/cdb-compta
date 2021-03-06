import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AccountService } from "../../services/account.service";
import { Account } from '../../models/account';

import {
  AddAccount,
  AddAccountSuccess,
  AddAccountFail,
  RemoveAccount,
  RemoveAccountSuccess,
  RemoveAccountFail,
  LoadAccounts,
  LoadAccountsSuccess,
  LoadAccountsFail,
  UpdateAccount,
  UpdateAccountSuccess,
  UpdateAccountFail,
  AccountActionTypes,
} from '../actions/account.actions';

@Injectable()
export class AccountEffects {

  @Effect()
  loadAccounts$ = this.actions$.pipe(
    ofType(AccountActionTypes.LoadAccounts),
    switchMap(() => {
      return this.accountService
        .getAccounts()
        .pipe(
          map((Accounts : Account[]) => new LoadAccountsSuccess(Accounts)),
          catchError(error => of(new LoadAccountsFail(error)))
        );
    })
  );


  @Effect()
  createAccount$ = this.actions$.pipe(
    ofType(AccountActionTypes.AddAccount),
    map((action: AddAccount) => action.payload), 
    switchMap(account => {
      
      return this.accountService
        .createAccount(account)
        .pipe(
          map(account => new AddAccountSuccess(account)),
          catchError(error => of(new AddAccountFail(error)))
        );
    })
  );

  /*@Effect()
  createAccountSuccess$ = this.actions$
    .ofType(AccountActionTypes.AddAccountSuccess)
    .pipe(
      map((action: AddAccountSuccess) => action.payload),
      map(account => {
        // rien
      })
    );*/

  @Effect()
  updateAccount$ = this.actions$.pipe(
    ofType(AccountActionTypes.UpdateAccount),
    map((action: UpdateAccount) => action.payload),
    switchMap(account => {
      return this.accountService
        .updateAccount(account)
        .pipe(
          map(account => new UpdateAccountSuccess(account)),
          catchError(error => of(new UpdateAccountFail(error)))
        );
    })
  );

  @Effect()
  removeAccount$ = this.actions$.pipe(
    ofType(AccountActionTypes.RemoveAccount),
    map((action: RemoveAccount) => action.payload),
    switchMap(account => {
      return this.accountService
        .removeAccount(account)
        .pipe(
          map(() => new RemoveAccountSuccess(account)),
          catchError(error => of(new RemoveAccountFail(error)))
        );
    })
  );


  constructor(private actions$: Actions, private accountService: AccountService) { }
}