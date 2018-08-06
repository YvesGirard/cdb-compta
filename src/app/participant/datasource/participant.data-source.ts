import { select, Store } from '@ngrx/store';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Participant } from '../../model/participant';

import { catchError, finalize } from 'rxjs/operators';

import * as ParticipantsActions from '../actions/participant.actions';
import * as CollectionActions from '../actions/collection.actions';
import * as fromParticipants from '../reducers';

export class ParticipantDataSource implements DataSource<Participant> {

    private participantsSubject$: Observable<Participant[]>;

    constructor(private store: Store<fromParticipants.State>) {
        this.participantsSubject$ = store.pipe(select(fromParticipants.getParticipantCollection));
    }

    connect(collectionViewer: CollectionViewer): Observable<Participant[]> {
        return this.participantsSubject$;
    }

    disconnect(collectionViewer: CollectionViewer): void {
        //this.membersSubject$.complete();
    }

    loadParticipants(filter = '',
        sortDirection = 'asc', pageIndex = 0, pageSize = 10) {

        this.store.dispatch(new CollectionActions.Load({
            filter: filter,
            sortDirection: sortDirection,
            pageIndex: pageIndex,
            pageSize: pageSize,
        }));
    }

}

