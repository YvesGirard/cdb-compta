import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable ,  of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import * as MailActions from '../actions/mail.actions';
import * as fromMails from '../reducers';

/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class MailExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromMails.State>,
    private router: Router
  ) {}

  checkStore(): Observable<boolean> {
    return this.store.select(fromMails.getCounterLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new MailActions.Count());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a book from the API or if we already have it in our cache.
   * If it finds it in the cache or in the API, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
}