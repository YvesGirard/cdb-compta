import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { JournalService } from "../../services/journal.service";
import { Journal } from '../../models/journal';

import {
  AddJournal,
  AddJournalSuccess,
  AddJournalFail,
  RemoveJournal,
  RemoveJournalSuccess,
  RemoveJournalFail,
  LoadJournals,
  LoadJournalsSuccess,
  LoadJournalsFail,
  UpdateJournal,
  UpdateJournalSuccess,
  UpdateJournalFail,
  JournalActionTypes,
} from '../actions/journal.actions';

@Injectable()
export class JournalEffects {

  @Effect()
  loadJournals$ = this.actions$.pipe(
    ofType(JournalActionTypes.LoadJournals),
    switchMap(() => {
      return this.journalService
        .getJournals()
        .pipe(
          map((Journals : Journal[]) => new LoadJournalsSuccess(Journals)),
          catchError(error => of(new LoadJournalsFail(error)))
        );
    })
  );


  @Effect()
  createJournal$ = this.actions$.pipe(
    ofType(JournalActionTypes.AddJournal),
    map((action: AddJournal) => action.payload), 
    switchMap(journal => {
      
      return this.journalService
        .createJournal(journal)
        .pipe(
          map(journal => new AddJournalSuccess(journal)),
          catchError(error => of(new AddJournalFail(error)))
        );
    })
  );

  /*@Effect()
  createJournalSuccess$ = this.actions$
    .ofType(JournalActionTypes.AddJournalSuccess)
    .pipe(
      map((action: AddJournalSuccess) => action.payload),
      map(journal => {
        // rien
      })
    );*/

  @Effect()
  updateJournal$ = this.actions$.pipe(
    ofType(JournalActionTypes.UpdateJournal),
    map((action: UpdateJournal) => action.payload),
    switchMap(journal => {
      return this.journalService
        .updateJournal(journal)
        .pipe(
          map(journal => new UpdateJournalSuccess(journal)),
          catchError(error => of(new UpdateJournalFail(error)))
        );
    })
  );

  @Effect()
  removeJournal$ = this.actions$.pipe(
    ofType(JournalActionTypes.RemoveJournal),
    map((action: RemoveJournal) => action.payload),
    switchMap(journal => {
      return this.journalService
        .removeJournal(journal)
        .pipe(
          map(() => new RemoveJournalSuccess(journal)),
          catchError(error => of(new RemoveJournalFail(error)))
        );
    })
  );


  constructor(private actions$: Actions, private journalService: JournalService) { }
}