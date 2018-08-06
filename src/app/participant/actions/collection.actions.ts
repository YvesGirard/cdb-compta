import { Action } from '@ngrx/store';
import { Participant } from '../../model/participant';

export enum CollectionActionTypes {
    AddParticipant = '[Collection] Add Participant',
    AddParticipantSuccess = '[Collection] Add Participant Success',
    AddParticipantFail = '[Collection] Add Participant Fail',
    RemoveParticipant = '[Collection] Remove Participant',
    RemoveParticipantSuccess = '[Collection] Remove Participant Success',
    RemoveParticipantFail = '[Collection] Remove Participant Fail',
    Load = '[Collection] Load',
    LoadSuccess = '[Collection] Load Success',
    LoadFail = '[Collection] Load Fail',
  }
  
  /**
   * Add Participant to Collection Actions
   */
  export class AddParticipant implements Action {
    readonly type = CollectionActionTypes.AddParticipant;
  
    constructor(public payload: Participant) {}
  }
  
  export class AddParticipantSuccess implements Action {
    readonly type = CollectionActionTypes.AddParticipantSuccess;
  
    constructor(public payload: Participant) {}
  }
  
  export class AddParticipantFail implements Action {
    readonly type = CollectionActionTypes.AddParticipantFail;
  
    constructor(public payload: Participant) {}
  }
  
  /**
   * Remove Participant from Collection Actions
   */
  export class RemoveParticipant implements Action {
    readonly type = CollectionActionTypes.RemoveParticipant;
  
    constructor(public payload: Participant) {}
  }
  
  export class RemoveParticipantSuccess implements Action {
    readonly type = CollectionActionTypes.RemoveParticipantSuccess;
  
    constructor(public payload: Participant) {}
  }
  
  export class RemoveParticipantFail implements Action {
    readonly type = CollectionActionTypes.RemoveParticipantFail;
  
    constructor(public payload: Participant) {}
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
  
  export type CollectionActionsUnion =
    | AddParticipant
    | AddParticipantSuccess
    | AddParticipantFail
    | RemoveParticipant
    | RemoveParticipantSuccess
    | RemoveParticipantFail
    | Load
    | LoadSuccess
    | LoadFail;
