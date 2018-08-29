import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';


/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class ParticipantExistsGuard implements CanActivate {
    constructor(
      //  private store: Store<fromParticipantsCollection.State>,
        private router: Router
    ) { }



    // Guard activation de la route :id
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return of(true);

    }
}