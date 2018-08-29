import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Exercice } from '../models/exercice';

@Injectable()
export class ExerciceService {
  constructor(private http: HttpClient) {}

  getExercices(): Observable<Exercice[]> {
    return this.http
      .get<Exercice[]>(`/api/exercices`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  createExercice(payload: Exercice): Observable<Exercice> {
    return this.http
      .post<Exercice>(`/api/exercices`, payload)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  updateExercice(payload: Exercice): Observable<Exercice> {
    return this.http
      .put<Exercice>(`/api/exercices/${payload._id}`, payload)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  removeExercice(payload: Exercice): Observable<Exercice> {
    return this.http
      .delete<any>(`/api/exercices/${payload._id}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
