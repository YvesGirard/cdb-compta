import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

  import * as fromMailingLists from './mailinglist.reducer';
  import * as fromMailingListsMembers from './member.reducer';
  import * as fromRoot from '../../../core/reducers';
  
  export interface MailinglistsState {
    mailinglists: fromMailingLists.State;
    members: fromMailingListsMembers.State;   
  }
  
  export interface State extends fromRoot.State {
    mailinglists: MailinglistsState;
    members: MailinglistsState;   
  }
  
  export const reducers: ActionReducerMap<MailinglistsState> = {
    mailinglists: fromMailingLists.reducer,
    members: fromMailingListsMembers.reducer,
  };
  

  export const getMailinglistsState = createFeatureSelector<MailinglistsState>('mailinglists');
  

  export const getMailingListEntitiesState = createSelector(
    getMailinglistsState,
    state => state.mailinglists
  );
  
  export const getSelectedMailingListId = createSelector(
    getMailingListEntitiesState,
    fromMailingLists.getSelectedId
  );
  

  export const {
    selectIds: getMailingListIds,
    selectEntities: getMailingListEntities,
    selectAll: getAllMailingLists,
    selectTotal: getTotalMailingLists,
  } = fromMailingLists.adapter.getSelectors(getMailingListEntitiesState);
  
  export const getSelectedMailingList = createSelector(
    getMailingListEntities,
    getSelectedMailingListId,
    (entities, selectedId) => {
      return selectedId && entities[selectedId];
    }
  );
  
  export const getMailinglistLoaded = createSelector(getMailingListEntitiesState, fromMailingLists.getLoaded);

  export const getMailinglistLoading = createSelector(getMailingListEntitiesState, fromMailingLists.getLoading);


// Membres de la liste

  export const getMailingListMemberEntitiesState = createSelector(
    getMailinglistsState,
    state => state.members
  );
  
  export const getSelectedMailingListMemberId = createSelector(
    getMailingListMemberEntitiesState,
    fromMailingListsMembers.getSelectedId
  );
  

  export const {
    selectIds: getMailingListMemberIds,
    selectEntities: getMailingListMemberEntities,
    selectAll: getAllMailingListsMembers,
    selectTotal: getTotalMailingListsMembers,
  } = fromMailingListsMembers.adapter.getSelectors(getMailingListMemberEntitiesState);
  
  export const getSelectedMailingListMember = createSelector(
    getMailingListMemberEntities,
    getSelectedMailingListMemberId,
    (entities, selectedId) => {
      return selectedId && entities[selectedId];
    }
  );
  
  export const getMailinglistMemberLoaded = createSelector(getMailingListMemberEntitiesState, fromMailingListsMembers.getLoaded);

  export const getMailinglistMemberLoading = createSelector(getMailingListMemberEntitiesState, fromMailingListsMembers.getLoading);
