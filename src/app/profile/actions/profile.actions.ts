import { Action } from '@ngrx/store';
import { User } from '../../model/user';

export enum UserActionTypes {
    UpdateUser = '[User] Update Success',
    UpdateUserSuccess = '[User] Update Success',
    UpdateUserFail = '[User] Update Fail',   
}


export class UpdateUser implements Action {
    readonly type = UserActionTypes.UpdateUser;

    constructor(public payload: User) { }
}

export class UpdateUserSuccess implements Action {
    readonly type = UserActionTypes.UpdateUserSuccess;

    constructor(public payload: User) { }
}

export class UpdateUserFail implements Action {
    readonly type = UserActionTypes.UpdateUserFail;

    constructor(public payload: any) { }
}

export type UserActionsUnion =
    | UpdateUser
    | UpdateUserSuccess
    | UpdateUserFail;