import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MailingList } from '../../../model/mail';

@Injectable()
export class MailingListService {
  constructor(private http: HttpClient) {}

  getMailingLists(): Observable<MailingList[]> {
    return this.http
      .get<MailingList[]>(`/api/lists`)
      .pipe(catchError((error: any) => throwError(error)));
  }

  getMailingList(payload: string): Observable<MailingList[]> {
    return this.http
      .get<MailingList[]>(`/api/lists/${payload}`)
      .pipe(catchError((error: any) => throwError(error)));
  }

  getTotalMailingList(filter = '', searchField = 'name'): Observable<number> {
    return this.http
      .get<number>(`/api/lists/total`, {
        params: new HttpParams()
          .set('filter', filter)
          .set('sortField', searchField)
      })
      .pipe(catchError((error: any) => throwError(error)));
  }

  createMailingList(payload: MailingList): Observable<MailingList> {
    return this.http
      .post<MailingList>(`/api/lists`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateMailingList(payload: MailingList): Observable<MailingList> {
    return this.http
      .put<MailingList>(`/api/lists/${payload._id}`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  removeMailingList(payload: MailingList): Observable<MailingList> {
    return this.http
      .delete<any>(`/api/lists/${payload._id}`)
      .pipe(catchError((error: any) => throwError(error)));
  }


}
