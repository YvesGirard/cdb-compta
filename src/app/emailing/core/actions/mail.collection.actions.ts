import { Action } from '@ngrx/store';
import { Mail } from '../../../model/mail';

export enum MailCollectionActionTypes {
  Load = '[MailCollection] Load',
  LoadSuccess = '[MailCollection] Load Success',
  LoadFail = '[MailCollection] Load Fail',
  GetTotal = '[MailCollection] GetTotal',
  GetTotalSuccess = '[MailCollection] GetTotal Success',
  GetTotalFail = '[MailCollection] GetTotal Fail',
  Search = '[MailCollection] Search',
  Page = '[MailCollection] Page',
}


/**
 * Load MailCollection Actions
 */
export class Load implements Action {
  readonly type = MailCollectionActionTypes.Load;

  constructor(public payload: any) { }

}

export class LoadSuccess implements Action {
  readonly type = MailCollectionActionTypes.LoadSuccess;

  constructor(public payload: Mail[]) { }
}

export class LoadFail implements Action {
  readonly type = MailCollectionActionTypes.LoadFail;

  constructor(public payload: any) { }
}

export class GetTotal implements Action {
  readonly type = MailCollectionActionTypes.GetTotal;
}

export class GetTotalSuccess implements Action {
  readonly type = MailCollectionActionTypes.GetTotalSuccess;

  constructor(public payload: any) { }
}

export class GetTotalFail implements Action {
  readonly type = MailCollectionActionTypes.GetTotalFail;

  constructor(public payload: any) { }
}

export class Search implements Action {
  readonly type = MailCollectionActionTypes.Search;

  constructor(public payload: {
    filter: string,
    searchField: string,
  }) { }

}

export class Page implements Action {
  readonly type = MailCollectionActionTypes.Page;

  constructor(public payload: {
    pageIndex: number,
    pageSize: number,
  }) { }

}

export type MailCollectionActionsUnion =
  | Load
  | LoadSuccess
  | LoadFail
  | GetTotal
  | GetTotalSuccess
  | GetTotalFail
  | Search
  | Page;