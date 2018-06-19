import { ExerciceActionsUnion, ExerciceActionTypes  } from '../actions/exercice.actions';
import { Exercice } from '../../models/exercice';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface State extends EntityState<Exercice> {
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Exercice> = createEntityAdapter<Exercice>({
  selectId: (exercice: Exercice) => exercice._id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading:false,
});

export function reducer(
  state = initialState,
  action: ExerciceActionsUnion
): State {
  switch (action.type) {
    case ExerciceActionTypes.LoadExercicesSuccess: {
      console.log("LoadExercicesSuccess")
      console.log(action.payload)
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
    }

    case ExerciceActionTypes.AddExerciceSuccess: {
      return adapter.addOne(action.payload, {
        ...state,
      });
    }

    case ExerciceActionTypes.LoadExercices: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case ExerciceActionTypes.AddExerciceFail: {
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


