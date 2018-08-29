import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Journal } from '../models/journal';

@Injectable()
export class JournalService {
  constructor(private http: HttpClient) {}

  getJournals(): Observable<Journal[]> {
    return this.http
      .get<Journal[]>(`/api/journals`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  createJournal(payload: Journal): Observable<Journal> {
    return this.http
      .post<Journal>(`/api/journals`, payload)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  updateJournal(payload: Journal): Observable<Journal> {
    return this.http
      .put<Journal>(`/api/journals/${payload._id}`, payload)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  removeJournal(payload: Journal): Observable<Journal> {
    return this.http
      .delete<any>(`/api/journals/${payload._id}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
