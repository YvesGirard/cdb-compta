import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

  import * as fromParticipants from './participant.reducer';
  import * as fromCollection from './collection.reducer';
  import * as fromRoot from '../../reducers';
  
  export interface ParticipantsState {
    participants: fromParticipants.State;
    collection: fromCollection.State;
  }
  
  export interface State extends fromRoot.State {
    participants: ParticipantsState;
  }
  
  export const reducers: ActionReducerMap<ParticipantsState> = {
    participants: fromParticipants.reducer,
    collection: fromCollection.reducer,
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
  

  /**
   * Some selector functions create joins across parts of state. This selector
   * composes the search result IDs to return an array of books in the store.
   */
  export const getCollectionState = createSelector(
    getParticipantsState,
    (state: ParticipantsState) => state.collection
  );

  export const getCollectionParticipantIds = createSelector(
    getCollectionState,
    fromCollection.getIds
  );

  export const getParticipantCollection = createSelector(
    getParticipantEntities,
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
/*
  export const getSearchResults = createSelector(
    getBookEntities,
    getSearchBookIds,
    (books, searchIds) => {
      return searchIds.map(id => books[id]);
    }
  );
  
  export const getBookCollection = createSelector(
    getBookEntities,
    getCollectionBookIds,
    (entities, ids) => {
      return ids.map(id => entities[id]);
    }
  );
  
  export const isSelectedBookInCollection = createSelector(
    getCollectionBookIds,
    getSelectedBookId,
    (ids, selected) => {
      return ids.indexOf(selected) > -1;
    }
  );
  */