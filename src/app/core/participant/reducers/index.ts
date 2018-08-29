import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

  import * as fromParticipants from './participant.reducer';
  import * as fromRoot from '../../reducers';
  
  export interface ParticipantsState {
    participants: fromParticipants.State;
  }
  
  export interface State extends fromRoot.State {
    participants: ParticipantsState;
  }
  
  export const reducers: ActionReducerMap<ParticipantsState> = {
    participants: fromParticipants.reducer,
  };
  

  export const getParticipantsState = createFeatureSelector<ParticipantsState>('participants');
  

  export const getParticipantEntitiesState = createSelector(
    getParticipantsState,
    state => state.participants
  );
  
  export const getSelectedParticipantId = createSelector(
    getParticipantEntitiesState,
    fromParticipants.getSelectedId
  );
  

  export const {
    selectIds: getParticipantIds,
    selectEntities: getParticipantEntities,
    selectAll: getAllParticipants,
    selectTotal: getTotalParticipants,
  } = fromParticipants.adapter.getSelectors(getParticipantEntitiesState);
  
  export const getSelectedParticipant = createSelector(
    getParticipantEntities,
    getSelectedParticipantId,
    (entities, selectedId) => {
      return selectedId && entities[selectedId];
    }
  );
  
