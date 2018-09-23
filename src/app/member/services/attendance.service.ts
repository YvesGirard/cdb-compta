import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'


import { Observable, throwError } from 'rxjs';
import { Attendance } from '../../model/member';

@Injectable()
export class AttendanceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAttendances(filter = '', sortOrder = 'asc', sortField = 'name',
    pageNumber = 0, pageSize = 10, searchField = 'name'): Observable<Attendance[]> {
    return this.http
      .get<Attendance[]>(`/api/members`, {
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

  getAttendance(payload: string): Observable<Attendance[]> {
    return this.http
      .get<Attendance[]>(`/api/members/${payload}`)
      .pipe(catchError((error: any) => throwError(error)));
  }

  getTotalAttendance(filter = '', searchField = 'name'): Observable<number> {
    return this.http
      .get<number>(`/api/members/total`, {
        params: new HttpParams()
          .set('filter', filter)
          .set('sortField', searchField)
      })
      .pipe(catchError((error: any) => throwError(error)));
  }

  createAttendance(payload: Attendance): Observable<Attendance> {
    return this.http
      .post<Attendance>(`/api/members`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateAttendance(payload: Attendance): Observable<Attendance> {
    return this.http
      .put<Attendance>(`/api/members/${payload._id}`,
        payload,
        this.httpOptions)
      .pipe(catchError((error: any) => throwError(error)));
  }

  removeAttendance(payload: Attendance): Observable<Attendance> {
    return this.http
      .delete<any>(`/api/members/${payload._id}`)
      .pipe(catchError((error: any) => throwError(error)));
  }

  public uploadAttendance(formData: FormData): Observable<Object> {
    let uploadAttendanceUrl = '/api/members/upload';

    return this.http
      .post(uploadAttendanceUrl, formData)
      .pipe(catchError((error: any) => throwError(error)));
  }

}

