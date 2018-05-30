import { MailActionTypes, MailActionsUnion } from '../actions/mail.actions';

export interface CountState {
  counter: number,
  loaded: boolean;
  loading: boolean;
}

const initialState: CountState = {
  counter: null,
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: MailActionsUnion): CountState {
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
        ...state,
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

export const getLoaded = (state: CountState) => {
    return state.loaded;
};

export const getLoading =  (state: CountState) => {
    return state.loading;
};

export const getCounter = (state: CountState) => {
    return state.counter;
};
