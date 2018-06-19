import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { ExerciceService } from "../../services/exercice.service";

import {
  AddExercice,
  AddExerciceSuccess,
  AddExerciceFail,
  RemoveExercice,
  RemoveExerciceSuccess,
  RemoveExerciceFail,
  LoadExercices,
  LoadExercicesSuccess,
  LoadExercicesFail,
  UpdateExercice,
  UpdateExerciceSuccess,
  UpdateExerciceFail,
  ExerciceActionTypes,
} from './../actions/exercice.actions';

@Injectable()
export class ExerciceEffects {

  @Effect()
  loadExercices$ = this.actions$.ofType(ExerciceActionTypes.LoadExercices).pipe(
    switchMap(() => {
      return this.exerciceService
        .getExercices()
        .pipe(
          map(Exercices => new LoadExercicesSuccess(Exercices)),
          catchError(error => of(new LoadExercicesFail(error)))
        );
    })
  );


  @Effect()
  createExercice$ = this.actions$.ofType(ExerciceActionTypes.AddExercice).pipe(
    map((action: AddExercice) => action.payload), 
    switchMap(exercice => {
      
      return this.exerciceService
        .createExercice(exercice)
        .pipe(
          map(exercice => new AddExerciceSuccess(exercice)),
          catchError(error => of(new AddExerciceFail(error)))
        );
    })
  );

  /*@Effect()
  createExerciceSuccess$ = this.actions$
    .ofType(ExerciceActionTypes.AddExerciceSuccess)
    .pipe(
      map((action: AddExerciceSuccess) => action.payload),
      map(exercice => {
        // rien
      })
    );*/

  @Effect()
  updateExercice$ = this.actions$.ofType(ExerciceActionTypes.UpdateExercice).pipe(
    map((action: UpdateExercice) => action.payload),
    switchMap(exercice => {
      return this.exerciceService
        .updateExercice(exercice)
        .pipe(
          map(exercice => new UpdateExerciceSuccess(exercice)),
          catchError(error => of(new UpdateExerciceFail(error)))
        );
    })
  );

  @Effect()
  removeExercice$ = this.actions$.ofType(ExerciceActionTypes.RemoveExercice).pipe(
    map((action: RemoveExercice) => action.payload),
    switchMap(exercice => {
      return this.exerciceService
        .removeExercice(exercice)
        .pipe(
          map(() => new RemoveExerciceSuccess(exercice)),
          catchError(error => of(new RemoveExerciceFail(error)))
        );
    })
  );


  constructor(private actions$: Actions, private exerciceService: ExerciceService) { }
}