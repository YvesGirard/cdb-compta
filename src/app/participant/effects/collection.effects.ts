import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';

import { Participant } from '../../model/participant';

import { ParticipantService } from '../services/participant.service';

import {
    AddParticipant,
    AddParticipantFail,
    AddParticipantSuccess,
    CollectionActionTypes,
    Load,
    LoadFail,
    LoadSuccess,
    RemoveParticipant,
    RemoveParticipantFail,
    RemoveParticipantSuccess,
} from '../actions/collection.actions';

@Injectable()
export class CollectionEffects {

    @Effect()
    loadCollection$: Observable<Action> = this.actions$.pipe(
        ofType(CollectionActionTypes.Load),
        map((action: Load) => action.payload),
        switchMap((query) =>
            this.participantService.getParticipants(query.filter,
                query.sortDirection,
                query.pageIndex,
                query.pageSize).pipe(
                    map((participant: Participant[]) => new LoadSuccess(participant)),
                    catchError(error => of(new LoadFail(error)))
                )
        )
    );


    /*
      @Effect()
      addParticipantToCollection$: Observable<Action> = this.actions$.pipe(
        ofType<AddParticipant>(CollectionActionTypes.AddParticipant),
        map(action => action.payload),
        mergeMap(participant =>
          this.db.insert('participants', [participant]).pipe(
            map(() => new AddParticipantSuccess(participant)),
            catchError(() => of(new AddParticipantFail(participant)))
          )
        )
      );
    
      @Effect()
      removeParticipantFromCollection$: Observable<Action> = this.actions$.pipe(
        ofType<RemoveParticipant>(CollectionActionTypes.RemoveParticipant),
        map(action => action.payload),
        mergeMap(participant =>
          this.db.executeWrite('participants', 'delete', [participant.id]).pipe(
            map(() => new RemoveParticipantSuccess(participant)),
            catchError(() => of(new RemoveParticipantFail(participant)))
          )
        )
      );
    */
    constructor(private actions$: Actions, private participantService: ParticipantService) { }
}
