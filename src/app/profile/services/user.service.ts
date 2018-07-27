import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../../model/user';

@Injectable()
export class ExerciceService {
  constructor(private http: HttpClient) {}

  updateUser(payload: User): Observable<User> {
    return this.http
      .put<User>(`/api/users/${payload._id}`, payload)
      .pipe(catchError((error: any) => throwError(error.json())));
  }


}
