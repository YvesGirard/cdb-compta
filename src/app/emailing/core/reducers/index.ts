import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';


import * as fromMails from './mail.reducer';
import * as fromMailsCollection from './mail.collection.reducer';
import * as fromMailingLists from './mailinglist.reducer';
import * as fromMailingListsMembers from './member.reducer';
import * as fromRoot from '../../../core/reducers';

export interface MailinglistsState {
  mailinglists: fromMailingLists.State;
  members: fromMailingListsMembers.State;
  mailsCollection: fromMailsCollection.State;
  mails: fromMails.State;
}

export interface State extends fromRoot.State {
  mailinglists: MailinglistsState;
  members: MailinglistsState;
  mailsCollection: MailinglistsState;
  mails: MailinglistsState;
}


export const reducers: ActionReducerMap<MailinglistsState> = {
  mailinglists: fromMailingLists.reducer,
  members: fromMailingListsMembers.reducer,
  mailsCollection: fromMailsCollection.reducer,
  mails: fromMails.reducer,
};


export const getMailinglistsState = createFeatureSelector<MailinglistsState>('mailinglists');

// MAILING LIST
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

// Members selectors
export const getMailEntitiesState = createSelector(
  getMailinglistsState,
  state => state.mails
);

export const getSelectedMailId = createSelector(
  getMailEntitiesState,
  fromMails.getSelectedId
);

export const {
  selectIds: getMailsIds,
  selectEntities: getMailsEntities,
  selectAll: getAllMails,
  selectTotal: getTotalMails,
} = fromMails.adapter.getSelectors(getMailEntitiesState);

export const getSelectedMail = createSelector(
  getMailsEntities,
  getSelectedMailId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

// MAILS COLLECTION
export const getMailCollectionState = createSelector(
  getMailinglistsState,
  state => state.mailsCollection
);

export const getMailCollectionMailIds = createSelector(
  getMailCollectionState,
  fromMailsCollection.getIds
);

export const getMailCollection = createSelector(
  getMailsEntities,
  getMailCollectionMailIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const getMailCollectionLoaded = createSelector(
  getMailCollectionState,
  fromMailsCollection.getLoaded
);
export const getMailCollectionQuery = createSelector(
  getMailCollectionState,
  fromMailsCollection.getQuery
);
export const getMailCollectionLoading = createSelector(
  getMailCollectionState,
  fromMailsCollection.getLoading
);

export const getMailCollectionTotal = createSelector(
  getMailCollectionState,
  fromMailsCollection.getTotal
);

