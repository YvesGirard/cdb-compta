import { createSelector, ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromJournals from './journal.reducer';

export interface SetupState {
  journals: fromJournals.State;
}

export interface State {
    setup: SetupState;
}

export const reducers: ActionReducerMap<SetupState> = {
    journals: fromJournals.reducer,  
};

export const getSetupState = createFeatureSelector<SetupState>(
  'setup'
);

// Journals
export const getJournalEntitiesState = createSelector(
    getSetupState,
    (state: SetupState) => state.journals
  );

  export const {
    selectEntities: selectJournalEntities,
    selectAll: selectAllJournals,
    selectTotal: selectTotalJournals,
  } = fromJournals.adapter.getSelectors(getJournalEntitiesState);


