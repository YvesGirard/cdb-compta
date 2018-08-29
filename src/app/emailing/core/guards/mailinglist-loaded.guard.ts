import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import * as MailingListActions from '../actions/mailinglist.actions';
import * as fromMailinglist from '../reducers';

/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class MailingListLoadedGuard implements CanActivate {
    constructor(
        private store: Store<fromMailinglist.State>,
        private router: Router
    ) { }

    /**
     * This method loads a participant with the given ID from the API and caches
     * it in the store, returning `true` or `false` if it was found.
     */
    hasMailiglistInStore(): Observable<boolean> {
        return this.store.pipe(
            select(fromMailinglist.getMailinglistLoaded),
            filter(loaded => loaded),
            take(1),
        );
    }

    /**
     * `hasParticipant` composes `hasParticipantInStore` and `hasParticipantInApi`. It first checks
     * if the participant is in store, and if not it then checks if it is in the
     * API.
     */
    mailinglistLoaded(): Observable<boolean> {
        return this.store.select(fromMailinglist.getMailinglistLoaded).pipe(
            switchMap(loaded => {
                if (loaded) {
                    return of(loaded);
                }

                this.store.dispatch(new MailingListActions.LoadMailingList());
                return this.hasMailiglistInStore();
            })
        );

    }

    // Guard activation de la route :id
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.mailinglistLoaded();

    }
}