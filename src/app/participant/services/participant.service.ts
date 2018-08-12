import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Participant } from '../../model/participant';

@Injectable()
export class ParticipantService {
  constructor(private http: HttpClient) {}

  getParticipants(filter = '', sortOrder = 'asc', sortField = 'name',
  pageNumber = 0, pageSize = 10, searchField = 'name'): Observable<Participant[]> {
    return this.http
      .get<Participant[]>(`/api/participants`, {
        params: new HttpParams()
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('sortField', sortField)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
          .set('searchField', searchField)

      })
      .pipe(catchError((error: any) => throwError(error)));
  }

  getParticipant(payload: string): Observable<Participant[]> {
    return this.http
      .get<Participant[]>(`/api/participants/${payload}`)
      .pipe(catchError((error: any) => throwError(error)));
  }

  getTotalParticipant(filter = '', searchField = 'name'): Observable<number> {
    return this.http
      .get<number>(`/api/participants/total`, {
        params: new HttpParams()
          .set('filter', filter)
          .set('sortField', searchField)
      })
      .pipe(catchError((error: any) => throwError(error)));
  }

  createParticipant(payload: Participant): Observable<Participant> {
    return this.http
      .post<Participant>(`/api/participants`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateParticipant(payload: Participant): Observable<Participant> {
    return this.http
      .put<Participant>(`/api/participants/${payload._id}`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  removeParticipant(payload: Participant): Observable<Participant> {
    return this.http
      .delete<any>(`/api/participants/${payload._id}`)
      .pipe(catchError((error: any) => throwError(error)));
  }


}
