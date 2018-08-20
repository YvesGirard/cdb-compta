import {
  CollectionActionTypes,
  CollectionActionsUnion,
} from '../actions/collection.actions';
import { ParticipantActionsUnion, ParticipantActionTypes } from '../../core/participant/actions/participant.actions';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
  total: number;
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
  total: 0,
};

export function reducer(
  state = initialState,
  action: ParticipantActionsUnion | CollectionActionsUnion
): State {
  switch (action.type) {
    case CollectionActionTypes.Load:
    case ParticipantActionTypes.LoadParticipant: {

      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case CollectionActionTypes.GetTotalSuccess: {

      return {
        ...state,
        total: +action.payload.total,
      };
    }

    case CollectionActionTypes.LoadSuccess:
     {
      return {
        ...state,
        loaded: true,
        loading: false,
        ids: action.payload.map(participant => participant._id),
      };
    }

    case ParticipantActionTypes.LoadParticipantSuccess:
    {
      return {
        ...state,
        loaded: true,
        loading: false,
        ids: [...state.ids, action.payload._id],
      };
    }

    case ParticipantActionTypes.AddParticipantSuccess:
    case ParticipantActionTypes.DeleteParticipantFail: {
      if (state.ids.indexOf(action.payload._id) > -1) {
        return {
          ...state,
        };
      }

      return {
        ...state,
        ids: [...state.ids, action.payload._id],
      };
    }

    case ParticipantActionTypes.DeleteParticipantSuccess:
    case ParticipantActionTypes.LoadParticipantFail:
    case ParticipantActionTypes.AddParticipantFail: {
      return {
        ...state,
        ids: state.ids.filter(id => id !== action.payload._id),
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getTotal = (state: State) => state.total;

export const getIds = (state: State) => state.ids;