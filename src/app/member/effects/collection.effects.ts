import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of, forkJoin, } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray, withLatestFrom } from 'rxjs/operators';

import { Member } from '../../model/member';

import { MemberService } from '../services/member.service';

import {
  MemberCollectionActionTypes,
  Load,
  LoadFail,
  LoadSuccess,
  GetTotal,
  GetTotalFail,
  GetTotalSuccess,
  Search,
} from '../actions/collection.actions';

import * as fromMembers from '../reducers';


@Injectable()
export class MemberCollectionEffects {

  @Effect()
  loadMemberCollection$ = this.actions$.pipe(
    ofType(MemberCollectionActionTypes.Load),
    withLatestFrom(this.store.pipe(select(fromMembers.getCollectionQuery))),
    map(([action, query]: ([Load, any])) => [action.payload, query]),
    switchMap((query) => {
      return forkJoin(
        this.participantService.getMembers(
          query[1].filter,
          query[1].sortOrder,
          query[1].sortField,
          query[1].pageNumber,
          query[1].pageSize,
          query[1].searchField
        ),
        this.participantService.getTotalMember(
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
  getTotal$ = this.actions$.ofType(MemberCollectionActionTypes.GetTotal).pipe(
    switchMap(() => {
      return this.participantService
        .getTotalMember()
        .pipe(
          map((total: number) => new GetTotalSuccess(total)),
          catchError(error => of(new GetTotalFail(error)))
        );
    })
  );

  @Effect()
  search$ = this.actions$.pipe(
    ofType(MemberCollectionActionTypes.Search),
    map((action: Search) => new Load({})),
  );

  constructor(private actions$: Actions, 
    private participantService: MemberService,
    private store: Store<fromMembers.State>,
  ) { }
}
