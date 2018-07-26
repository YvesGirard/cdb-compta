import { Action } from '@ngrx/store';
import { User } from '../../model/user';

export enum UserActionTypes {
    LoadUsers = '[User] Load',
    LoadUsersSuccess = '[User] Load Success',
    LoadUsersFail = '[User] Load Fail',
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

    constructor(public payload: User) { }
}

/**
 * Load Collection Actions
 */
export class LoadUsers implements Action {
    readonly type = UserActionTypes.LoadUsers;
}

export class LoadUsersSuccess implements Action {
    readonly type = UserActionTypes.LoadUsersSuccess;

    constructor(public payload: User[]) { }
}

export class LoadUsersFail implements Action {
    readonly type = UserActionTypes.LoadUsersFail;

    constructor(public payload: any) { }
}

export type UserActionsUnion =
    | LoadUsers
    | LoadUsersSuccess
    | LoadUsersFail
    | UpdateUser
    | UpdateUserSuccess
    | UpdateUserFail;