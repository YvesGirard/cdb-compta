import { Action } from '@ngrx/store';
import { JournalLine } from '../../models/journal-line';

export enum JournalLineActionTypes {
    AddJournalLine = '[JournalLine] Add JournalLine',
    AddJournalLineSuccess = '[JournalLine] Add JournalLine Success',
    AddJournalLineFail = '[JournalLine] Add JournalLine Fail',
    RemoveJournalLine = '[JournalLine] Remove JournalLine',
    RemoveJournalLineSuccess = '[JournalLine] Remove JournalLine Success',
    RemoveJournalLineFail = '[JournalLine] Remove JournalLine Fail',
    LoadJournalLines = '[JournalLine] Load',
    LoadJournalLinesSuccess = '[JournalLine] Load Success',
    LoadJournalLinesFail = '[JournalLine] Load Fail',
    UpdateJournalLine = '[JournalLine] Update Success',
    UpdateJournalLineSuccess = '[JournalLine] Update Success',
    UpdateJournalLineFail = '[JournalLine] Update Fail',   
}

/**
 * Add JournalLine to Collection Actions
 */
export class AddJournalLine implements Action {
    readonly type = JournalLineActionTypes.AddJournalLine;

    constructor(public payload: JournalLine) { }
}

export class AddJournalLineSuccess implements Action {
    readonly type = JournalLineActionTypes.AddJournalLineSuccess;

    constructor(public payload: JournalLine) { }
}

export class AddJournalLineFail implements Action {
    readonly type = JournalLineActionTypes.AddJournalLineFail;

    constructor(public payload: JournalLine) { }
}

/**
 * Remove JournalLine from Collection Actions
 */
export class RemoveJournalLine implements Action {
    readonly type = JournalLineActionTypes.RemoveJournalLine;

    constructor(public payload: JournalLine) { }
}

export class RemoveJournalLineSuccess implements Action {
    readonly type = JournalLineActionTypes.RemoveJournalLineSuccess;

    constructor(public payload: JournalLine) { }
}

export class RemoveJournalLineFail implements Action {
    readonly type = JournalLineActionTypes.RemoveJournalLineFail;

    constructor(public payload: JournalLine) { }
}

export class UpdateJournalLine implements Action {
    readonly type = JournalLineActionTypes.UpdateJournalLine;

    constructor(public payload: JournalLine) { }
}

export class UpdateJournalLineSuccess implements Action {
    readonly type = JournalLineActionTypes.UpdateJournalLineSuccess;

    constructor(public payload: JournalLine) { }
}

export class UpdateJournalLineFail implements Action {
    readonly type = JournalLineActionTypes.UpdateJournalLineFail;

    constructor(public payload: JournalLine) { }
}

/**
 * Load Collection Actions
 */
export class LoadJournalLines implements Action {
    readonly type = JournalLineActionTypes.LoadJournalLines;
}

export class LoadJournalLinesSuccess implements Action {
    readonly type = JournalLineActionTypes.LoadJournalLinesSuccess;

    constructor(public payload: JournalLine[]) { }
}

export class LoadJournalLinesFail implements Action {
    readonly type = JournalLineActionTypes.LoadJournalLinesFail;

    constructor(public payload: any) { }
}

export type JournalLineActionsUnion =
    | AddJournalLine
    | AddJournalLineSuccess
    | AddJournalLineFail
    | RemoveJournalLine
    | RemoveJournalLineSuccess
    | RemoveJournalLineFail
    | LoadJournalLines
    | LoadJournalLinesSuccess
    | LoadJournalLinesFail
    | UpdateJournalLine
    | UpdateJournalLineSuccess
    | UpdateJournalLineFail;