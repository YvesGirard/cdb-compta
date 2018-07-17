import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';

import * as fromAuth from '../../auth/reducers';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(//public auth: AuthService
    private store: Store<fromAuth.State>,
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.store.pipe(select(fromAuth.getToken))
      .take(1)
      .switchMap(token => {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);

        return next.handle(request);
      });

  }
}
