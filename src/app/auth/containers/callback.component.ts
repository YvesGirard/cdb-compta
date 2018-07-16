import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';
import * as fromAuth from '../reducers';

@Component({
  template: ``
})
export class CallbackComponent {

  constructor(
    private store: Store<fromAuth.State>,
  ) {
      // Auth module handleAuth
      this.store.dispatch(new AuthActions.HandleAuth());
  }
}
