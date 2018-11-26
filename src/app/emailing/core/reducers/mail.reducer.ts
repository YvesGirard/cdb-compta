import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Mail } from '../../../model/mail';
import { MailActionsUnion, MailActionTypes } from '../actions/mail.actions';
import {
  MailCollectionActionsUnion,
  MailCollectionActionTypes,
} from '../actions/mail.collection.actions';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<Mail> {
  selectedMailId: string | null;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<Mail> = createEntityAdapter<Mail>({
  selectId: (member: Mail) => member._id,
  sortComparer: false,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  selectedMailId: null,
});

export function reducer(
  state = initialState,
  action: MailActionsUnion | MailCollectionActionsUnion
): State {
  switch (action.type) {
    case MailActionTypes.LoadMail: {

      return {
        ...state,
      };
    }

    case MailCollectionActionTypes.LoadSuccess: {

      return adapter.addMany(action.payload, {
        ...state,
        selectedMailId: state.selectedMailId,
      });
    }

    case MailActionTypes.LoadMailSuccess:
    case MailActionTypes.AddMailSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        selectedMailId: state.selectedMailId,
      });
    }

    case MailActionTypes.UpdateMailSuccess: {

      return adapter.updateOne( { id: action.payload._id, changes: action.payload }, {
        ...state,
        selectedMailId: null,
      });
    }

    case MailActionTypes.DeleteMailSuccess: {

      return adapter.removeOne(action.payload._id, {
        ...state,
        selectedMailId: null,
      });
    }

    case MailActionTypes.SelectMail: {
      return {
        ...state,
        selectedMailId: action.payload,
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

export const getSelectedId = (state: State) => state.selectedMailId;
