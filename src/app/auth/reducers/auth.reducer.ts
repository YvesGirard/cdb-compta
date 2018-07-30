import { AuthActionsUnion, AuthActionTypes } from '../actions/auth.actions';
import { User } from '../../model/user';
import { Auth } from '../models/auth';

import {
  UserActionsUnion,
  UserActionTypes,
} from '../../profile/actions/profile.actions';

export interface State {
  loggedIn: boolean;
  user: User | null;
  auth: Auth | null; 
}

export const initialState: State = {
  loggedIn: false,
  user: null,
  auth: null
};

export function reducer(state = initialState, action: AuthActionsUnion | UserActionsUnion): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true,
        user: action.payload.authResult.user,
        auth: action.payload.authResult.auth,
      };
    }

    case UserActionTypes.UpdateUserProfileSuccess: {
      console.log("AuthActionsUnion : ")
      console.log(action.payload)
      return {
        ...state,
        user: action.payload,
      };
    }

    case AuthActionTypes.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
export const getAuth = (state: State) => state.auth;
