import { Component, ChangeDetectionStrategy, OnInit, ViewChild, AfterViewInit, } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AttendanceDataSource } from '../datasource/attendance.data-source';

import * as fromMembers from '../reducers';
import * as CollectionActions from '../actions/collection.actions';
import * as MembersActions from '../actions/member.actions';

import { Member } from '../../model/member';

@Component({
  selector: 'm-selected-member-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <m-member-detail
      [member]="member$ | async"
      (update)="update($event)"
      (remove)="remove($event)">
    </m-member-detail>

    <m-attendance-list [datasource]="dataSource$" [displayedColumns]="displayedColumns">
      <mat-paginator (page)="onPage($event)" [length]="total$ | async"  [pageIndex]="pageIndex$ | async" [pageSize]="pageSize$ | async" [pageSizeOptions]="[10, 50, 100]"></mat-paginator>
    </m-attendance-list>
  `,
})
export class SelectedMemberPageComponent implements OnInit, AfterViewInit {
  member$: Observable<Member>;
  dataSource$: AttendanceDataSource;
  total$: Observable<number>;
  pageIndex$: Observable<number>;
  pageSize$: Observable<number>;

  displayedColumns = ['_id',
    'date',
    'class',
  ];

  constructor(private store: Store<fromMembers.State>) {
    this.member$ = store.pipe(select(fromMembers.getSelectedMember)) as Observable<Member>;

    this.total$ = this.store.pipe(select(fromMembers.getAttendanceCollectionTotal));

    this.pageIndex$ = this.store.pipe(
      select(fromMembers.getAttendanceCollectionQuery),
      map(val => {
        return val.pageIndex;
      }),
    );


    this.pageSize$ = this.store.pipe(
      select(fromMembers.getAttendanceCollectionQuery),
      map(val => {
        return val.pageSize;
      }),
    );
  }

  ngOnInit(): void {
    this.dataSource$ = new AttendanceDataSource(this.store);
  }

  ngAfterViewInit(): void {
    this.dataSource$.loadAttendances();
  }

  update(member: Member) {
    this.store.dispatch(new MembersActions.UpdateMember(member));
  }

  remove(member: Member) {
    this.store.dispatch(new MembersActions.DeleteMember(member));
  }
}