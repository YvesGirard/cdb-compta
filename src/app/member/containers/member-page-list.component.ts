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
  <m-member-list [datasource]="dataSource$" 
  [displayedColumns]="displayedColumns" 
  [isAllSelected]="isAllSelected$ | async" 
  [isSelected]="isSelected$ | async"
  [_selected]="selected$ | async"
  (masterToggle)="masterToggle($event)"
  (selectedChange)="selectedChange($event)">
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
  isAllSelected$: Observable<boolean>;
  isSelected$: Observable<boolean>;
  selected$: Observable<string[]>;
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

    this.isAllSelected$ = this.store.pipe(
      select(fromMembers.getCollectionisAllSelected),
    );

    this.isSelected$ = this.store.pipe(
      select(fromMembers.getCollectionisSelected),
    );

    this.selected$ = this.store.pipe(
      select(fromMembers.getCollectionSelected),
    );
  }

  get selected(): Array<any> {
    return this._list.selected;
  }

  ngOnInit(): void {
    this.dataSource$ = new MemberDataSource(this.store);
  }

  ngAfterViewInit(): void {
    this.dataSource$.loadMembers();
  }

  search(input: string): void {
    this.store.dispatch(new CollectionActions.Search({
      filter: input,
      searchField: 'name',
    }));
  }

  masterToggle(): void {
    this.store.dispatch(new CollectionActions.SelectAll());
  }

  selectedChange(input: string): void {
    this.store.dispatch(new CollectionActions.Select(input));
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