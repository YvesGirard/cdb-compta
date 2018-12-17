import { ChangeDetectionStrategy, Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, fromEvent } from 'rxjs';

import { tap, debounceTime, distinctUntilChanged, take, map, switchMap } from 'rxjs/operators';

import { MatDialog, PageEvent, MatDialogConfig } from '@angular/material';

import { MailsDataSource } from '../datasource/mails.data-source';
import { MailSearchComponent } from '../components/mail-search.component';
import { MailListComponent } from '../components/mail-list.component';

import * as MailsActions from '../actions/mail.actions';
import * as MailCollectionActions from '../actions/mail.collection.actions';
import * as fromMails from '../reducers';
import { Mail } from '../../../model/mail';

import { SelectionModel } from '@angular/cdk/collections';



const defaultDialogConfig = new MatDialogConfig();


@Component({
  selector: 'm-mail-page-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <m-mail-search [query]="searchQuery$ | async" (search)="search($event)"></m-mail-search>
  <m-mail-list [datasource]="dataSource$" (send)="send($event)"
  [displayedColumns]="displayedColumns">
    <mat-paginator (page)="onPage($event)" [length]="total$ | async"  [pageIndex]="pageIndex$ | async" [pageSize]="pageSize$ | async" [pageSizeOptions]="[10, 50, 100]"></mat-paginator>
  </m-mail-list>
  `,
  styles: [
    `

  `,
  ],
})
export class MailPageListComponent implements OnInit, AfterViewInit {
  @Input() displayedColumns: Array<string>;
  dataSource$: MailsDataSource;
  searchQuery$: Observable<string>;
  total$: Observable<number>;
  pageIndex$: Observable<number>;
  pageSize$: Observable<number>;

  @ViewChild(MailSearchComponent) _search: MailSearchComponent;
  @ViewChild(MailListComponent) _list: MailListComponent;

  constructor(private store: Store<fromMails.State>, public dialog: MatDialog, ) {
    this.total$ = this.store.pipe(select(fromMails.getMailCollectionTotal));

    this.searchQuery$ = this.store.pipe(
      select(fromMails.getMailCollectionQuery),
      map(val => {
        return val.filter;
      }),
    );

    this.pageIndex$ = this.store.pipe(
      select(fromMails.getMailCollectionQuery),
      map(val => {
        return val.pageIndex;
      }),
    );

    this.pageSize$ = this.store.pipe(
      select(fromMails.getMailCollectionQuery),
      map(val => {
        return val.pageSize;
      }),
    );

  }


  ngOnInit(): void {
    this.dataSource$ = new MailsDataSource(this.store);
  }

  ngAfterViewInit(): void {
    this.dataSource$.loadMails();
  }

  search(input: string): void {
    this.store.dispatch(new MailCollectionActions.Search({
      filter: input,
      searchField: 'name',
    }));
  }

  onPage(event: PageEvent) {
    this.store.dispatch(new MailCollectionActions.Page({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
    }));
  }

  gotoDetail(): void {
  }

  ngOnDestroy() {
    //this.actionsSubscription.unsubscribe();
  }

  send(mail: Mail) {
    this.store.dispatch(new MailsActions.SendMail(mail));
  }

}