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

import { MemberService } from '../services/member.service';

import {
    MemberActionTypes,
    AddMember,
    AddMemberSuccess,
    AddMemberFail,
    UpdateMember,
    UpdateMemberSuccess,
    UpdateMemberFail,
    UploadMember,
    UploadMemberSuccess,
    UploadMemberFail,
    DeleteMember,
    DeleteMemberSuccess,
    DeleteMemberFail,
    LoadMember,
    LoadMemberSuccess,
    LoadMemberFail,
    GetInscriptions,
    GetInscriptionsSuccess,
    GetInscriptionsFail,
} from '../actions/member.actions';

import {
    Load,
} from '../actions/collection.actions';

import { Member } from '../../model/member';

import * as fromMembers from '../reducers';

@Injectable()
export class MemberEffects {

    @Effect()
    loadMembers$ = this.actions$.pipe(
        ofType(MemberActionTypes.LoadMember),
        map((action: LoadMember) => action.payload),
        switchMap((id) => {
            return this.memberService
                .getMember(id)
                .pipe(
                    map((member: Member) => new LoadMemberSuccess(member)),
                    catchError(error => of(new LoadMemberFail(error)))
                );
        })
    );


    @Effect()
    createMember$ = this.actions$.pipe(
        ofType(MemberActionTypes.AddMember),
        map((action: AddMember) => action.payload),
        switchMap(member => {
            return this.memberService
                .createMember(member)
                .pipe(
                    map(member => new AddMemberSuccess(member)),
                    catchError(error => of(new AddMemberFail(error)))
                );
        })
    );


    @Effect()
    updateMember$ = this.actions$.pipe(
        ofType(MemberActionTypes.UpdateMember),
        map((action: UpdateMember) => action.payload),
        switchMap(member => {
            return this.memberService
                .updateMember(member)
                .pipe(
                    map(member => new UpdateMemberSuccess(member)),
                    catchError(error => of(new UpdateMemberFail(error)))
                );
        })
    );

    @Effect()
    removeMember$ = this.actions$.pipe(
        ofType(MemberActionTypes.DeleteMember),
        map((action: DeleteMember) => action.payload),
        switchMap(member => {
            return this.memberService
                .removeMember(member)
                .pipe(
                    map(() => new DeleteMemberSuccess(member)),
                    catchError(error => of(new DeleteMemberFail(error)))
                );
        })
    );

    @Effect()
    uploadFile$ = this.actions$.pipe(
        ofType(MemberActionTypes.UploadMember),
        map((action: UploadMember) => action.payload),
        switchMap(file => {
            return this.memberService
                .uploadMember(file)
                .pipe(
                    map(any => new UploadMemberSuccess(any)),
                    catchError(error => of(new UploadMemberFail(error)))
                );
        })
    );

    @Effect()
    handleUploadFileSuccess$ = this.actions$.pipe(
        ofType(MemberActionTypes.UploadMemberSuccess),
            withLatestFrom(this.store.pipe(select(fromMembers.getCollectionQuery))),
            map(([action, query]: ([UploadMemberSuccess, any])) => [action.payload, query]),
            map((val) => {
                return new Load(val[1]);
            })
        );

    @Effect()
    getInscriptions$ = this.actions$.pipe(
        ofType(MemberActionTypes.GetInscriptions),
        map((action: GetInscriptions) => action.payload),
        switchMap((member) => {
            return this.memberService
                .getMemberInscriptions(member)
                .pipe(
                    map(member => new UpdateMemberSuccess(member)),
                    catchError(error => of(new UpdateMemberFail(error)))
                );
        })
    );

    @Effect({ dispatch: false })
    handleMemberSuccess$ = this.actions$.pipe(
        ofType(
            MemberActionTypes.DeleteMemberSuccess,
            MemberActionTypes.UpdateMemberSuccess,
        ),
            map((member) => {
                let link = ['/members'];
                this.router.navigate(link);
            })
        );

    constructor(
        private actions$: Actions,
        private memberService: MemberService,
        private router: Router,
        private store: Store<fromMembers.State>,
    ) { }
}