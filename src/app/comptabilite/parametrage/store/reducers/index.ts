import { createSelector, ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromAccounts from './account.reducer';

export interface SetupState {
  accounts: fromAccounts.State;
}

export const reducers: ActionReducerMap<SetupState> = {
    accounts: fromAccounts.reducer,
};

export const getSetupState = createFeatureSelector<SetupState>(
  'setup'
);

export const getAccountEntitiesState = createSelector(
    getSetupState,
    state => state.accounts
  );

  export const {
    selectEntities: selectAccountEntities,
    selectAll: selectAllAccounts,
    selectTotal: selectTotalAccounts,
  } = fromAccounts.adapter.getSelectors(getAccountEntitiesState);
