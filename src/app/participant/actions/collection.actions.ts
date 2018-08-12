import { Action } from '@ngrx/store';
import { Participant } from '../../model/participant';

export enum CollectionActionTypes {
    Load = '[Collection] Load',
    LoadSuccess = '[Collection] Load Success',
    LoadFail = '[Collection] Load Fail',
    GetTotal = '[Collection] GetTotal',
    GetTotalSuccess = '[Collection] GetTotal Success',
    GetTotalFail = '[Collection] GetTotal Fail',
  }
  
  
  /**
   * Load Collection Actions
   */
  export class Load implements Action {
    readonly type = CollectionActionTypes.Load;

    constructor(public payload: any) {}

  }
  
  export class LoadSuccess implements Action {
    readonly type = CollectionActionTypes.LoadSuccess;
  
    constructor(public payload: Participant[]) {}
  }
  
  export class LoadFail implements Action {
    readonly type = CollectionActionTypes.LoadFail;
  
    constructor(public payload: any) {}
  }

  export class GetTotal implements Action {
    readonly type = CollectionActionTypes.GetTotal;
  }
  
  export class GetTotalSuccess implements Action {
    readonly type = CollectionActionTypes.GetTotalSuccess;
  
    constructor(public payload: any) {}
  }
  
  export class GetTotalFail implements Action {
    readonly type = CollectionActionTypes.GetTotalFail;
  
    constructor(public payload: any) {}
  }
  
  export type CollectionActionsUnion =
    | Load
    | LoadSuccess
    | LoadFail
    | GetTotal
    | GetTotalSuccess
    | GetTotalFail;
