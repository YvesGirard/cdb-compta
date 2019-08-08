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
    loadMailingLists$ = this.actions$.pipe(
        ofType(MailingListActionTypes.LoadMailingList),
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
    createMailingList$ = this.actions$.pipe(
        ofType(MailingListActionTypes.AddMailingList),
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
    updateMailingList$ = this.actions$.pipe(
        ofType(MailingListActionTypes.UpdateMailingList),
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
    removeMailingList$ = this.actions$.pipe(
        ofType(MailingListActionTypes.DeleteMailingList),
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
    handleMailingListSuccess$ = this.actions$.pipe(
    ofType(
        MailingListActionTypes.DeleteMailingListSuccess,
        MailingListActionTypes.UpdateMailingListSuccess,
    ),    
      map((mailingList) => {
        let link = ['/mailinglist'];
        this.router.navigate(link);
      })
    );

    constructor(
        private actions$: Actions,
        private mailingListService: MailingListService,
        private router: Router,
    ) { }
}