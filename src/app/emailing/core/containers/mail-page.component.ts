import { ChangeDetectionStrategy, Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, fromEvent } from 'rxjs';

import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MatDialog, PageEvent, MatDialogConfig } from '@angular/material';
import { MailsDataSource } from '../datasource/mails.data-source';

import * as MailsActions from '../actions/mail.actions';
import * as fromMails from '../reducers';
import { Mail } from '../../../model/mail';



const defaultDialogConfig = new MatDialogConfig();


@Component({
  selector: 'm-mail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'mail-page.component.html',
  styles: [
    `

  `,
  ],
})
export class MailPageComponent {

  displayedColumns = ['_id',
    'from',
    'to',
    'subject',
    'html',
    'action',
  ];


  constructor(private store: Store<fromMails.State>) {

  }

  gotoDetail(): void {
  }

  ngOnDestroy() {
    //this.actionsSubscription.unsubscribe();
  }


}