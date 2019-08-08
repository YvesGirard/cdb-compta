import { Action } from '@ngrx/store';
import { Competition } from '../../models/competition';

export enum CompetitionActionTypes {
    AddCompetition = '[Competition] Add Competition',
    AddCompetitionSuccess = '[Competition] Add Competition Success',
    AddCompetitionFail = '[Competition] Add Competition Fail',
    RemoveCompetition = '[Competition] Remove Competition',
    RemoveCompetitionSuccess = '[Competition] Remove Competition Success',
    RemoveCompetitionFail = '[Competition] Remove Competition Fail',
    LoadCompetitions = '[Competition] Load',
    LoadCompetitionsSuccess = '[Competition] Load Success',
    LoadCompetitionsFail = '[Competition] Load Fail',
    UpdateCompetition = '[Competition] Update Success',
    UpdateCompetitionSuccess = '[Competition] Update Success',
    UpdateCompetitionFail = '[Competition] Update Fail',   
}

/**
 * Add Competition to Collection Actions
 */
export class AddCompetition implements Action {
    readonly type = CompetitionActionTypes.AddCompetition;

    constructor(public payload: Competition) { }
}

export class AddCompetitionSuccess implements Action {
    readonly type = CompetitionActionTypes.AddCompetitionSuccess;

    constructor(public payload: Competition) { }
}

export class AddCompetitionFail implements Action {
    readonly type = CompetitionActionTypes.AddCompetitionFail;

    constructor(public payload: Competition) { }
}

/**
 * Remove Competition from Collection Actions
 */
export class RemoveCompetition implements Action {
    readonly type = CompetitionActionTypes.RemoveCompetition;

    constructor(public payload: Competition) { }
}

export class RemoveCompetitionSuccess implements Action {
    readonly type = CompetitionActionTypes.RemoveCompetitionSuccess;

    constructor(public payload: Competition) { }
}

export class RemoveCompetitionFail implements Action {
    readonly type = CompetitionActionTypes.RemoveCompetitionFail;

    constructor(public payload: Competition) { }
}

export class UpdateCompetition implements Action {
    readonly type = CompetitionActionTypes.UpdateCompetition;

    constructor(public payload: Competition) { }
}

export class UpdateCompetitionSuccess implements Action {
    readonly type = CompetitionActionTypes.UpdateCompetitionSuccess;

    constructor(public payload: Competition) { }
}

export class UpdateCompetitionFail implements Action {
    readonly type = CompetitionActionTypes.UpdateCompetitionFail;

    constructor(public payload: Competition) { }
}

/**
 * Load Collection Actions
 */
export class LoadCompetitions implements Action {
    readonly type = CompetitionActionTypes.LoadCompetitions;
}

export class LoadCompetitionsSuccess implements Action {
    readonly type = CompetitionActionTypes.LoadCompetitionsSuccess;

    constructor(public payload: Competition[]) { }
}

export class LoadCompetitionsFail implements Action {
    readonly type = CompetitionActionTypes.LoadCompetitionsFail;

    constructor(public payload: any) { }
}

export type CompetitionActionsUnion =
    | AddCompetition
    | AddCompetitionSuccess
    | AddCompetitionFail
    | RemoveCompetition
    | RemoveCompetitionSuccess
    | RemoveCompetitionFail
    | LoadCompetitions
    | LoadCompetitionsSuccess
    | LoadCompetitionsFail
    | UpdateCompetition
    | UpdateCompetitionSuccess
    | UpdateCompetitionFail;