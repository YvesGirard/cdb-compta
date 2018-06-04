import { AccountActionsUnion, AccountActionTypes  } from '../actions/account.actions';
import { Account } from '../../models/account';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface State extends EntityState<Account> {
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Account> = createEntityAdapter<Account>({
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading:false,
});

export function reducer(
  state = initialState,
  action: AccountActionsUnion
): State {
  switch (action.type) {
    case AccountActionTypes.LoadAccountsSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
      });
    }

    case AccountActionTypes.LoadAccounts: {
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    }

    case AccountActionTypes.AddAccountFail: {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }

    default: {
      return state;
    }
  }
}


