import { Action } from '@ngrx/store';
import { User } from '../../model/user';

export enum UserActionTypes {
    UpdateUserProfile = '[User] Update',
    UpdateUserProfileSuccess = '[User] Update Success',
    UpdateUserProfileFail = '[User] Update Fail',  
    UpdateParticipantProfile = '[User] Update',
    UpdateParticipantProfileSuccess = '[User] Update Success',
    UpdateParticipantProfileFail = '[User] Update Fail',  
}


export class UpdateUserProfile implements Action {
    readonly type = UserActionTypes.UpdateUserProfile;

    constructor(public payload: User) { }
}

export class UpdateUserProfileSuccess implements Action {
    readonly type = UserActionTypes.UpdateUserProfileSuccess;

    constructor(public payload: User) { }
}

export class UpdateUserProfileFail implements Action {
    readonly type = UserActionTypes.UpdateUserProfileFail;

    constructor(public payload: any) { }
}

export type UserActionsUnion =
    | UpdateUserProfile
    | UpdateUserProfileSuccess
    | UpdateUserProfileFail;