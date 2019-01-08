import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of, forkJoin, } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray, withLatestFrom } from 'rxjs/operators';

import { Mail } from '../../../model/mail';

import { MailingListService } from '../services/';

import {
  MailCollectionActionTypes,
  Load,
  LoadFail,
  LoadSuccess,
  GetTotal,
  GetTotalFail,
  GetTotalSuccess,
  Search,
  //SelectAll,
  //SelectAllSuccess,
} from '../actions/mail.collection.actions';

import * as fromMails from '../reducers';


@Injectable()
export class MailCollectionEffects {

  @Effect()
  loadMailCollection$ = this.actions$.pipe(
    ofType(MailCollectionActionTypes.Load),
    withLatestFrom(this.store.pipe(select(fromMails.getMailCollectionQuery))),
    map(([action, query]: ([Load, any])) => [action.payload, query]),
    switchMap((query) => {
      return forkJoin(
        this.mailService.getMails(
          query[1].filter,
          query[1].sortOrder,
          query[1].sortField,
          query[1].pageIndex,
          query[1].pageSize,
          query[1].searchField
        ),
        this.mailService.getTotalMails(
          query[1].filter,
          query[1].searchField),
      )
    }),
    switchMap((res) => [
      new LoadSuccess(res[0]),
      new GetTotalSuccess(res[1])
    ]),
    catchError((error) => {
      return [
      new LoadFail(error),
      new GetTotalFail(error)
    ]})
  );

  @Effect()
  getTotal$ = this.actions$.ofType(MailCollectionActionTypes.GetTotal).pipe(
    switchMap(() => {
      return this.mailService
        .getTotalMails()
        .pipe(
          map((total: number) => new GetTotalSuccess(total)),
          catchError(error => of(new GetTotalFail(error)))
        );
    })
  );

  @Effect()
  search$ = this.actions$.pipe(
    ofType(MailCollectionActionTypes.Search),
    map((action: Search) => new Load({})),
  );

  @Effect()
  page$ = this.actions$.pipe(
    ofType(MailCollectionActionTypes.Page),
    map((action: Search) => new Load({})),
  );

 /* @Effect()
  selectAll$ = this.actions$.pipe(
    ofType(MailCollectionActionTypes.SelectAll),
    withLatestFrom(this.store.pipe(select(fromMails.getCollectionQuery))),
    map(([action, query]: ([SelectAll, any])) => [action, query]),
    switchMap((query) => {
      return this.mailService
      .getMails(
        query[1].filter,
        query[1].sortOrder,
        query[1].sortField,
        query[1].pageNumber,
        query[1].pageSize,
        query[1].searchField
      ).pipe(
          map((ids:  string[]) => new SelectAllSuccess(ids)),
      );
    })
  );*/

  constructor(private actions$: Actions, 
    private mailService: MailingListService,
    private store: Store<fromMails.State>,
  ) { }
}
