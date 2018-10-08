import { Action } from '@ngrx/store';
import { MailingListMember } from '../../../model/mail';

export enum MailingMemberCollectionActionTypes {
  Load = '[MemberCollection] Load',
  LoadSuccess = '[MemberCollection] Load Success',
  LoadFail = '[MemberCollection] Load Fail',
  GetTotal = '[MemberCollection] GetTotal',
  GetTotalSuccess = '[MemberCollection] GetTotal Success',
  GetTotalFail = '[MemberCollection] GetTotal Fail',
  Search = '[MemberCollection] Search',
  Page = '[MemberCollection] Page',
}


/**
 * Load MemberCollection Actionss 
 */
export class Load implements Action {
  readonly type = MailingMemberCollectionActionTypes.Load;

  constructor(public payload: any) { }

}

export class LoadSuccess implements Action {
  readonly type = MailingMemberCollectionActionTypes.LoadSuccess;

  constructor(public payload: MailingListMember[]) { }
}

export class LoadFail implements Action {
  readonly type = MailingMemberCollectionActionTypes.LoadFail;

  constructor(public payload: any) { }
}

export class GetTotal implements Action {
  readonly type = MailingMemberCollectionActionTypes.GetTotal;
}

export class GetTotalSuccess implements Action {
  readonly type = MailingMemberCollectionActionTypes.GetTotalSuccess;

  constructor(public payload: any) { }
}

export class GetTotalFail implements Action {
  readonly type = MailingMemberCollectionActionTypes.GetTotalFail;

  constructor(public payload: any) { }
}

export class Search implements Action {
  readonly type = MailingMemberCollectionActionTypes.Search;

  constructor(public payload: {
    filter: string,
    searchField: string,
  }) { }

}

export class Page implements Action {
  readonly type = MailingMemberCollectionActionTypes.Page;

  constructor(public payload: {
    pageIndex: number,
    pageSize: number,
  }) { }

}

export type MemberCollectionActionsUnion =
  | Load
  | LoadSuccess
  | LoadFail
  | GetTotal
  | GetTotalSuccess
  | GetTotalFail
  | Search
  | Page;