import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
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
    withLatestFrom,
} from 'rxjs/operators';

import { MailingListService } from '../services/';

import {
    MailActionTypes,
    AddMail,
    AddMailSuccess,
    AddMailFail,
    UpdateMail,
    UpdateMailSuccess,
    UpdateMailFail,
    UploadMail,
    UploadMailSuccess,
    UploadMailFail,
    DeleteMail,
    DeleteMailSuccess,
    DeleteMailFail,
    LoadMail,
    LoadMailSuccess,
    LoadMailFail,
    SendMail,
    SendMailFail,
    SendMailSuccess,
} from '../actions/mail.actions';

import {
    Load,
  } from '../actions/mail.collection.actions';

import { Mail } from '../../../model/mail';

import * as fromMails from '../reducers';

@Injectable()
export class MailEffects {

    @Effect()
    loadMails$ = this.actions$.pipe(
        ofType(MailActionTypes.LoadMail),
        map((action: LoadMail) => action.payload),
        switchMap((id) => {
            return this.mailService
                .getMail(id)
                .pipe(
                    map((mail: Mail) => new LoadMailSuccess(mail)),
                    catchError(error => of(new LoadMailFail(error)))
                );
        })
    );


    @Effect()
    updateMail$ = this.actions$.pipe(
        ofType(MailActionTypes.UpdateMail),
        map((action: UpdateMail) => action.payload),
        switchMap(mail => {
            return this.mailService
                .updateMail(mail)
                .pipe(
                    map(mail => new UpdateMailSuccess(mail)),
                    catchError(error => of(new UpdateMailFail(error)))
                );
        })
    );

    @Effect()
    sendMail$ = this.actions$.pipe(
        ofType(MailActionTypes.SendMail),
        map((action: SendMail) => action.payload),
        switchMap(mail => {
            return this.mailService
                .send(mail)
                .pipe(
                    map(mail => new SendMailSuccess(mail)),
                    catchError(error => of(new SendMailFail(error)))
                );
        })
    );

    /*@Effect()
    removeMail$ = this.actions$.ofType(MailActionTypes.DeleteMail).pipe(
        map((action: DeleteMail) => action.payload),
        switchMap(mail => {
            return this.mailService
                .removeMail(mail)
                .pipe(
                    map(() => new DeleteMailSuccess(mail)),
                    catchError(error => of(new DeleteMailFail(error)))
                );
        })
    );*/

    @Effect({ dispatch: false })
    handleMailSuccess$ = this.actions$.pipe(
        ofType(
            MailActionTypes.DeleteMailSuccess,
            MailActionTypes.UpdateMailSuccess,
        ),        
            map((mail) => {
                let link = ['mailing/mails'];
                this.router.navigate(link);
            })
        );

    constructor(
        private actions$: Actions,
        private mailService: MailingListService,
        private router: Router,
        private store: Store<fromMails.State>,
    ) { }
}