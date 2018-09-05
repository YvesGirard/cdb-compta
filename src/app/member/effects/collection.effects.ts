import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of, forkJoin } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';

import { Member } from '../../model/member';

import { MemberService } from '../services/member.service';

import {
  CollectionActionTypes,
  Load,
  LoadFail,
  LoadSuccess,
  GetTotal,
  GetTotalFail,
  GetTotalSuccess,
} from '../actions/collection.actions';

@Injectable()
export class CollectionEffects {

  @Effect()
  loadCollection$ = this.actions$.pipe(
    ofType(CollectionActionTypes.Load),
    map((action: Load) => action.payload),
    switchMap((query) => {
      return forkJoin(
        this.participantService.getMembers(
          query.filter,
          query.sortOrder,
          query.sortField,
          query.pageIndex,
          query.pageSize,
          query.searchField
        ),
        this.participantService.getTotalMember(
          query.filter,
          query.searchField),
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
  getTotal$ = this.actions$.ofType(CollectionActionTypes.GetTotal).pipe(
    switchMap(() => {
      return this.participantService
        .getTotalMember()
        .pipe(
          map((total: number) => new GetTotalSuccess(total)),
          catchError(error => of(new GetTotalFail(error)))
        );
    })
  );


  constructor(private actions$: Actions, private participantService: MemberService) { }
}
