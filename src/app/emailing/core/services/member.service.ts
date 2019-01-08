import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MailingListMember } from '../../../model/mail';

@Injectable()
export class MailingListMemberService {
  constructor(private http: HttpClient) { }

  getMailingListMembers(payload: string): Observable<MailingListMember[]> {
    return this.http
      .get<MailingListMember[]>(`/api/lists/${payload}/members`)
      .pipe(catchError((error: any) => throwError(error)));
  }

  addMailingListMembers(payload: any): Observable<MailingListMember[]> {
    return this.http
      .put<MailingListMember[]>(`/api/lists/${payload.address}/members`, payload.members)
      .pipe(catchError((error: any) => throwError(error)));
  }

  removeMailingListMembers(payload: any): Observable<MailingListMember[]> {
    return this.http.request<any>('delete', `/api/lists/${payload.address}/members`, { body: payload.members })
      .pipe(catchError((error: any) => throwError(error)));
  }

}
