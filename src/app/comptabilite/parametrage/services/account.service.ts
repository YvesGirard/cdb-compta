import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Account } from '../models/account';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http
      .get<Account[]>(`/api/Accounts`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createAccount(payload: Account): Observable<Account> {
    return this.http
      .post<Account>(`/api/Accounts`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateAccount(payload: Account): Observable<Account> {
    return this.http
      .put<Account>(`/api/Accounts/${payload._id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  removeAccount(payload: Account): Observable<Account> {
    return this.http
      .delete<any>(`/api/Accounts/${payload._id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
