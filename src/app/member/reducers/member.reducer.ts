import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Member } from '../../model/member';
import { MemberActionsUnion, MemberActionTypes } from '../actions/member.actions';
import {
  CollectionActionsUnion,
  CollectionActionTypes,
} from '../actions/collection.actions';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Member> {
  selectedMemberId: string | null;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<Member> = createEntityAdapter<Member>({
  selectId: (member: Member) => member._id,
  sortComparer: false,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  selectedMemberId: null,
});

export function reducer(
  state = initialState,
  action: MemberActionsUnion | CollectionActionsUnion
): State {
  switch (action.type) {
    case MemberActionTypes.LoadMember: {

      return {
        ...state,
      };
    }

    case CollectionActionTypes.LoadSuccess: {

      return adapter.addMany(action.payload, {
        ...state,
        selectedMemberId: state.selectedMemberId,
      });
    }

    case MemberActionTypes.LoadMemberSuccess:
    case MemberActionTypes.AddMemberSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        selectedMemberId: state.selectedMemberId,
      });
    }

    case MemberActionTypes.UpdateMemberSuccess: {

      return adapter.updateOne( { id: action.payload._id, changes: action.payload }, {
        ...state,
        selectedMemberId: null,
      });
    }

    case MemberActionTypes.DeleteMemberSuccess: {

      return adapter.removeOne(action.payload._id, {
        ...state,
        selectedMemberId: null,
      });
    }

    case MemberActionTypes.SelectMember: {
      return {
        ...state,
        selectedMemberId: action.payload,
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
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getSelectedId = (state: State) => state.selectedMemberId;
