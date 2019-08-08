import { CompetitionActionsUnion, CompetitionActionTypes  } from '../actions/competition.actions';
import { Competition } from '../../models/competition';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface State extends EntityState<Competition> {
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Competition> = createEntityAdapter<Competition>({
  selectId: (competition: Competition) => competition._id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading:false,
});

export function reducer(
  state = initialState,
  action: CompetitionActionsUnion
): State {
  switch (action.type) {
    case CompetitionActionTypes.LoadCompetitionsSuccess: {
      console.log("LoadCompetitionsSuccess")
      console.log(action.payload)
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
    }

    case CompetitionActionTypes.AddCompetitionSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
      });
    }

    case CompetitionActionTypes.LoadCompetitions: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case CompetitionActionTypes.AddCompetitionFail: {
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


