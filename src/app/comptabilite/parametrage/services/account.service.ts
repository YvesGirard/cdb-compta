import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Account } from '../models/account';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http
      .get<Account[]>(`/api/accounts`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  createAccount(payload: Account): Observable<Account> {
    return this.http
      .post<Account>(`/api/accounts`, payload)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  updateAccount(payload: Account): Observable<Account> {
    return this.http
      .put<Account>(`/api/accounts/${payload._id}`, payload)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  removeAccount(payload: Account): Observable<Account> {
    return this.http
      .delete<any>(`/api/accounts/${payload._id}`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
