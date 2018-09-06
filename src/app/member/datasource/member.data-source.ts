import { select, Store } from '@ngrx/store';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Member } from '../../model/member';

import { catchError, finalize, tap } from 'rxjs/operators';

import * as MembersActions from '../../core/participant/actions/participant.actions';
import * as CollectionActions from '../actions/collection.actions';
import * as fromMembers from '../reducers';

export class MemberDataSource implements DataSource<Member> {

    private participantsSubject$: Observable<Member[]>;

    constructor(private store: Store<fromMembers.State>) {
        this.participantsSubject$ = this.store.pipe(select(fromMembers.getMemberCollection),
           // tap((prt) => console.log(prt)),
        );

    }

    connect(collectionViewer: CollectionViewer): Observable<Member[]> {
        return this.participantsSubject$;
    }

    disconnect(collectionViewer: CollectionViewer): void {
        //this.membersSubject$.complete();
    }

    loadMembers(filter = '', sortOrder = 'asc', sortField = 'name',
    pageNumber = 0, pageSize = 10, searchField = 'name') {
        console.log(pageNumber)
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

