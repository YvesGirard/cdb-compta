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
    DeleteMember,
    DeleteMemberSuccess,
    DeleteMemberFail,
    LoadMember,
    LoadMemberSuccess,
    LoadMemberFail,
} from '../actions/member.actions';

import { Member } from '../../model/member';


@Injectable()
export class MemberEffects {

    @Effect()
    loadMembers$ = this.actions$.ofType(MemberActionTypes.LoadMember).pipe(
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
    createMember$ = this.actions$.ofType(MemberActionTypes.AddMember).pipe(
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
    updateMember$ = this.actions$.ofType(MemberActionTypes.UpdateMember).pipe(
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
    removeMember$ = this.actions$.ofType(MemberActionTypes.DeleteMember).pipe(
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

    @Effect({ dispatch: false })
    handleMemberSuccess$ = this.actions$
    .ofType(
        MemberActionTypes.DeleteMemberSuccess,
        MemberActionTypes.UpdateMemberSuccess,
    )
    .pipe(
      map((member) => {
        let link = ['/member'];
        this.router.navigate(link);
      })
    );

    constructor(
        private actions$: Actions,
        private memberService: MemberService,
        private router: Router
    ) { }
}