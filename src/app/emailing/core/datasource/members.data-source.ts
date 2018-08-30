import { select, Store } from '@ngrx/store';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MailingListMember } from '../../../model/mail';

import { catchError, finalize, tap, withLatestFrom } from 'rxjs/operators';

import * as MailingListsMembersActions from '../actions/member.actions';
import * as fromMailingLists from '../reducers';

export class MailinglistsMembersDataSource implements DataSource<MailingListMember> {

    private MailingListsMemberSubject$: Observable<MailingListMember[]>;

    constructor(private store: Store<fromMailingLists.State>) {
        this.MailingListsMemberSubject$ = this.store.pipe(select(fromMailingLists.getAllMailingListsMembers));
    }

    connect(collectionViewer: CollectionViewer): Observable<MailingListMember[]> {
        return this.MailingListsMemberSubject$;
    }

    disconnect(collectionViewer: CollectionViewer): void {
        //this.membersSubject$.complete();
    }

}

