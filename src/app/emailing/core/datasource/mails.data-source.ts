import { select, Store } from '@ngrx/store';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Mail } from '../../../model/mail';

import { catchError, finalize, tap } from 'rxjs/operators';

import * as MailCollectionActions from '../actions/mail.collection.actions';
import * as fromMailingLists from '../reducers';

export class MailsDataSource implements DataSource<Mail> {

    private MailSubject$: Observable<Mail[]>;

    constructor(private store: Store<fromMailingLists.State>) {
        this.MailSubject$ = this.store.pipe(select(fromMailingLists.getMailCollection));
    }

    connect(collectionViewer: CollectionViewer): Observable<Mail[]> {
        return this.MailSubject$;
    }

    disconnect(collectionViewer: CollectionViewer): void {
        //this.membersSubject$.complete();
    }

    loadMails(filter = '', sortOrder = 'asc', sortField = 'name',
    pageNumber = 0, pageSize = 10, searchField = 'name') {
        this.store.dispatch(new MailCollectionActions.Load({
            filter: filter,
            sortOrder: sortOrder,
            sortField: sortField,
            pageNumber: pageNumber,
            pageSize: pageSize,
            searchField: searchField,
        }));
    }

}

