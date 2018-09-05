import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'


import { Observable, throwError } from 'rxjs';
import { Member } from '../../model/member';

@Injectable()
export class MemberService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getMembers(filter = '', sortOrder = 'asc', sortField = 'name',
    pageNumber = 0, pageSize = 10, searchField = 'name'): Observable<Member[]> {
    return this.http
      .get<Member[]>(`/api/members`, {
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

  getMember(payload: string): Observable<Member[]> {
    return this.http
      .get<Member[]>(`/api/members/${payload}`)
      .pipe(catchError((error: any) => throwError(error)));
  }

  getTotalMember(filter = '', searchField = 'name'): Observable<number> {
    return this.http
      .get<number>(`/api/members/total`, {
        params: new HttpParams()
          .set('filter', filter)
          .set('sortField', searchField)
      })
      .pipe(catchError((error: any) => throwError(error)));
  }

  createMember(payload: Member): Observable<Member> {
    return this.http
      .post<Member>(`/api/members`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateMember(payload: Member): Observable<Member> {
    console.log("payload")
    console.log(payload)
    return this.http
      .put<Member>(`/api/members/${payload._id}`,
        payload,
        this.httpOptions)
      .pipe(catchError((error: any) => throwError(error)));
  }

  removeMember(payload: Member): Observable<Member> {
    return this.http
      .delete<any>(`/api/members/${payload._id}`)
      .pipe(catchError((error: any) => throwError(error)));
  }

  public uploadFile(formData: FormData): Observable<Object> {
    let uploadMemberUrl = '/api/members/upload';

    return this.http
      .post(uploadMemberUrl, formData)
      .pipe(map((res) => {
        return res['data'];
      }
      ));
  }




}

