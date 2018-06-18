import { Action } from '@ngrx/store';
import { Exercice } from '../../models/exercice';

export enum ExerciceActionTypes {
    AddExercice = '[Exercice] Add Exercice',
    AddExerciceSuccess = '[Exercice] Add Exercice Success',
    AddExerciceFail = '[Exercice] Add Exercice Fail',
    RemoveExercice = '[Exercice] Remove Exercice',
    RemoveExerciceSuccess = '[Exercice] Remove Exercice Success',
    RemoveExerciceFail = '[Exercice] Remove Exercice Fail',
    LoadExercices = '[Exercice] Load',
    LoadExercicesSuccess = '[Exercice] Load Success',
    LoadExercicesFail = '[Exercice] Load Fail',
    UpdateExercice = '[Exercice] Update Success',
    UpdateExerciceSuccess = '[Exercice] Update Success',
    UpdateExerciceFail = '[Exercice] Update Fail',   
}

/**
 * Add Exercice to Collection Actions
 */
export class AddExercice implements Action {
    readonly type = ExerciceActionTypes.AddExercice;

    constructor(public payload: Exercice) { }
}

export class AddExerciceSuccess implements Action {
    readonly type = ExerciceActionTypes.AddExerciceSuccess;

    constructor(public payload: Exercice) { }
}

export class AddExerciceFail implements Action {
    readonly type = ExerciceActionTypes.AddExerciceFail;

    constructor(public payload: Exercice) { }
}

/**
 * Remove Exercice from Collection Actions
 */
export class RemoveExercice implements Action {
    readonly type = ExerciceActionTypes.RemoveExercice;

    constructor(public payload: Exercice) { }
}

export class RemoveExerciceSuccess implements Action {
    readonly type = ExerciceActionTypes.RemoveExerciceSuccess;

    constructor(public payload: Exercice) { }
}

export class RemoveExerciceFail implements Action {
    readonly type = ExerciceActionTypes.RemoveExerciceFail;

    constructor(public payload: Exercice) { }
}

export class UpdateExercice implements Action {
    readonly type = ExerciceActionTypes.UpdateExercice;

    constructor(public payload: Exercice) { }
}

export class UpdateExerciceSuccess implements Action {
    readonly type = ExerciceActionTypes.UpdateExerciceSuccess;

    constructor(public payload: Exercice) { }
}

export class UpdateExerciceFail implements Action {
    readonly type = ExerciceActionTypes.UpdateExerciceFail;

    constructor(public payload: Exercice) { }
}

/**
 * Load Collection Actions
 */
export class LoadExercices implements Action {
    readonly type = ExerciceActionTypes.LoadExercices;
}

export class LoadExercicesSuccess implements Action {
    readonly type = ExerciceActionTypes.LoadExercicesSuccess;

    constructor(public payload: Exercice[]) { }
}

export class LoadExercicesFail implements Action {
    readonly type = ExerciceActionTypes.LoadExercicesFail;

    constructor(public payload: any) { }
}

export type ExerciceActionsUnion =
    | AddExercice
    | AddExerciceSuccess
    | AddExerciceFail
    | RemoveExercice
    | RemoveExerciceSuccess
    | RemoveExerciceFail
    | LoadExercices
    | LoadExercicesSuccess
    | LoadExercicesFail
    | UpdateExercice
    | UpdateExerciceSuccess
    | UpdateExerciceFail;