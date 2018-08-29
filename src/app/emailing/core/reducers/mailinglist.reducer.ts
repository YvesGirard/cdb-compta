import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { MailingList } from '../../../model/mail';
import { MailingListActionsUnion, MailingListActionTypes } from '../actions/mailinglist.actions';
/*import {
  CollectionActionsUnion,
  CollectionActionTypes,
} from '../../../participant/actions/collection.actions';*/

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<MailingList> {
  selectedMailingListId: string | null;
  loaded:boolean;
  loading:boolean;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<MailingList> = createEntityAdapter<MailingList>({
  selectId: (mailinglist: MailingList) => mailinglist._id,
  sortComparer: false,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  selectedMailingListId: null,
  loaded:false,
  loading:false,
});

export function reducer(
  state = initialState,
  action: MailingListActionsUnion //| CollectionActionsUnion
): State {
  switch (action.type) {
    case MailingListActionTypes.LoadMailingList: {

      return {
        ...state,
        loaded:false,
        loading:true,
      };
    }

    case MailingListActionTypes.LoadMailingListSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        selectedMailingListId: state.selectedMailingListId,
        loaded:true,
        loading:false,
      });
    }

    case MailingListActionTypes.LoadMailingListFail: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case MailingListActionTypes.AddMailingListSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
        selectedMailingListId: state.selectedMailingListId,
      });
    }

    case MailingListActionTypes.UpdateMailingListSuccess: {

      return adapter.updateOne({ id: action.payload._id, changes: action.payload }, {
        ...state,
        selectedMailingListId: null,
      });
    }

    case MailingListActionTypes.DeleteMailingListSuccess: {

      return adapter.removeOne(action.payload._id, {
        ...state,
        selectedMailingListId: null,
      });
    }

    case MailingListActionTypes.SelectMailingList: {
      return {
        ...state,
        selectedMailingListId: action.payload,
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

export const getSelectedId = (state: State) => state.selectedMailingListId;

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

