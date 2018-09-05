import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import * as MemberActions from '../actions/member.actions';
import * as fromMembers from '../reducers';

/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class MemberExistsGuard implements CanActivate {
    constructor(
        private store: Store<fromMembers.State>,
        private router: Router
    ) { }

    /**
     * This method checks if a participant with the given ID is already registered
     * in the Store
     */
    hasMemberInStore(id: string): Observable<boolean> {
        return this.store.pipe(
            select(fromMembers.getMemberEntities),
            map(entities => !!entities[id]),
            take(1)
        );
    }

    /**
     * This method loads a participant with the given ID from the API and caches
     * it in the store, returning `true` or `false` if it was found.
     */
    hasMemberInApi(id: string): Observable<boolean> {
        return this.store.pipe(
            select(fromMembers.getCollectionLoaded),
            filter(loaded => loaded),
            take(1),
            switchMap((val) => {
                return this.store.pipe(select(fromMembers.getMemberEntities),
                    map(entities => !!entities[id]),
                    take(1)
                )
            }),
        );
    }

    /**
     * `hasMember` composes `hasMemberInStore` and `hasMemberInApi`. It first checks
     * if the participant is in store, and if not it then checks if it is in the
     * API.
     */
    hasMember(id: string): Observable<boolean> {
        return this.hasMemberInStore(id).pipe(
            switchMap(inStore => {
                if (inStore) {
                    return of(inStore);
                }

                this.store.dispatch(new MemberActions.LoadMember(id))
                return this.hasMemberInApi(id);
            })
        );
    }

    // Guard activation de la route :id
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.hasMember(route.params['id']);

    }
}