import { select, Store } from '@ngrx/store';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MailingList } from '../../../model/mail';

import { catchError, finalize, tap } from 'rxjs/operators';

import * as MailingListsActions from '../actions/mailinglist.actions';
import * as fromMailingLists from '../reducers';

export class MailinglistsDataSource implements DataSource<MailingList> {

    private MailingListsSubject$: Observable<MailingList[]>;

    constructor(private store: Store<fromMailingLists.State>) {
        this.MailingListsSubject$ = this.store.pipe(select(fromMailingLists.getAllMailingLists));
    }

    connect(collectionViewer: CollectionViewer): Observable<MailingList[]> {
        return this.MailingListsSubject$;
    }

    disconnect(collectionViewer: CollectionViewer): void {
        //this.membersSubject$.complete();
    }

    loadMailinglists() {
        this.store.dispatch(new MailingListsActions.LoadMailingList());
    }

}

