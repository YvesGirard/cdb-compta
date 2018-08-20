import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import * as ParticipantActions from '../../core/participant/actions/participant.actions';
import * as fromParticipantsCollection from '../reducers';
import * as fromParticipants from '../../core/participant/reducers';

/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class ParticipantExistsGuard implements CanActivate {
    constructor(
        private store: Store<fromParticipantsCollection.State>,
        private router: Router
    ) { }

    /**
     * This method checks if a participant with the given ID is already registered
     * in the Store
     */
    hasParticipantInStore(id: string): Observable<boolean> {
        return this.store.pipe(
            select(fromParticipants.getParticipantEntities),
            map(entities => !!entities[id]),
            take(1)
        );
    }

    /**
     * This method loads a participant with the given ID from the API and caches
     * it in the store, returning `true` or `false` if it was found.
     */
    hasParticipantInApi(id: string): Observable<boolean> {
        return this.store.pipe(
            select(fromParticipantsCollection.getCollectionLoaded),
            filter(loaded => loaded),
            take(1),
            switchMap((val) => {
                return this.store.pipe(select(fromParticipants.getParticipantEntities),
                    map(entities => !!entities[id]),
                    take(1)
                )
            }),
        );
    }

    /**
     * `hasParticipant` composes `hasParticipantInStore` and `hasParticipantInApi`. It first checks
     * if the participant is in store, and if not it then checks if it is in the
     * API.
     */
    hasParticipant(id: string): Observable<boolean> {
        return this.hasParticipantInStore(id).pipe(
            switchMap(inStore => {
                if (inStore) {
                    return of(inStore);
                }

                this.store.dispatch(new ParticipantActions.LoadParticipant(id))
                return this.hasParticipantInApi(id);
            })
        );
    }

    // Guard activation de la route :id
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.hasParticipant(route.params['id']);

    }
}