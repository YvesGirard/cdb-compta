import {
  MemberCollectionActionTypes,
  MemberCollectionActionsUnion,
} from '../actions/collection.actions';
import { MemberActionsUnion, MemberActionTypes } from '../actions/member.actions';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
  total: number;
  query: {
    filter:string,
    sortOrder:string,
    sortField:string,
    pageIndex:number,
    pageSize:number,
    searchField:string,
  };
  selected: string[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
  total: 0,
  query: { filter: '', 
          sortOrder: 'asc', 
          sortField: 'name',
          pageIndex: 0, 
          pageSize: 10,
          searchField: 'name'},
  selected: [],
};

export function reducer(
  state = initialState,
  action: MemberActionsUnion | MemberCollectionActionsUnion
): State {
  switch (action.type) {
    case MemberCollectionActionTypes.Load: {

      return {
        ...state,
        //query: action.payload
      };
    }

    case MemberCollectionActionTypes.Search:
    case MemberCollectionActionTypes.Page: {

      return {
        ...state, 
        query: {...state.query, ...action.payload}
      };
    }

    case MemberCollectionActionTypes.Select: {

      return {
        ...state, 
        selected: [...state.selected, action.payload],
      };
    }

    case MemberCollectionActionTypes.SelectAll: {

      return {
        ...state, 
        selected: [...state.selected, ...state.ids],
      };
    }

    case MemberCollectionActionTypes.SelectAllSuccess: {

      return {
        ...state, 
        selected: [...state.selected, ...action.payload],
      };
    }

    case MemberActionTypes.LoadMember: {

      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case MemberCollectionActionTypes.GetTotalSuccess: {

      return {
        ...state,
        total: +action.payload.total,
      };
    }

    case MemberCollectionActionTypes.LoadSuccess:
      {
        return {
          ...state,
          loaded: true,
          loading: false,
          ids: action.payload.map(participant => participant._id),
        };
      }

    case MemberActionTypes.LoadMemberSuccess:
      {
        return {
          ...state,
          loaded: true,
          loading: false,
          ids: [...state.ids, action.payload._id],
        };
      }

    case MemberActionTypes.AddMemberSuccess:
    case MemberActionTypes.DeleteMemberFail: {
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

    case MemberActionTypes.DeleteMemberSuccess:
    case MemberActionTypes.LoadMemberFail:
    case MemberActionTypes.AddMemberFail: {
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

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

export const getTotal = (state: State) => state.total;

export const getIds = (state: State) => state.ids;