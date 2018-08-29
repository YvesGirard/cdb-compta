import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';

  import * as fromMailingLists from '../reducers/mailinglist.reducer';
  import * as fromRoot from '../../../core/reducers';
  
  export interface MailinglistsState {
    mailinglists: fromMailingLists.State;
  }
  
  export interface State extends fromRoot.State {
    mailinglists: MailinglistsState;
  }
  
  export const reducers: ActionReducerMap<MailinglistsState> = {
    mailinglists: fromMailingLists.reducer,
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
