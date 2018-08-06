import {
    CollectionActionTypes,
    CollectionActionsUnion,
  } from '../actions/collection.actions';
  
  export interface State {
    loaded: boolean;
    loading: boolean;
    ids: string[];
  }
  
  const initialState: State = {
    loaded: false,
    loading: false,
    ids: [],
  };
  
  export function reducer(
    state = initialState,
    action: CollectionActionsUnion
  ): State {
    switch (action.type) {
      case CollectionActionTypes.Load: {

        return {
          ...state,
          loading: true,
        };
      }
  
      case CollectionActionTypes.LoadSuccess: {
        return {
          loaded: true,
          loading: false,
          ids: action.payload.map(participant => participant._id),
        };
      }
  
      case CollectionActionTypes.AddParticipantSuccess:
      case CollectionActionTypes.RemoveParticipantFail: {
        if (state.ids.indexOf(action.payload._id) > -1) {
          return state;
        }
  
        return {
          ...state,
          ids: [...state.ids, action.payload._id],
        };
      }
  
      case CollectionActionTypes.RemoveParticipantSuccess:
      case CollectionActionTypes.AddParticipantFail: {
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
  
  export const getIds = (state: State) => state.ids;