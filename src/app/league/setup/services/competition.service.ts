import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Competition } from '../models/competition';

@Injectable()
export class CompetitionService {
  constructor(private http: HttpClient) {}

  getCompetitions(): Observable<Competition[]> {
    return this.http
      .get<Competition[]>(`/api/competitions`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  createCompetition(payload: Competition): Observable<Competition> {
    return this.http
      .post<Competition>(`/api/competitions`, payload)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  updateCompetition(payload: Competition): Observable<Competition> {
    return this.http
      .put<Competition>(`/api/competitions/${payload._id}`, payload)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  removeCompetition(payload: Competition): Observable<Competition> {
    return this.http
      .delete<any>(`/api/competitions/${payload._id}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
