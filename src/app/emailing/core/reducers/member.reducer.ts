import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { MailingListMember } from '../../../model/mail';
import { MailingListMemberActionsUnion, MailingListMemberActionTypes } from '../actions/member.actions';
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
export interface State extends EntityState<MailingListMember> {
  selectedMailingListMemberId: string | null;
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
export const adapter: EntityAdapter<MailingListMember> = createEntityAdapter<MailingListMember>({
  selectId: (mailinglistMember: MailingListMember) => mailinglistMember.address,
  sortComparer: false,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  selectedMailingListMemberId: null,
  loaded:false,
  loading:false,
});

export function reducer(
  state = initialState,
  action: MailingListMemberActionsUnion
): State {
  switch (action.type) {
    case MailingListMemberActionTypes.LoadMailingListMember: {

      return adapter.removeAll({
        ...state,
        loaded:false,
        loading:true,
      });
    }

    case MailingListMemberActionTypes.LoadMailingListMemberSuccess: {
      
      return adapter.addMany(action.payload, {
        ...state,
        selectedMailingListMemberId: state.selectedMailingListMemberId,
        loaded:true,
        loading:false,
      });
    }

    case MailingListMemberActionTypes.LoadMailingListMemberFail: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }


    case MailingListMemberActionTypes.SelectMailingListMember: {
      return {
        ...state,
        selectedMailingListMemberId: action.payload,
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

export const getSelectedId = (state: State) => state.selectedMailingListMemberId;

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

