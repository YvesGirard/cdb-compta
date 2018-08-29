import { JournalActionsUnion, JournalActionTypes  } from '../actions/journal.actions';
import { Journal } from '../../models/journal';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface State extends EntityState<Journal> {
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Journal> = createEntityAdapter<Journal>({
  selectId: (journal: Journal) => journal.journal_id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading:false,
});

export function reducer(
  state = initialState,
  action: JournalActionsUnion
): State {
  switch (action.type) {
    case JournalActionTypes.LoadJournalsSuccess: {
      console.log("LoadJournalsSuccess")
      console.log(action.payload)
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
    }

    case JournalActionTypes.AddJournalSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
      });
    }

    case JournalActionTypes.LoadJournals: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case JournalActionTypes.AddJournalFail: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    default: {
      return state;
    }
  }
}


