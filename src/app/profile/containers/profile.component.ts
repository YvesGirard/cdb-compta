import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../model/user';

import * as fromAuth from '../../auth/reducers';
import * as fromRoot from '../../reducers';
import * as ProfileActions from '../actions/profile.actions';

@Component({
    selector: 'user-profile',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <user-profile-form (update)="onUpdate($event)" [user]="user$ | async"></user-profile-form>
  `,
    styles: [
        `

  `,
    ],
})
export class ProfilePageComponent implements OnInit {
    user$: Observable<User>;

    constructor(private store: Store<fromRoot.State>, ) {
        this.user$ = this.store.pipe(select(fromAuth.getUser));
    }

    ngOnInit() {
       
    }

    onUpdate(event: User) {
        this.store.dispatch(new ProfileActions.UpdateUserProfile(event));
    }
}