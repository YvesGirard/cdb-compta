import { Action } from '@ngrx/store';
import { Mail } from '../models/mail';

export enum MailActionTypes {
    Count = '[Mail] Count',
    CountComplete = '[Mail] Count Complete',
    CountError = '[Mail] Count Error',
    AddMail = '[Mail] Add Mail',
    AddMailSuccess = '[Mail] Add Mail Success',
    AddMailFail = '[Mail] Add Mail Fail',
    RemoveMail = '[Mail] Remove Mail',
    RemoveMailSuccess = '[Mail] Remove Mail Success',
    RemoveMailFail = '[Mail] Remove Mail Fail',
    Load = '[Mail] Load',
    LoadSuccess = '[Mail] Load Success',
    LoadFail = '[Mail] Load Fail',
}

/**
 * Add Mail to Collection Actions
 */
export class Count implements Action {
    readonly type = MailActionTypes.Count;

    constructor(public payload: any =null) { }
}
export class CountComplete implements Action {
    readonly type = MailActionTypes.CountComplete;

    constructor(public payload: number) { }
}

export class CountError implements Action {
    readonly type = MailActionTypes.CountError;

    constructor(public payload: string) { }
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

    constructor(public payload: Mail) { }
}

/**
 * Remove Mail from Collection Actions
 */
export class RemoveMail implements Action {
    readonly type = MailActionTypes.RemoveMail;

    constructor(public payload: Mail) { }
}

export class RemoveMailSuccess implements Action {
    readonly type = MailActionTypes.RemoveMailSuccess;

    constructor(public payload: Mail) { }
}

export class RemoveMailFail implements Action {
    readonly type = MailActionTypes.RemoveMailFail;

    constructor(public payload: Mail) { }
}

/**
 * Load Collection Actions
 */
export class Load implements Action {
    readonly type = MailActionTypes.Load;

    constructor(public payload: any) { }
}

export class LoadSuccess implements Action {
    readonly type = MailActionTypes.LoadSuccess;

    constructor(public payload: Mail[]) { }
}

export class LoadFail implements Action {
    readonly type = MailActionTypes.LoadFail;

    constructor(public payload: any) { }
}

export type MailActionsUnion =
    | Count
    | CountComplete
    | CountError
    | AddMail
    | AddMailSuccess
    | AddMailFail
    | RemoveMail
    | RemoveMailSuccess
    | RemoveMailFail
    | Load
    | LoadSuccess
    | LoadFail;