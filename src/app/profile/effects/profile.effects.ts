import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from "../services/user.service";
import { User } from '../../model/user';

import {
  UserActionTypes,
  UpdateUserProfile,
  UpdateUserProfileSuccess,
  UpdateUserProfileFail,
} from '../actions/profile.actions';

@Injectable()
export class ProfileEffects {

  @Effect()
  updateUserProfile$ = this.actions$.pipe(
    ofType(UserActionTypes.UpdateUserProfile),
    map((action: UpdateUserProfile) => action.payload),
    switchMap(user => {
      return this.userService
        .updateUserProfile(user)
        .pipe(
          map((user) => new UpdateUserProfileSuccess(user)),
          catchError((error) => {
            return of(new UpdateUserProfileFail(error))
          })
        );
    })
  );

  constructor(private actions$: Actions, private userService: UserService) { }
}