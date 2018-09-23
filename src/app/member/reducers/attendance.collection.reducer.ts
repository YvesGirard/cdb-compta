import {
  AttendanceCollectionActionTypes,
  AttendanceCollectionActionsUnion,
} from '../actions/attendance.collection.actions';
import { AttendanceActionsUnion, AttendanceActionTypes } from '../actions/attendance.actions';

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
};

export function reducer(
  state = initialState,
  action: AttendanceActionsUnion | AttendanceCollectionActionsUnion
): State {
  switch (action.type) {
    case AttendanceCollectionActionTypes.Load: {

      return {
        ...state,
        //query: action.payload
      };
    }

    case AttendanceCollectionActionTypes.Search:
    case AttendanceCollectionActionTypes.Page: {

      return {
        ...state, 
        query: {...state.query, ...action.payload}
      };
    }

    case AttendanceActionTypes.LoadAttendance: {

      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case AttendanceCollectionActionTypes.GetTotalSuccess: {

      return {
        ...state,
        total: +action.payload.total,
      };
    }

    case AttendanceCollectionActionTypes.LoadSuccess:
      {
        return {
          ...state,
          loaded: true,
          loading: false,
          ids: action.payload.map(participant => participant._id),
        };
      }

    case AttendanceActionTypes.LoadAttendanceSuccess:
      {
        return {
          ...state,
          loaded: true,
          loading: false,
          ids: [...state.ids, action.payload._id],
        };
      }

    case AttendanceActionTypes.AddAttendanceSuccess:
    case AttendanceActionTypes.DeleteAttendanceFail: {
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

    case AttendanceActionTypes.DeleteAttendanceSuccess:
    case AttendanceActionTypes.LoadAttendanceFail:
    case AttendanceActionTypes.AddAttendanceFail: {
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