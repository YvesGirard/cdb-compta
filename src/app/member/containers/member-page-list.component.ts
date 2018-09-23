import { ChangeDetectionStrategy, Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, fromEvent } from 'rxjs';

import { tap, debounceTime, distinctUntilChanged, take, map, switchMap } from 'rxjs/operators';

import { MatDialog, PageEvent, MatDialogConfig } from '@angular/material';
import { MemberAddDialog } from '../components/member-add-dialog.component';
import { MemberDataSource } from '../datasource/member.data-source';
import { MemberSearchComponent } from '../components/member-search.component';
import { MemberListComponent } from '../components/member-list.component';

import * as MembersActions from '../actions/member.actions';
import * as CollectionActions from '../actions/collection.actions';
import * as fromMembers from '../reducers';
import { Member } from '../../model/member';
import { SelectionModel } from '@angular/cdk/collections';



const defaultDialogConfig = new MatDialogConfig();


@Component({
  selector: 'm-member-page-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <m-member-search [query]="searchQuery$ | async" (search)="search($event)"></m-member-search>
  <m-member-list [datasource]="dataSource$" [displayedColumns]="displayedColumns">
    <mat-paginator (page)="onPage($event)" [length]="total$ | async"  [pageIndex]="pageIndex$ | async" [pageSize]="pageSize$ | async" [pageSizeOptions]="[10, 50, 100]"></mat-paginator>
  </m-member-list>
  `,
  styles: [
    `

  `,
  ],
})
export class MemberPageListComponent implements OnInit, AfterViewInit {
  @Input() displayedColumns: Array<string>;
  dataSource$: MemberDataSource;
  searchQuery$: Observable<string>;
  total$: Observable<number>;
  pageIndex$: Observable<number>;
  pageSize$: Observable<number>;

  @ViewChild(MemberSearchComponent) _search: MemberSearchComponent;
  @ViewChild(MemberListComponent) _list: MemberListComponent;

  constructor(private store: Store<fromMembers.State>, public dialog: MatDialog, ) {
    this.total$ = this.store.pipe(select(fromMembers.getCollectionTotal));

    this.searchQuery$ = this.store.pipe(
      select(fromMembers.getCollectionQuery),
      map(val => {
        return val.filter;
      }),
    );

    this.pageIndex$ = this.store.pipe(
      select(fromMembers.getCollectionQuery),
      map(val => {
        return val.pageIndex;
      }),
    );


    this.pageSize$ = this.store.pipe(
      select(fromMembers.getCollectionQuery),
      map(val => {
        return val.pageSize;
      }),
    );

  }

  get selected(): Array<any> {
    return this._list.selected;
  }

  ngOnInit(): void {
    this.dataSource$ = new MemberDataSource(this.store);
    //this.dataSource$.loadMembers();
  }

  ngAfterViewInit(): void {
    this.dataSource$.loadMembers(
     /* this._search.value,
      'asc',
      '',//this.search.nativeElement.value,
      this.pageIndex,
      this.pageSize,
    '',*/);
    console.log("this._search.value ngAfterViewInit");
    console.log(this._search.value);

  }

  search(input: string): void {

    this.store.dispatch(new CollectionActions.Search({
      filter: input,
      searchField: 'name',
    }));
  }

  onPage(event: PageEvent) {
    this.store.dispatch(new CollectionActions.Page({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
    }));

  }

  gotoDetail(): void {
  }

  ngOnDestroy() {
    //this.actionsSubscription.unsubscribe();
  }

}