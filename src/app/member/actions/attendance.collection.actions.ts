import { Action } from '@ngrx/store';
import { Attendance } from '../../model/member';

export enum AttendanceCollectionActionTypes {
  Load = '[AttendanceCollection] Load',
  LoadSuccess = '[AttendanceCollection] Load Success',
  LoadFail = '[AttendanceCollection] Load Fail',
  GetTotal = '[AttendanceCollection] GetTotal',
  GetTotalSuccess = '[AttendanceCollection] GetTotal Success',
  GetTotalFail = '[AttendanceCollection] GetTotal Fail',
  Search = '[AttendanceCollection] Search',
  Page = '[AttendanceCollection] Page',
}


/**
 * Load AttendanceCollection Actions
 */
export class Load implements Action {
  readonly type = AttendanceCollectionActionTypes.Load;

  constructor(public payload: any) { }

}

export class LoadSuccess implements Action {
  readonly type = AttendanceCollectionActionTypes.LoadSuccess;

  constructor(public payload: Attendance[]) { }
}

export class LoadFail implements Action {
  readonly type = AttendanceCollectionActionTypes.LoadFail;

  constructor(public payload: any) { }
}

export class GetTotal implements Action {
  readonly type = AttendanceCollectionActionTypes.GetTotal;
}

export class GetTotalSuccess implements Action {
  readonly type = AttendanceCollectionActionTypes.GetTotalSuccess;

  constructor(public payload: any) { }
}

export class GetTotalFail implements Action {
  readonly type = AttendanceCollectionActionTypes.GetTotalFail;

  constructor(public payload: any) { }
}

export class Search implements Action {
  readonly type = AttendanceCollectionActionTypes.Search;

  constructor(public payload: {
    filter: string,
    searchField: string,
  }) { }

}

export class Page implements Action {
  readonly type = AttendanceCollectionActionTypes.Page;

  constructor(public payload: {
    pageIndex: number,
    pageSize: number,
  }) { }

}

export type AttendanceCollectionActionsUnion =
  | Load
  | LoadSuccess
  | LoadFail
  | GetTotal
  | GetTotalSuccess
  | GetTotalFail
  | Search
  | Page;