import { select, Store } from '@ngrx/store';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Participant } from '../../model/participant';

import { catchError, finalize, tap } from 'rxjs/operators';

import * as ParticipantsActions from '../actions/participant.actions';
import * as CollectionActions from '../actions/collection.actions';
import * as fromParticipants from '../reducers';

export class ParticipantDataSource implements DataSource<Participant> {

    private participantsSubject$: Observable<Participant[]>;

    constructor(private store: Store<fromParticipants.State>) {
        this.participantsSubject$ = this.store.pipe(select(fromParticipants.getParticipantCollection),
           // tap((prt) => console.log(prt)),
        );

    }

    connect(collectionViewer: CollectionViewer): Observable<Participant[]> {
        return this.participantsSubject$;
    }

    disconnect(collectionViewer: CollectionViewer): void {
        //this.membersSubject$.complete();
    }

    loadParticipants(filter = '', sortOrder = 'asc', sortField = 'name',
    pageNumber = 0, pageSize = 10, searchField = 'name') {

        this.store.dispatch(new CollectionActions.Load({
            filter: filter,
            sortOrder: sortOrder,
            sortField: sortField,
            pageNumber: pageNumber,
            pageSize: pageSize,
            searchField: searchField,
        }));
    }

}

