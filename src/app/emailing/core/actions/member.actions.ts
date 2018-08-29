import { Action } from '@ngrx/store';
import { MailingListMember } from '../../../model/mail';

export enum MailingListMemberActionTypes {
    AddMailingListMember = '[MailingListMember] Add',
    AddMailingListMemberSuccess = '[MailingListMember] Add Success',
    AddMailingListMemberFail = '[MailingListMember] Add Fail',      
    UpdateMailingListMember = '[MailingListMember] Update',
    UpdateMailingListMemberSuccess = '[MailingListMember] Update Success',
    UpdateMailingListMemberFail = '[MailingListMember] Update Fail',   
    DeleteMailingListMember = '[MailingListMember] Delete',
    DeleteMailingListMemberSuccess = '[MailingListMember] Delete Success',
    DeleteMailingListMemberFail = '[MailingListMember] Delete Fail',    
    LoadMailingListMember = '[MailingListMember] Load',
    LoadMailingListMemberSuccess = '[MailingListMember] Load Success',
    LoadMailingListMemberFail = '[MailingListMember] Load Fail',
    SelectMailingListMember = '[MailingListMember] Select',      
}

export class AddMailingListMember implements Action {
    readonly type = MailingListMemberActionTypes.AddMailingListMember;

    constructor(public payload: MailingListMember) { }
}

export class AddMailingListMemberSuccess implements Action {
    readonly type = MailingListMemberActionTypes.AddMailingListMemberSuccess;

    constructor(public payload: MailingListMember) { }
}

export class AddMailingListMemberFail implements Action {
    readonly type = MailingListMemberActionTypes.AddMailingListMemberFail;

    constructor(public payload: any) { }
}

export class UpdateMailingListMember implements Action {
    readonly type = MailingListMemberActionTypes.UpdateMailingListMember;

    constructor(public payload: MailingListMember) { }
}

export class UpdateMailingListMemberSuccess implements Action {
    readonly type = MailingListMemberActionTypes.UpdateMailingListMemberSuccess;

    constructor(public payload: MailingListMember) { }
}

export class UpdateMailingListMemberFail implements Action {
    readonly type = MailingListMemberActionTypes.UpdateMailingListMemberFail;

    constructor(public payload: any) { }
}

export class DeleteMailingListMember implements Action {
    readonly type = MailingListMemberActionTypes.DeleteMailingListMember;

    constructor(public payload: MailingListMember) { }
}

export class DeleteMailingListMemberSuccess implements Action {
    readonly type = MailingListMemberActionTypes.DeleteMailingListMemberSuccess;

    constructor(public payload: MailingListMember) { }
}

export class DeleteMailingListMemberFail implements Action {
    readonly type = MailingListMemberActionTypes.DeleteMailingListMemberFail;

    constructor(public payload: any) { }
}

export class LoadMailingListMember implements Action {
    readonly type = MailingListMemberActionTypes.LoadMailingListMember;
  
    constructor(public payload: string) {}
  }

  export class LoadMailingListMemberSuccess implements Action {
    readonly type = MailingListMemberActionTypes.LoadMailingListMemberSuccess;

    constructor(public payload: MailingListMember) { }
}

export class LoadMailingListMemberFail implements Action {
    readonly type = MailingListMemberActionTypes.LoadMailingListMemberFail;

    constructor(public payload: any) { }
}

  export class SelectMailingListMember implements Action {
    readonly type = MailingListMemberActionTypes.SelectMailingListMember;
  
    constructor(public payload: string) {}
  }

export type MailingListMemberActionsUnion =
    | AddMailingListMember
    | AddMailingListMemberSuccess
    | AddMailingListMemberFail
    | UpdateMailingListMember
    | UpdateMailingListMemberSuccess
    | UpdateMailingListMemberFail
    | DeleteMailingListMember
    | DeleteMailingListMemberSuccess
    | DeleteMailingListMemberFail
    | LoadMailingListMember
    | LoadMailingListMemberSuccess
    | LoadMailingListMemberFail   
    | SelectMailingListMember;