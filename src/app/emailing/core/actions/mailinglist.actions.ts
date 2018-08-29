import { Action } from '@ngrx/store';
import { MailingList } from '../../../model/mail';

export enum MailingListActionTypes {
    AddMailingList = '[MailingList] Add',
    AddMailingListSuccess = '[MailingList] Add Success',
    AddMailingListFail = '[MailingList] Add Fail',      
    UpdateMailingList = '[MailingList] Update',
    UpdateMailingListSuccess = '[MailingList] Update Success',
    UpdateMailingListFail = '[MailingList] Update Fail',   
    DeleteMailingList = '[MailingList] Delete',
    DeleteMailingListSuccess = '[MailingList] Delete Success',
    DeleteMailingListFail = '[MailingList] Delete Fail',    
    LoadMailingList = '[MailingList] Load',
    LoadMailingListSuccess = '[MailingList] Load Success',
    LoadMailingListFail = '[MailingList] Load Fail',
    SelectMailingList = '[MailingList] Select',      
}

export class AddMailingList implements Action {
    readonly type = MailingListActionTypes.AddMailingList;

    constructor(public payload: MailingList) { }
}

export class AddMailingListSuccess implements Action {
    readonly type = MailingListActionTypes.AddMailingListSuccess;

    constructor(public payload: MailingList) { }
}

export class AddMailingListFail implements Action {
    readonly type = MailingListActionTypes.AddMailingListFail;

    constructor(public payload: any) { }
}

export class UpdateMailingList implements Action {
    readonly type = MailingListActionTypes.UpdateMailingList;

    constructor(public payload: MailingList) { }
}

export class UpdateMailingListSuccess implements Action {
    readonly type = MailingListActionTypes.UpdateMailingListSuccess;

    constructor(public payload: MailingList) { }
}

export class UpdateMailingListFail implements Action {
    readonly type = MailingListActionTypes.UpdateMailingListFail;

    constructor(public payload: any) { }
}

export class DeleteMailingList implements Action {
    readonly type = MailingListActionTypes.DeleteMailingList;

    constructor(public payload: MailingList) { }
}

export class DeleteMailingListSuccess implements Action {
    readonly type = MailingListActionTypes.DeleteMailingListSuccess;

    constructor(public payload: MailingList) { }
}

export class DeleteMailingListFail implements Action {
    readonly type = MailingListActionTypes.DeleteMailingListFail;

    constructor(public payload: any) { }
}

export class LoadMailingList implements Action {
    readonly type = MailingListActionTypes.LoadMailingList;
  
    constructor() {}
  }

  export class LoadMailingListSuccess implements Action {
    readonly type = MailingListActionTypes.LoadMailingListSuccess;

    constructor(public payload: MailingList[]) { }
}

export class LoadMailingListFail implements Action {
    readonly type = MailingListActionTypes.LoadMailingListFail;

    constructor(public payload: any) { }
}

  export class SelectMailingList implements Action {
    readonly type = MailingListActionTypes.SelectMailingList;
  
    constructor(public payload: string) {}
  }

export type MailingListActionsUnion =
    | AddMailingList
    | AddMailingListSuccess
    | AddMailingListFail
    | UpdateMailingList
    | UpdateMailingListSuccess
    | UpdateMailingListFail
    | DeleteMailingList
    | DeleteMailingListSuccess
    | DeleteMailingListFail
    | LoadMailingList
    | LoadMailingListSuccess
    | LoadMailingListFail   
    | SelectMailingList;