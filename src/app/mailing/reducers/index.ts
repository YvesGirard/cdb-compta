
import {
    createFeatureSelector,
    createSelector,
    ActionReducerMap,
  } from '@ngrx/store';
import * as fromCount from './count.reducer';
  
export interface MailsState {
    count: fromCount.State,
  }
  
  export interface State {
    mails: MailsState;
  }

  
export const reducers: ActionReducerMap<MailsState> = {
    count: fromCount.reducer,
  };

  export const getMailsState = createFeatureSelector<MailsState>('mails');

  export const getCountState = createSelector(
    getMailsState,
    (state: MailsState) => state.count
  );

  export const getCounterLoaded = createSelector(
    getCountState,
    fromCount.getLoaded
  );

  export const getCounter = createSelector(
    getCountState,
    fromCount.getCounter
  );
