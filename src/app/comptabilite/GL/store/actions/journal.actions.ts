import { Action } from '@ngrx/store';
import { Journal } from '../../models/journal';

export enum JournalActionTypes {
    AddJournal = '[Journal] Add Journal',
    AddJournalSuccess = '[Journal] Add Journal Success',
    AddJournalFail = '[Journal] Add Journal Fail',
    RemoveJournal = '[Journal] Remove Journal',
    RemoveJournalSuccess = '[Journal] Remove Journal Success',
    RemoveJournalFail = '[Journal] Remove Journal Fail',
    LoadJournals = '[Journal] Load',
    LoadJournalsSuccess = '[Journal] Load Success',
    LoadJournalsFail = '[Journal] Load Fail',
    UpdateJournal = '[Journal] Update Success',
    UpdateJournalSuccess = '[Journal] Update Success',
    UpdateJournalFail = '[Journal] Update Fail',   
}

/**
 * Add Journal to Collection Actions
 */
export class AddJournal implements Action {
    readonly type = JournalActionTypes.AddJournal;

    constructor(public payload: Journal) { }
}

export class AddJournalSuccess implements Action {
    readonly type = JournalActionTypes.AddJournalSuccess;

    constructor(public payload: Journal) { }
}

export class AddJournalFail implements Action {
    readonly type = JournalActionTypes.AddJournalFail;

    constructor(public payload: Journal) { }
}

/**
 * Remove Journal from Collection Actions
 */
export class RemoveJournal implements Action {
    readonly type = JournalActionTypes.RemoveJournal;

    constructor(public payload: Journal) { }
}

export class RemoveJournalSuccess implements Action {
    readonly type = JournalActionTypes.RemoveJournalSuccess;

    constructor(public payload: Journal) { }
}

export class RemoveJournalFail implements Action {
    readonly type = JournalActionTypes.RemoveJournalFail;

    constructor(public payload: Journal) { }
}

export class UpdateJournal implements Action {
    readonly type = JournalActionTypes.UpdateJournal;

    constructor(public payload: Journal) { }
}

export class UpdateJournalSuccess implements Action {
    readonly type = JournalActionTypes.UpdateJournalSuccess;

    constructor(public payload: Journal) { }
}

export class UpdateJournalFail implements Action {
    readonly type = JournalActionTypes.UpdateJournalFail;

    constructor(public payload: Journal) { }
}

/**
 * Load Collection Actions
 */
export class LoadJournals implements Action {
    readonly type = JournalActionTypes.LoadJournals;
}

export class LoadJournalsSuccess implements Action {
    readonly type = JournalActionTypes.LoadJournalsSuccess;

    constructor(public payload: Journal[]) { }
}

export class LoadJournalsFail implements Action {
    readonly type = JournalActionTypes.LoadJournalsFail;

    constructor(public payload: any) { }
}

export type JournalActionsUnion =
    | AddJournal
    | AddJournalSuccess
    | AddJournalFail
    | RemoveJournal
    | RemoveJournalSuccess
    | RemoveJournalFail
    | LoadJournals
    | LoadJournalsSuccess
    | LoadJournalsFail
    | UpdateJournal
    | UpdateJournalSuccess
    | UpdateJournalFail;