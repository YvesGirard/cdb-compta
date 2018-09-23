import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Attendance } from '../../model/member';
import { AttendanceActionsUnion, AttendanceActionTypes } from '../actions/attendance.actions';
import {
  AttendanceCollectionActionsUnion,
  AttendanceCollectionActionTypes,
} from '../actions/attendance.collection.actions';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Attendance> {
  selectedAttendanceId: string | null;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<Attendance> = createEntityAdapter<Attendance>({
  selectId: (attendance: Attendance) => attendance._id,
  sortComparer: false,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  selectedAttendanceId: null,
});

export function reducer(
  state = initialState,
  action: AttendanceActionsUnion | AttendanceCollectionActionsUnion
): State {
  switch (action.type) {
    case AttendanceActionTypes.LoadAttendance: {

      return {
        ...state,
      };
    }

    case AttendanceCollectionActionTypes.LoadSuccess: {

      return adapter.addMany(action.payload, {
        ...state,
        selectedAttendanceId: state.selectedAttendanceId,
      });
    }

    case AttendanceActionTypes.LoadAttendanceSuccess:
    case AttendanceActionTypes.AddAttendanceSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        selectedAttendanceId: state.selectedAttendanceId,
      });
    }

    case AttendanceActionTypes.UpdateAttendanceSuccess: {

      return adapter.updateOne( { id: action.payload._id, changes: action.payload }, {
        ...state,
        selectedAttendanceId: null,
      });
    }

    case AttendanceActionTypes.DeleteAttendanceSuccess: {

      return adapter.removeOne(action.payload._id, {
        ...state,
        selectedAttendanceId: null,
      });
    }

    case AttendanceActionTypes.SelectAttendance: {
      return {
        ...state,
        selectedAttendanceId: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Reattendance to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getSelectedId = (state: State) => state.selectedAttendanceId;
