import { createSelector, ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromCompetitions from './competition.reducer';

export interface SetupState {
  competitions: fromCompetitions.State;
}

export interface State {
    setup: SetupState;
}

export const reducers: ActionReducerMap<SetupState> = {
    competitions: fromCompetitions.reducer,
};

export const getSetupState = createFeatureSelector<SetupState>(
  'setup'
);

// Competitions
export const getCompetitionEntitiesState = createSelector(
    getSetupState,
    (state: SetupState) => state.competitions
  );

  export const {
    selectEntities: selectCompetitionEntities,
    selectAll: selectAllCompetitions,
    selectTotal: selectTotalCompetitions,
  } = fromCompetitions.adapter.getSelectors(getCompetitionEntitiesState);

