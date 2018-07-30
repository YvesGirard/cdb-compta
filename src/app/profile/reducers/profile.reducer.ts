import {
  UserActionsUnion,
  UserActionTypes,
} from '../actions/profile.actions';

export interface State {
  error: string | null;
  pending: boolean;
}

export const initialState: State = {
  error: null,
  pending: false,
};

export function reducer(
  state = initialState,
  action: UserActionsUnion
): State {
  switch (action.type) {
    case UserActionTypes.UpdateUserProfile: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case UserActionTypes.UpdateUserProfileSuccess: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case UserActionTypes.UpdateUserProfileFail: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }

    default: {
      return state;
    }
  }
}


