import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../../model/user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  updateUserProfile(payload: User): Observable<User> {
    return this.http
      .put<User>(`/api/users/${payload.user_id}`, payload)
      .pipe(catchError((error: any) => throwError(error)));
  }


}
