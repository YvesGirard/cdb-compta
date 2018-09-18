import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

  import * as fromMembers from './member.reducer';
  import * as fromCollection from './collection.reducer';
  import * as fromRoot from '../../core/reducers';
  
  export interface MembersState {
    members: fromMembers.State;
    collection: fromCollection.State;
  }
  
  export interface State extends fromRoot.State {
    members: MembersState;
  }
  
  export const reducers: ActionReducerMap<MembersState> = {
    members: fromMembers.reducer,
    collection: fromCollection.reducer,
  };
  

  export const getMembersState = createFeatureSelector<MembersState>('members');
  
  // Members selectors
  export const getMemberEntitiesState = createSelector(
    getMembersState,
    state => state.members
  );
  
  export const getSelectedMemberId = createSelector(
    getMemberEntitiesState,
    fromMembers.getSelectedId
  );
  

  export const {
    selectIds: getMemberIds,
    selectEntities: getMemberEntities,
    selectAll: getAllMembers,
    selectTotal: getTotalMembers,
  } = fromMembers.adapter.getSelectors(getMemberEntitiesState);
  
  export const getSelectedMember = createSelector(
    getMemberEntities,
    getSelectedMemberId,
    (entities, selectedId) => {
      return selectedId && entities[selectedId];
    }
  );
  
  /**
   * Some selector functions create joins across parts of state. This selector
   * composes the search result IDs to return an array of books in the store.
   */
  export const getCollectionState = createSelector(
    getMembersState,
    (state: MembersState) => state.collection
  );

  export const getCollectionMemberIds = createSelector(
    getCollectionState,
    fromCollection.getIds
  );

  export const getMemberCollection = createSelector(
    getMemberEntities,
    getCollectionMemberIds,
    (entities, ids) => {
      return ids.map(id => entities[id]);
    }
  );

  export const getCollectionLoaded = createSelector(
    getCollectionState,
    fromCollection.getLoaded
  );
  export const getCollectionQuery = createSelector(
    getCollectionState,
    fromCollection.getQuery
  );  
  export const getCollectionLoading = createSelector(
    getCollectionState,
    fromCollection.getLoading
  );

  export const getCollectionTotal = createSelector(
    getCollectionState,
    fromCollection.getTotal
  );
