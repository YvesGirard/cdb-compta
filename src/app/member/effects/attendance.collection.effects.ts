import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of, forkJoin, } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray, withLatestFrom } from 'rxjs/operators';

import { Attendance } from '../../model/member';

import { AttendanceService } from '../services/attendance.service';

import {
  AttendanceCollectionActionTypes,
  Load,
  LoadFail,
  LoadSuccess,
  GetTotal,
  GetTotalFail,
  GetTotalSuccess,
  Search,
} from '../actions/attendance.collection.actions';

import * as fromAttendances from '../reducers';


@Injectable()
export class AttendanceCollectionEffects {

  @Effect()
  loadAttendanceCollection$ = this.actions$.pipe(
    ofType(AttendanceCollectionActionTypes.Load),
    withLatestFrom(this.store.pipe(select(fromAttendances.getCollectionQuery))),
    map(([action, query]: ([Load, any])) => [action.payload, query]),
    switchMap((query) => {
      return forkJoin(
        this.participantService.getAttendances(
          query[1].filter,
          query[1].sortOrder,
          query[1].sortField,
          query[1].pageNumber,
          query[1].pageSize,
          query[1].searchField
        ),
        this.participantService.getTotalAttendance(
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
  getTotal$ = this.actions$.ofType(AttendanceCollectionActionTypes.GetTotal).pipe(
    switchMap(() => {
      return this.participantService
        .getTotalAttendance()
        .pipe(
          map((total: number) => new GetTotalSuccess(total)),
          catchError(error => of(new GetTotalFail(error)))
        );
    })
  );

  @Effect()
  search$ = this.actions$.pipe(
    ofType(AttendanceCollectionActionTypes.Search),
    map((action: Search) => new Load({})),
  );

  @Effect()
  page$ = this.actions$.pipe(
    ofType(AttendanceCollectionActionTypes.Page),
    map((action: Search) => new Load({})),
  );

  constructor(private actions$: Actions, 
    private participantService: AttendanceService,
    private store: Store<fromAttendances.State>,
  ) { }
}
