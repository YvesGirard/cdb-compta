import { Action } from '@ngrx/store';
import { Member } from '../../model/member';

export enum MemberCollectionActionTypes {
    Load = '[MemberCollection] Load',
    LoadSuccess = '[MemberCollection] Load Success',
    LoadFail = '[MemberCollection] Load Fail',
    GetTotal = '[MemberCollection] GetTotal',
    GetTotalSuccess = '[MemberCollection] GetTotal Success',
    GetTotalFail = '[MemberCollection] GetTotal Fail',
    Search = '[MemberCollection] Search',    
  }
  
  
  /**
   * Load MemberCollection Actions
   */
  export class Load implements Action {
    readonly type = MemberCollectionActionTypes.Load;

    constructor(public payload: any) {}

  }
  
  export class LoadSuccess implements Action {
    readonly type = MemberCollectionActionTypes.LoadSuccess;
  
    constructor(public payload: Member[]) {}
  }
  
  export class LoadFail implements Action {
    readonly type = MemberCollectionActionTypes.LoadFail;
  
    constructor(public payload: any) {}
  }

  export class GetTotal implements Action {
    readonly type = MemberCollectionActionTypes.GetTotal;
  }
  
  export class GetTotalSuccess implements Action {
    readonly type = MemberCollectionActionTypes.GetTotalSuccess;
  
    constructor(public payload: any) {}
  }
  
  export class GetTotalFail implements Action {
    readonly type = MemberCollectionActionTypes.GetTotalFail;
  
    constructor(public payload: any) {}
  }
  
  export class Search implements Action {
    readonly type = MemberCollectionActionTypes.Search;

    constructor(public payload: {
      filter:string,
      sortOrder:string,
      sortField:string,
      pageNumber:number,
      pageSize:number,
      searchField:string,
    }) {}

  }

  export type MemberCollectionActionsUnion =
    | Load
    | LoadSuccess
    | LoadFail
    | GetTotal
    | GetTotalSuccess
    | GetTotalFail
    | Search;