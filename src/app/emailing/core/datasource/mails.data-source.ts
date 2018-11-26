import { select, Store } from '@ngrx/store';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Mail } from '../../../model/mail';

import { catchError, finalize, tap } from 'rxjs/operators';

import * as MailActions from '../actions/mail.collection.actions';
import * as fromMailingLists from '../reducers';

export class MailsDataSource implements DataSource<Mail> {

    private MailSubject$: Observable<Mail[]>;

    constructor(private store: Store<fromMailingLists.State>) {
        this.MailSubject$ = this.store.pipe(select(fromMailingLists.getAllMails));
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

