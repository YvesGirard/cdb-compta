import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MailingListMember } from '../../../model/mail';

@Injectable()
export class MailingListMemberService {
  constructor(private http: HttpClient) {}

  getMailingListMembers(payload: string): Observable<MailingListMember[]> {
    return this.http
      .get<MailingListMember[]>(`/api/lists/${payload}/members`)
      .pipe(catchError((error: any) => throwError(error)));
  }

  addMailingListMembers(payload: Array<string>): Observable<MailingListMember[]> {
    return this.http
      .put<MailingListMember[]>(`/api/lists/${payload}/members`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

}
