import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AccountService } from "../../services/account.service";
import { Account } from '../../models/account';

import {
  UpdateAccount,
  UpdateAccountSuccess,
  UpdateAccountFail,
} from '../actions/account.actions';

@Injectable()
export class AccountEffects {

  @Effect()
  updateAccount$ = this.actions$.ofType(AccountActionTypes.UpdateAccount).pipe(
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

  constructor(private actions$: Actions, private accountService: AccountService) { }
}