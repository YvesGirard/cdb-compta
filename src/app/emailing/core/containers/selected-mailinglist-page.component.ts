import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  switchMap,
  tap
} from 'rxjs/operators';

import * as fromMailinglists from '../reducers';
import * as MailinglistsActions from '../actions/mailinglist.actions';

import * as MailinglistsMemberActions from '../actions/member.actions';
import { MailinglistsMembersDataSource } from '../datasource/members.data-source';


import { MailingList } from '../../../model/mail';
import { MailingListMember } from '../../../model/mail';

@Component({
  selector: 'm-selected-mailinglist-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <m-mailinglist-detail
      [mailinglist]="mailinglist$ | async"
      (update)="update($event)"
      (remove)="remove($event)">
    </m-mailinglist-detail>
    <a [routerLink]="['/mailing/mailinglist', (mailinglist$ | async)?._id, 'members']">Ajouter des membres</a>
    <m-mailing-lists-members [datasource]="dataSource$">
    </m-mailing-lists-members>
  `,
})
export class SelectedMailingListPageComponent {
  mailinglist$: Observable<MailingList>;
  //mailinglistMembers$: Observable<MailingListMember[]>;
  dataSource$: MailinglistsMembersDataSource;

  constructor(private store: Store<fromMailinglists.State>) {
    this.mailinglist$ = store.pipe(select(fromMailinglists.getSelectedMailingList)) as Observable<MailingList>;

    //this.mailinglistMembers$ = store.pipe(select(fromMailinglists.getAllMailingListsMembers)) as Observable<MailingListMember[]>;

    this.mailinglist$.subscribe(val => {
      if (val)
        this.store.dispatch(new MailinglistsMemberActions.LoadMailingListMember(val.address));
    });

  }

  ngOnInit() {
    this.dataSource$ = new MailinglistsMembersDataSource(this.store);
  }

  update(mailinglist: MailingList) {
    this.store.dispatch(new MailinglistsActions.UpdateMailingList(mailinglist));
  }

  remove(mailinglist: MailingList) {
    this.store.dispatch(new MailinglistsActions.DeleteMailingList(mailinglist));
  }

}