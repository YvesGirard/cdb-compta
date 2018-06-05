import { Action } from '@ngrx/store';
import { Account } from '../../models/account';

export enum AccountActionTypes {
    AddAccount = '[Account] Add Account',
    AddAccountSuccess = '[Account] Add Account Success',
    AddAccountFail = '[Account] Add Account Fail',
    RemoveAccount = '[Account] Remove Account',
    RemoveAccountSuccess = '[Account] Remove Account Success',
    RemoveAccountFail = '[Account] Remove Account Fail',
    LoadAccounts = '[Account] Load',
    LoadAccountsSuccess = '[Account] Load Success',
    LoadAccountsFail = '[Account] Load Fail',
    UpdateAccount = '[Account] Update Success',
    UpdateAccountSuccess = '[Account] Update Success',
    UpdateAccountFail = '[Account] Update Fail',   
}

/**
 * Add Account to Collection Actions
 */
export class AddAccount implements Action {
    readonly type = AccountActionTypes.AddAccount;

    constructor(public payload: Account) { }
}

export class AddAccountSuccess implements Action {
    readonly type = AccountActionTypes.AddAccountSuccess;

    constructor(public payload: Account) { }
}

export class AddAccountFail implements Action {
    readonly type = AccountActionTypes.AddAccountFail;

    constructor(public payload: Account) { }
}

/**
 * Remove Account from Collection Actions
 */
export class RemoveAccount implements Action {
    readonly type = AccountActionTypes.RemoveAccount;

    constructor(public payload: Account) { }
}

export class RemoveAccountSuccess implements Action {
    readonly type = AccountActionTypes.RemoveAccountSuccess;

    constructor(public payload: Account) { }
}

export class RemoveAccountFail implements Action {
    readonly type = AccountActionTypes.RemoveAccountFail;

    constructor(public payload: Account) { }
}

export class UpdateAccount implements Action {
    readonly type = AccountActionTypes.UpdateAccount;

    constructor(public payload: Account) { }
}

export class UpdateAccountSuccess implements Action {
    readonly type = AccountActionTypes.UpdateAccountSuccess;

    constructor(public payload: Account) { }
}

export class UpdateAccountFail implements Action {
    readonly type = AccountActionTypes.UpdateAccountFail;

    constructor(public payload: Account) { }
}

/**
 * Load Collection Actions
 */
export class LoadAccounts implements Action {
    readonly type = AccountActionTypes.LoadAccounts;
}

export class LoadAccountsSuccess implements Action {
    readonly type = AccountActionTypes.LoadAccountsSuccess;

    constructor(public payload: Account[]) { }
}

export class LoadAccountsFail implements Action {
    readonly type = AccountActionTypes.LoadAccountsFail;

    constructor(public payload: any) { }
}

export type AccountActionsUnion =
    | AddAccount
    | AddAccountSuccess
    | AddAccountFail
    | RemoveAccount
    | RemoveAccountSuccess
    | RemoveAccountFail
    | LoadAccounts
    | LoadAccountsSuccess
    | LoadAccountsFail
    | UpdateAccount
    | UpdateAccountSuccess
    | UpdateAccountFail;