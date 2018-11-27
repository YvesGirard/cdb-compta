import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MailingList } from '../../../model/mail';
import { Mail } from '../../../model/mail';

@Injectable()
export class MailingListService {
  constructor(private http: HttpClient) { }
  /* MAIL */
  getMails(filter = '', sortOrder = 'asc', sortField = 'name',
  pageNumber = 0, pageSize = 10, searchField = 'name'): Observable<Mail[]> {

    return this.http.get<Mail[]>(`/api/mails`, {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('sortField', sortField)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .set('searchField', searchField)
    }).pipe(catchError((error: any) => throwError(error)));

  }

  getTotalMails(filter = '', searchField = 'name'): Observable<number> {
    return this.http
      .get<number>(`/api/mails/total`, {
        params: new HttpParams()
          .set('filter', filter)
          .set('sortField', searchField)
      })
      .pipe(catchError((error: any) => throwError(error)));
  }

  getMail(payload: string): Observable<Mail> {
    return this.http.get<Mail>(`/api/mails/${payload}`)
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateMail(payload: Mail): Observable<Mail> {
    return this.http
      .put<Mail>(`/api/mails`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  send(payload: Mail): Observable<Mail> {
    return this.http
      .post<Mail>(`/api/mails/send`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  
  /* MAILING LISTS */
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
