import { MailActionTypes, MailActionsUnion } from '../actions/mail.actions';

export interface State {
  counter: number,
  loaded: boolean;
  loading: boolean;
}

const initialState: State = {
  counter: null,
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: MailActionsUnion): State {
  switch (action.type) {
    case MailActionTypes.Count: {

      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case MailActionTypes.CountComplete: {
      return {
        counter: action.payload,
        loading: false,
        loaded: true,
      };
    }

    case MailActionTypes.CountError: {
      return {
        ...state,
        counter: 0,
        loading: false,
        loaded: true,
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getCounter = (state: State) => state.counter;
