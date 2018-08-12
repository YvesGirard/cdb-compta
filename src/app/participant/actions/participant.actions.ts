import { Action } from '@ngrx/store';
import { Participant } from '../../model/participant';

export enum ParticipantActionTypes {
    AddParticipant = '[Participant] Add',
    AddParticipantSuccess = '[Participant] Add Success',
    AddParticipantFail = '[Participant] Add Fail',      
    UpdateParticipant = '[Participant] Update',
    UpdateParticipantSuccess = '[Participant] Update Success',
    UpdateParticipantFail = '[Participant] Update Fail',   
    DeleteParticipant = '[Participant] Delete',
    DeleteParticipantSuccess = '[Participant] Delete Success',
    DeleteParticipantFail = '[Participant] Delete Fail',    
    LoadParticipant = '[Participant] Load',
    LoadParticipantSuccess = '[Participant] Load Success',
    LoadParticipantFail = '[Participant] Load Fail',
    SelectParticipant = '[Participant] Select',      
}

export class AddParticipant implements Action {
    readonly type = ParticipantActionTypes.AddParticipant;

    constructor(public payload: Participant) { }
}

export class AddParticipantSuccess implements Action {
    readonly type = ParticipantActionTypes.AddParticipantSuccess;

    constructor(public payload: Participant) { }
}

export class AddParticipantFail implements Action {
    readonly type = ParticipantActionTypes.AddParticipantFail;

    constructor(public payload: any) { }
}

export class UpdateParticipant implements Action {
    readonly type = ParticipantActionTypes.UpdateParticipant;

    constructor(public payload: Participant) { }
}

export class UpdateParticipantSuccess implements Action {
    readonly type = ParticipantActionTypes.UpdateParticipantSuccess;

    constructor(public payload: Participant) { }
}

export class UpdateParticipantFail implements Action {
    readonly type = ParticipantActionTypes.UpdateParticipantFail;

    constructor(public payload: any) { }
}

export class DeleteParticipant implements Action {
    readonly type = ParticipantActionTypes.DeleteParticipant;

    constructor(public payload: Participant) { }
}

export class DeleteParticipantSuccess implements Action {
    readonly type = ParticipantActionTypes.DeleteParticipantSuccess;

    constructor(public payload: Participant) { }
}

export class DeleteParticipantFail implements Action {
    readonly type = ParticipantActionTypes.DeleteParticipantFail;

    constructor(public payload: any) { }
}

export class LoadParticipant implements Action {
    readonly type = ParticipantActionTypes.LoadParticipant;
  
    constructor(public payload: string) {}
  }

  export class LoadParticipantSuccess implements Action {
    readonly type = ParticipantActionTypes.LoadParticipantSuccess;

    constructor(public payload: Participant) { }
}

export class LoadParticipantFail implements Action {
    readonly type = ParticipantActionTypes.LoadParticipantFail;

    constructor(public payload: any) { }
}

  export class SelectParticipant implements Action {
    readonly type = ParticipantActionTypes.SelectParticipant;
  
    constructor(public payload: string) {}
  }

export type ParticipantActionsUnion =
    | AddParticipant
    | AddParticipantSuccess
    | AddParticipantFail
    | UpdateParticipant
    | UpdateParticipantSuccess
    | UpdateParticipantFail
    | DeleteParticipant
    | DeleteParticipantSuccess
    | DeleteParticipantFail
    | LoadParticipant
    | LoadParticipantSuccess
    | LoadParticipantFail   
    | SelectParticipant;