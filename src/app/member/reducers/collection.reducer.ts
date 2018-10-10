import {
  MemberCollectionActionTypes,
  MemberCollectionActionsUnion,
} from '../actions/collection.actions';
import { MemberActionsUnion, MemberActionTypes } from '../actions/member.actions';
import * as _ from 'lodash';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
  total: string[];
  query: {
    filter: string,
    sortOrder: string,
    sortField: string,
    pageIndex: number,
    pageSize: number,
    searchField: string,
  };
  selected: string[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
  total: [],
  query: {
    filter: '',
    sortOrder: 'asc',
    sortField: 'name',
    pageIndex: 0,
    pageSize: 10,
    searchField: 'name'
  },
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

    case MemberCollectionActionTypes.Search:{

      return {
        ...state,
        query: { ...state.query, ...action.payload, ...{pageIndex:0}}
      };
    }

    case MemberCollectionActionTypes.Page: {
      return {
        ...state,
        query: { ...state.query, ...action.payload }
      };
    }

    case MemberCollectionActionTypes.Select: {
      if (state.selected.includes(action.payload)) {
        return {
          ...state,
          selected: state.selected.filter(id => id !== action.payload),
        };
      }
      else {
        return {
          ...state,
          selected: [...state.selected, action.payload],
        };
      }
    }

    case MemberCollectionActionTypes.SelectAll: {
      let selected: string[];
      console.log("test")
      console.log(_.difference(state.total, state.selected))
      if ((_.difference(state.total, state.selected)).length) {
        selected = [...state.selected, ...state.total];
        selected = _.uniq([...state.selected, ...selected]);
      }
      else {
        console.log("else")
        selected = state.selected.filter(val => !state.total.includes(val));
      }
      
      console.log(selected)
      return {
        ...state,
        selected: selected,
      };
    }

    /* case MemberCollectionActionTypes.SelectAllSuccess: {
       let selected: string[];
 
       let notSelected = _.difference(action.payload, state.selected)
       if (notSelected.length) {
         selected = [...state.selected, ...action.payload];
       }
       else {
         selected = state.selected.filter(val => action.payload.find((f) => f == val));
       }
 
       return {
         ...state,
         selected: selected,
       };
     }*/

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
        total: action.payload,
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

export const getTotal = (state: State) => state.total.length;

export const isAllSelected = (state: State) => ((_.difference(state.total, state.selected)).length==0 && (state.total.length>0));

export const isSelected = (state: State) => (!((_.difference(state.total, state.selected)).length==0 && (state.total.length>0))
 && (_.difference(state.total, state.selected)).length !== state.total.length);

export const getSelected = (state: State) => state.selected;

export const getIds = (state: State) => state.ids;
