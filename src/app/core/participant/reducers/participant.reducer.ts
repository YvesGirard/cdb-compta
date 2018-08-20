import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Participant } from '../../../model/participant';
import { ParticipantActionsUnion, ParticipantActionTypes } from '../actions/participant.actions';
import {
  CollectionActionsUnion,
  CollectionActionTypes,
} from '../../../participant/actions/collection.actions';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Participant> {
  selectedParticipantId: string | null;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<Participant> = createEntityAdapter<Participant>({
  selectId: (participant: Participant) => participant._id,
  sortComparer: false,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  selectedParticipantId: null,
});

export function reducer(
  state = initialState,
  action: ParticipantActionsUnion | CollectionActionsUnion
): State {
  switch (action.type) {
    case ParticipantActionTypes.LoadParticipant: {

      return {
        ...state,
      };
    }

    case CollectionActionTypes.LoadSuccess: {

      return adapter.addMany(action.payload, {
        ...state,
        selectedParticipantId: state.selectedParticipantId,
      });
    }

    case ParticipantActionTypes.LoadParticipantSuccess:
    case ParticipantActionTypes.AddParticipantSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        selectedParticipantId: state.selectedParticipantId,
      });
    }

    case ParticipantActionTypes.UpdateParticipantSuccess: {

      return adapter.updateOne( { id: action.payload._id, changes: action.payload }, {
        ...state,
        selectedParticipantId: null,
      });
    }

    case ParticipantActionTypes.DeleteParticipantSuccess: {

      return adapter.removeOne(action.payload._id, {
        ...state,
        selectedParticipantId: null,
      });
    }

    case ParticipantActionTypes.SelectParticipant: {
      return {
        ...state,
        selectedParticipantId: action.payload,
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

export const getSelectedId = (state: State) => state.selectedParticipantId;
