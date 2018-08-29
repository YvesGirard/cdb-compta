import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromMailinglists from '../reducers';
import * as MailinglistsActions from '../actions/mailinglist.actions';

import { MailingList } from '../../../model/mail';

@Component({
  selector: 'm-selected-mailinglist-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <m-mailinglist-detail
      [mailinglist]="mailinglist$ | async"
      (update)="update($event)"
      (remove)="remove($event)">
    </m-mailinglist-detail>
  `,
})
export class SelectedMailingListPageComponent {
  mailinglist$: Observable<MailingList>;

  constructor(private store: Store<fromMailinglists.State>) {
    this.mailinglist$ = store.pipe(select(fromMailinglists.getSelectedMailingList)) as Observable<MailingList>;
  }

  update(mailinglist: MailingList) {
    this.store.dispatch(new MailinglistsActions.UpdateMailingList(mailinglist));
  }

  remove(mailinglist: MailingList) {
    this.store.dispatch(new MailinglistsActions.DeleteMailingList(mailinglist));
  }
}