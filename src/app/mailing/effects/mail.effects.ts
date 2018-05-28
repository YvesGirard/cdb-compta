import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable ,  of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { MailService } from "../../services/mail.service";

import {
    Count,
    CountComplete,
    CountError,
    MailActionTypes,
} from './../actions/mail.actions';

@Injectable()
export class MailEffects {

  @Effect()
  countMails$: Observable<Action> = this.actions$.pipe(
    ofType(MailActionTypes.Count),
    switchMap(() =>
        this.mailService.count()
        .pipe(
          map((counter: number) => new CountComplete(counter)),
          catchError(error => of(new CountError(error)))
        )
    )
  );




  constructor(private actions$: Actions, private mailService: MailService,) {}
}