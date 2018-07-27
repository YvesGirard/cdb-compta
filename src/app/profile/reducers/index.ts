import { createSelector, ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromAccounts from './profile.reducer';
import * as fromExercices from './exercice.reducer';

export interface SetupState {
  accounts: fromAccounts.State;
  exercices:  fromExercices.State;
}

export interface State {
    setup: SetupState;
}

export const reducers: ActionReducerMap<SetupState> = {
    accounts: fromAccounts.reducer,
    exercices:  fromExercices.reducer,   
};

export const getSetupState = createFeatureSelector<SetupState>(
  'setup'
);

// Accounts
export const getAccountEntitiesState = createSelector(
    getSetupState,
    (state: SetupState) => state.accounts
  );

  export const {
    selectEntities: selectAccountEntities,
    selectAll: selectAllAccounts,
    selectTotal: selectTotalAccounts,
  } = fromAccounts.adapter.getSelectors(getAccountEntitiesState);

// Exercices
export const getExerciceEntitiesState = createSelector(
  getSetupState,
  (state: SetupState) => state.exercices
);

export const {
  selectEntities: selectExerciceEntities,
  selectAll: selectAllExercices,
  selectTotal: selectTotalExercices,
} = fromExercices.adapter.getSelectors(getExerciceEntitiesState);

