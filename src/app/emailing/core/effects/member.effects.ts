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
} from 'rxjs/operators';

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



    constructor(
        private actions$: Actions,
        private mailingListService: MailingListMemberService,
        private router: Router
    ) { }
}