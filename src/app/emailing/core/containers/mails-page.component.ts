import { ChangeDetectionStrategy, Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, fromEvent } from 'rxjs';

import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MatDialog, PageEvent, MatDialogConfig } from '@angular/material';
import { MailingListAddDialog } from '../components/mailinglist-add-dialog.component';
import { MailinglistsDataSource } from '../datasource/mailinglists.data-source';


import * as MailingListsActions from '../actions/mailinglist.actions';
import * as fromMailingLists from '../reducers';
import { MailingList } from '../../../model/mail';


@Component({
  selector: 'm-mails-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'mails-page.component.html',
  styles: [
    `

  `,
  ],
})
export class MailingListPageComponent implements OnInit, AfterViewInit {
  dataSource$: MailinglistsDataSource;

  displayedColumns = [
    'address',
    'name',
    'description',
    'access_level'
  ];

  @ViewChild('search', {static: true}) search: ElementRef;

  constructor(private store: Store<fromMailingLists.State>, public dialog: MatDialog, ) {

  }


  ngOnInit() {
    this.dataSource$ = new MailinglistsDataSource(this.store);
    //this.dataSource$.loadMailinglists();
}

  ngAfterViewInit(): void {

  }


  gotoDetail(): void {
  }

  ngOnDestroy() {
    //this.actionsSubscription.unsubscribe();
  }

}