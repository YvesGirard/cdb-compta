import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

  import * as fromParticipants from '../../core/participant/reducers';
  import * as fromCollection from './collection.reducer';
  import * as fromRoot from '../../core/reducers';
  
  export interface ParticipantsCollectionState {
    collection: fromCollection.State;
  }
  
  export interface State extends fromRoot.State {
    participantscollection: ParticipantsCollectionState;
  }
  
  export const reducers: ActionReducerMap<ParticipantsCollectionState> = {
    collection: fromCollection.reducer,
  };
  

  export const getParticipantsCollectionState = createFeatureSelector<ParticipantsCollectionState>('participantscollection');
  

  /**
   * Some selector functions create joins across parts of state. This selector
   * composes the search result IDs to return an array of books in the store.
   */
  export const getCollectionState = createSelector(
    getParticipantsCollectionState,
    (state: ParticipantsCollectionState) => state.collection
  );

  export const getCollectionParticipantIds = createSelector(
    getCollectionState,
    fromCollection.getIds
  );

  export const getParticipantCollection = createSelector(
    fromParticipants.getParticipantEntities,
    getCollectionParticipantIds,
    (entities, ids) => {
      return ids.map(id => entities[id]);
    }
  );

  export const getCollectionLoaded = createSelector(
    getCollectionState,
    fromCollection.getLoaded
  );
  export const getCollectionLoading = createSelector(
    getCollectionState,
    fromCollection.getLoading
  );

  export const getCollectionTotal = createSelector(
    getCollectionState,
    fromCollection.getTotal
  );
