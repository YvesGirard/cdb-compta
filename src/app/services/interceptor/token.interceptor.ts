import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';


import * as AuthActions from '../auth/actions/auth.actions';
import * as fromAuth from '../auth/reducers';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    // Login obversvable
    loggedIn$: Observable<boolean>;

  constructor(//public auth: AuthService
    private store: Store<fromAuth.State>,
  ) {
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.token}`
      }
    });
    return next.handle(request);
  }
}
