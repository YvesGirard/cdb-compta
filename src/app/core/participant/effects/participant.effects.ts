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

import { ParticipantService } from '../../../participant/services/participant.service';

import {
    ParticipantActionTypes,
    AddParticipant,
    AddParticipantSuccess,
    AddParticipantFail,
    UpdateParticipant,
    UpdateParticipantSuccess,
    UpdateParticipantFail,
    DeleteParticipant,
    DeleteParticipantSuccess,
    DeleteParticipantFail,
    LoadParticipant,
    LoadParticipantSuccess,
    LoadParticipantFail,
} from '../actions/participant.actions';

import { Participant } from '../../../model/participant';


@Injectable()
export class ParticipantEffects {

    @Effect()
    loadParticipants$ = this.actions$.pipe(
        ofType(ParticipantActionTypes.LoadParticipant),
        map((action: LoadParticipant) => action.payload),
        switchMap((id) => {
            return this.participantService
                .getParticipant(id)
                .pipe(
                    map((participant: Participant) => new LoadParticipantSuccess(participant)),
                    catchError(error => of(new LoadParticipantFail(error)))
                );
        })
    );


    @Effect()
    createParticipant$ = this.actions$.pipe(
        ofType(ParticipantActionTypes.AddParticipant),
        map((action: AddParticipant) => action.payload),
        switchMap(participant => {
            return this.participantService
                .createParticipant(participant)
                .pipe(
                    map(participant => new AddParticipantSuccess(participant)),
                    catchError(error => of(new AddParticipantFail(error)))
                );
        })
    );


    @Effect()
    updateParticipant$ = this.actions$.pipe(
        ofType(ParticipantActionTypes.UpdateParticipant),
        map((action: UpdateParticipant) => action.payload),
        switchMap(participant => {
            return this.participantService
                .updateParticipant(participant)
                .pipe(
                    map(participant => new UpdateParticipantSuccess(participant)),
                    catchError(error => of(new UpdateParticipantFail(error)))
                );
        })
    );

    @Effect()
    removeParticipant$ = this.actions$.pipe(
        ofType(ParticipantActionTypes.DeleteParticipant),
        map((action: DeleteParticipant) => action.payload),
        switchMap(participant => {
            return this.participantService
                .removeParticipant(participant)
                .pipe(
                    map(() => new DeleteParticipantSuccess(participant)),
                    catchError(error => of(new DeleteParticipantFail(error)))
                );
        })
    );

    @Effect({ dispatch: false })
    handleParticipantSuccess$ = this.actions$.pipe(
    ofType(
        ParticipantActionTypes.DeleteParticipantSuccess,
        ParticipantActionTypes.UpdateParticipantSuccess,
    ),
      map((participant) => {
        let link = ['/participant'];
        this.router.navigate(link);
      })
    );

    constructor(
        private actions$: Actions,
        private participantService: ParticipantService,
        private router: Router
    ) { }
}