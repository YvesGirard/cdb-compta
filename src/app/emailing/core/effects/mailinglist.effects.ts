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

import { MailingListService } from '../services';

import {
    MailingListActionTypes,
    AddMailingList,
    AddMailingListSuccess,
    AddMailingListFail,
    UpdateMailingList,
    UpdateMailingListSuccess,
    UpdateMailingListFail,
    DeleteMailingList,
    DeleteMailingListSuccess,
    DeleteMailingListFail,
    LoadMailingList,
    LoadMailingListSuccess,
    LoadMailingListFail,
} from '../actions/mailinglist.actions';

import { MailingList } from '../../../model/mail';


@Injectable()
export class MailingListEffects {

    @Effect()
    loadMailingLists$ = this.actions$.ofType(MailingListActionTypes.LoadMailingList).pipe(
        switchMap(() => {
            console.log("loadMailingLists");
            return this.mailingListService
                .getMailingLists()
                .pipe(
                    map((mailingList: MailingList[]) => new LoadMailingListSuccess(mailingList)),
                    catchError(error => of(new LoadMailingListFail(error)))
                );
        })
    );


    @Effect()
    createMailingList$ = this.actions$.ofType(MailingListActionTypes.AddMailingList).pipe(
        map((action: AddMailingList) => action.payload),
        switchMap(mailingList => {
            return this.mailingListService
                .createMailingList(mailingList)
                .pipe(
                    map(mailingList => new AddMailingListSuccess(mailingList)),
                    catchError(error => of(new AddMailingListFail(error)))
                );
        })
    );


    @Effect()
    updateMailingList$ = this.actions$.ofType(MailingListActionTypes.UpdateMailingList).pipe(
        map((action: UpdateMailingList) => action.payload),
        switchMap(mailingList => {
            return this.mailingListService
                .updateMailingList(mailingList)
                .pipe(
                    map(mailingList => new UpdateMailingListSuccess(mailingList)),
                    catchError(error => of(new UpdateMailingListFail(error)))
                );
        })
    );

    @Effect()
    removeMailingList$ = this.actions$.ofType(MailingListActionTypes.DeleteMailingList).pipe(
        map((action: DeleteMailingList) => action.payload),
        switchMap(mailingList => {
            return this.mailingListService
                .removeMailingList(mailingList)
                .pipe(
                    map(() => new DeleteMailingListSuccess(mailingList)),
                    catchError(error => of(new DeleteMailingListFail(error)))
                );
        })
    );

    @Effect({ dispatch: false })
    handleMailingListSuccess$ = this.actions$
    .ofType(
        MailingListActionTypes.DeleteMailingListSuccess,
        MailingListActionTypes.UpdateMailingListSuccess,
    )
    .pipe(
      map((mailingList) => {
        let link = ['/mailinglist'];
        this.router.navigate(link);
      })
    );

    constructor(
        private actions$: Actions,
        private mailingListService: MailingListService,
        private router: Router
    ) { }
}