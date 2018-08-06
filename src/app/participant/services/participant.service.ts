import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Participant } from '../../model/participant';

@Injectable()
export class ParticipantService {
  constructor(private http: HttpClient) {}

  getParticipants(filter = '', sortOrder = 'asc',
  pageNumber = 0, pageSize = 10): Observable<Participant[]> {
    return this.http
      .get<Participant[]>(`/api/participants`, {
        params: new HttpParams()
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
      })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  getParticipant(payload: string): Observable<Participant[]> {
    return this.http
      .get<Participant[]>(`/api/participants/${payload}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  createParticipant(payload: Participant): Observable<Participant> {
    return this.http
      .post<Participant>(`/api/participants`, payload)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  updateParticipant(payload: Participant): Observable<Participant> {
    return this.http
      .put<Participant>(`/api/participants/${payload._id}`, payload)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  removeParticipant(payload: Participant): Observable<Participant> {
    return this.http
      .delete<any>(`/api/participants/${payload._id}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }


}
