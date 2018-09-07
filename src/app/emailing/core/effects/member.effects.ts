import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { asyncScheduler, empty, Observable, of } from 'rxjs';
import {
    catchError,
    debounceTime,
    map,
    skip,
    switchMap,
    takeUntil,
    tap,
    withLatestFrom,
} from 'rxjs/operators';
import { Store,select } from '@ngrx/store';
import { MailingListMemberService } from '../services';

import {
    MailingListMemberActionTypes,
    AddMailingListMember,
    AddMailingListMemberSuccess,
    AddMailingListMemberFail,
    UpdateMailingListMember,
    UpdateMailingListMemberSuccess,
    UpdateMailingListMemberFail,
    DeleteMailingListMember,
    DeleteMailingListMemberSuccess,
    DeleteMailingListMemberFail,
    LoadMailingListMember,
    LoadMailingListMemberSuccess,
    LoadMailingListMemberFail,
} from '../actions/member.actions';

import { MailingListMember } from '../../../model/mail';
import { MailingList } from '../../../model/mail';

import * as fromMailinglists from '../reducers';

@Injectable()
export class MailingListMemberEffects {

    @Effect()
    loadMailingListMembers$ = this.actions$.ofType(MailingListMemberActionTypes.LoadMailingListMember).pipe(
        map((action: LoadMailingListMember) => action.payload),
        switchMap((val) => {
            return this.mailingListService
                .getMailingListMembers(val)
                .pipe(
                    map((mailingListMember: MailingListMember[]) => new LoadMailingListMemberSuccess(mailingListMember)),
                    catchError(error => of(new LoadMailingListMemberFail(error)))
                );
        })
    );

    @Effect()
    addMailingListMembers$ = this.actions$.ofType(MailingListMemberActionTypes.AddMailingListMember).pipe(
        withLatestFrom(this.store.pipe(select(fromMailinglists.getSelectedMailingList))),
        map(([action, mailinglist]: ([AddMailingListMember, MailingList])) => [action.payload, mailinglist.address]),
        switchMap((val) => {
            console.log(val)
            return this.mailingListService
                .addMailingListMembers({address:val[1], members:val[0]})
                .pipe(
                    map((mailingListMember: MailingListMember[]) => new AddMailingListMemberSuccess(mailingListMember)),
                    catchError(error => of(new AddMailingListMemberFail(error)))
                );
        })
    );

    @Effect({ dispatch: false })
    handleMemberSuccess$ = this.actions$
    .ofType(
        MailingListMemberActionTypes.AddMailingListMemberSuccess,
        MailingListMemberActionTypes.AddMailingListMemberFail,
    )
    .pipe(
    withLatestFrom(this.store.pipe(select(fromMailinglists.getSelectedMailingList))),
      map(([payload, mailinglist]) => {
        let link = ['/mailing/mailinglist', mailinglist._id];
        this.router.navigate(link);
      })
    );

    constructor(
        private actions$: Actions,
        private mailingListService: MailingListMemberService,
        private router: Router,
        private store: Store<fromMailinglists.State>,
    ) { }
}