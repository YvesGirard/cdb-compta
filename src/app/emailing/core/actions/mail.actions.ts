import { Action } from '@ngrx/store';
import { Mail } from '../../../model/mail';

export enum MailActionTypes {
    AddMail = '[Mail] Add',
    AddMailSuccess = '[Mail] Add Success',
    AddMailFail = '[Mail] Add Fail',      
    UpdateMail = '[Mail] Update',
    UpdateMailSuccess = '[Mail] Update Success',
    UpdateMailFail = '[Mail] Update Fail',   
    UploadMail = '[Mail] UploadMail',
    UploadMailSuccess = '[Mail] UploadMail Success',
    UploadMailFail = '[Mail] UploadMail Fail',     
    DeleteMail = '[Mail] Delete',
    DeleteMailSuccess = '[Mail] Delete Success',
    DeleteMailFail = '[Mail] Delete Fail',    
    LoadMail = '[Mail] Load',
    LoadMailSuccess = '[Mail] Load Success',
    LoadMailFail = '[Mail] Load Fail',
    SelectMail = '[Mail] Select',      
}

export class AddMail implements Action {
    readonly type = MailActionTypes.AddMail;

    constructor(public payload: Mail) { }
}

export class AddMailSuccess implements Action {
    readonly type = MailActionTypes.AddMailSuccess;

    constructor(public payload: Mail) { }
}

export class AddMailFail implements Action {
    readonly type = MailActionTypes.AddMailFail;

    constructor(public payload: any) { }
}

export class UpdateMail implements Action {
    readonly type = MailActionTypes.UpdateMail;

    constructor(public payload: Mail) { }
}

export class UpdateMailSuccess implements Action {
    readonly type = MailActionTypes.UpdateMailSuccess;

    constructor(public payload: Mail) { }
}

export class UpdateMailFail implements Action {
    readonly type = MailActionTypes.UpdateMailFail;

    constructor(public payload: any) { }
}

export class UploadMail implements Action {
    readonly type = MailActionTypes.UploadMail;

    constructor(public payload: FormData) { }
}

export class UploadMailSuccess implements Action {
    readonly type = MailActionTypes.UploadMailSuccess;

    constructor(public payload: any) { }
}

export class UploadMailFail implements Action {
    readonly type = MailActionTypes.UploadMailFail;

    constructor(public payload: any) { }
}

export class DeleteMail implements Action {
    readonly type = MailActionTypes.DeleteMail;

    constructor(public payload: Mail) { }
}

export class DeleteMailSuccess implements Action {
    readonly type = MailActionTypes.DeleteMailSuccess;

    constructor(public payload: Mail) { }
}

export class DeleteMailFail implements Action {
    readonly type = MailActionTypes.DeleteMailFail;

    constructor(public payload: any) { }
}

export class LoadMail implements Action {
    readonly type = MailActionTypes.LoadMail;
  
    constructor(public payload: string) {}
  }

  export class LoadMailSuccess implements Action {
    readonly type = MailActionTypes.LoadMailSuccess;

    constructor(public payload: Mail) { }
}

export class LoadMailFail implements Action {
    readonly type = MailActionTypes.LoadMailFail;

    constructor(public payload: any) { }
}

  export class SelectMail implements Action {
    readonly type = MailActionTypes.SelectMail;
  
    constructor(public payload: string) {}
  }

export type MailActionsUnion =
    | AddMail
    | AddMailSuccess
    | AddMailFail
    | UpdateMail
    | UpdateMailSuccess
    | UpdateMailFail
    | DeleteMail
    | DeleteMailSuccess
    | DeleteMailFail
    | LoadMail
    | LoadMailSuccess
    | LoadMailFail   
    | SelectMail;