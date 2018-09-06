import { ChangeDetectionStrategy, Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, fromEvent } from 'rxjs';

import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MatDialog, PageEvent, MatDialogConfig } from '@angular/material';
import { MemberAddDialog } from '../components/member-add-dialog.component';
import { MemberDataSource } from '../datasource/member.data-source';
import { MemberSearchComponent } from '../components/member-search.component';
import { MemberListComponent } from '../components/member-list.component';

import * as MembersActions from '../actions/member.actions';
import * as fromMembers from '../reducers';
import { Member } from '../../model/member';
import { SelectionModel } from '@angular/cdk/collections';



const defaultDialogConfig = new MatDialogConfig();


@Component({
  selector: 'm-member-page-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <m-member-search (search)="search($event)"></m-member-search>
  <m-member-list [datasource]="dataSource$" [displayedColumns]="displayedColumns">
    <mat-paginator (page)="onPage($event)" [length]="total$ | async"  [(pageIndex)]="pageIndex" [(pageSize)]="pageSize" [pageSizeOptions]="[10, 50, 100]"></mat-paginator>
  </m-member-list>
  `,
  styles: [
    `

  `,
  ],
})
export class MemberPageListComponent implements OnInit {
  @Input() displayedColumns: Array<string>;
  dataSource$: MemberDataSource;
  total$: Observable<number>;
  pageIndex: number;
  pageSize: number;

  @ViewChild(MemberSearchComponent) _search: MemberSearchComponent;
  @ViewChild(MemberListComponent) _list: MemberListComponent;

  constructor(private store: Store<fromMembers.State>, public dialog: MatDialog, ) {
    this.total$ = this.store.pipe(select(fromMembers.getCollectionTotal));
    this.pageIndex = 0;
    this.pageSize = 10;
  }

  get selected(): Array<any> {
    return this._list.selected;
  }

  ngOnInit(): void {
    this.dataSource$ = new MemberDataSource(this.store);
    this.dataSource$.loadMembers();
  }

  search(input: string): void {

    this.pageIndex = 0;

    this.dataSource$.loadMembers(
      input,
      'asc',
      '',
      this.pageIndex,
      this.pageSize,
      '',
    );
  }

  onPage(event: PageEvent) {
    this.dataSource$.loadMembers(
      this._search.value,
      'asc',
      '',//this.search.nativeElement.value,
      event.pageIndex,
      event.pageSize,
      '',
    );
  }

  gotoDetail(): void {
  }

  ngOnDestroy() {
    //this.actionsSubscription.unsubscribe();
  }

}