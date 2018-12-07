import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  switchMap,
  tap
} from 'rxjs/operators';

import * as fromMails from '../reducers';
import * as MailsActions from '../actions/mail.actions';

import * as MailsMemberActions from '../actions/member.actions';
import { MailsDataSource } from '../datasource/mails.data-source';

import { Mail } from '../../../model/mail';
import { MailingList } from '../../../model/mail';
import * as MailCollectionActions from '../actions/mail.collection.actions';
import * as fromMailingLists from '../reducers';

@Component({
  selector: 'm-selected-mail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <m-mail-detail
      [mail]="mail$ | async"
      [mailingLists]="MailingLists$ | async"
      (update)="update($event)"
      (remove)="remove($event)">
    </m-mail-detail>
  `,
})
export class SelectedMailPageComponent {
  mail$: Observable<Mail>;
  MailingLists$: Observable<MailingList[]>;

  constructor(private store: Store<fromMails.State>) {
    this.mail$ = store.pipe(select(fromMails.getSelectedMail)) as Observable<Mail>;
    this.MailingLists$ = store.pipe(select(fromMailingLists.getAllMailingLists));
  }

  update(mail: Mail) {
    this.store.dispatch(new MailsActions.UpdateMail(mail));
  }

  remove(mail: Mail) {
    this.store.dispatch(new MailsActions.DeleteMail(mail));
  }

}