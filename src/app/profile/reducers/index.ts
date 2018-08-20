import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromRoot from '../../core/reducers';
import * as fromProfile from './profile.reducer';

export interface ProfileState {
  status: fromProfile.State;
}

export interface State extends fromRoot.State {
  profile: ProfileState;
}

export const reducers: ActionReducerMap<ProfileState> = {
  status: fromProfile.reducer,
};

export const selectProfileState = createFeatureSelector<ProfileState>('profile');

export const selectProfileStatusState = createSelector(
  selectProfileState,
  (state: ProfileState) => state.status
);
