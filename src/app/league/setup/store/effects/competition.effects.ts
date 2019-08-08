import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CompetitionService } from "../../services/competition.service";
import { Competition } from '../../models/competition';

import {
  AddCompetition,
  AddCompetitionSuccess,
  AddCompetitionFail,
  RemoveCompetition,
  RemoveCompetitionSuccess,
  RemoveCompetitionFail,
  LoadCompetitions,
  LoadCompetitionsSuccess,
  LoadCompetitionsFail,
  UpdateCompetition,
  UpdateCompetitionSuccess,
  UpdateCompetitionFail,
  CompetitionActionTypes,
} from '../actions/competition.actions';

@Injectable()
export class CompetitionEffects {

  @Effect()
  loadCompetitions$ = this.actions$.pipe(
    ofType(CompetitionActionTypes.LoadCompetitions),
    switchMap(() => {
      return this.competitionService
        .getCompetitions()
        .pipe(
          map((Competitions : Competition[]) => new LoadCompetitionsSuccess(Competitions)),
          catchError(error => of(new LoadCompetitionsFail(error)))
        );
    })
  );


  @Effect()
  createCompetition$ = this.actions$.pipe(
    ofType(CompetitionActionTypes.AddCompetition),
    map((action: AddCompetition) => action.payload), 
    switchMap(competition => {
      
      return this.competitionService
        .createCompetition(competition)
        .pipe(
          map(competition => new AddCompetitionSuccess(competition)),
          catchError(error => of(new AddCompetitionFail(error)))
        );
    })
  );

  /*@Effect()
  createCompetitionSuccess$ = this.actions$
    .ofType(CompetitionActionTypes.AddCompetitionSuccess)
    .pipe(
      map((action: AddCompetitionSuccess) => action.payload),
      map(competition => {
        // rien
      })
    );*/

  @Effect()
  updateCompetition$ = this.actions$.pipe(
    ofType(CompetitionActionTypes.UpdateCompetition),
    map((action: UpdateCompetition) => action.payload),
    switchMap(competition => {
      return this.competitionService
        .updateCompetition(competition)
        .pipe(
          map(competition => new UpdateCompetitionSuccess(competition)),
          catchError(error => of(new UpdateCompetitionFail(error)))
        );
    })
  );

  @Effect()
  removeCompetition$ = this.actions$.pipe(
    ofType(CompetitionActionTypes.RemoveCompetition),
    map((action: RemoveCompetition) => action.payload),
    switchMap(competition => {
      return this.competitionService
        .removeCompetition(competition)
        .pipe(
          map(() => new RemoveCompetitionSuccess(competition)),
          catchError(error => of(new RemoveCompetitionFail(error)))
        );
    })
  );


  constructor(private actions$: Actions, private competitionService: CompetitionService) { }
}