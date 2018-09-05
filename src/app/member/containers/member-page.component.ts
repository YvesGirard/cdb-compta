import { ChangeDetectionStrategy, Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, fromEvent } from 'rxjs';

import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MatDialog, PageEvent, MatDialogConfig } from '@angular/material';
import { MemberAddDialog } from '../components/member-add-dialog.component';
import { MemberDataSource } from '../datasource/member.data-source';

import * as MembersActions from '../actions/member.actions';
import * as fromMembers from '../reducers';
import { Member } from '../../model/member';



const defaultDialogConfig = new MatDialogConfig();


@Component({
  selector: 'm-member-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'member-page.component.html',
  styles: [
    `

  `,
  ],
})
export class MemberPageComponent implements OnInit, AfterViewInit {
  dataSource$: MemberDataSource;
  total$: Observable<number>;
  pageIndex: number;
  pageSize: number;

  config = {
    disableClose: false,
   // panelClass: 'custom-overlay-pane-class',
   // hasBackdrop: true,
   // backdropClass: '',
    width: '',
    height: '',
    minWidth: '',
    minHeight: '',
    maxWidth: defaultDialogConfig.maxWidth,
    maxHeight: '',
  };

  displayedColumns = ['_id',
    'given_name',
    'family_name',
    'email'
  ];

  @ViewChild('search') search: ElementRef;

  constructor(private store: Store<fromMembers.State>, public dialog: MatDialog, ) {
    this.total$ = this.store.pipe(select(fromMembers.getCollectionTotal));
    this.pageIndex = 0;
    this.pageSize = 10;
  }


  ngOnInit(): void {
    this.dataSource$ = new MemberDataSource(this.store);
    this.dataSource$.loadMembers();
  }

  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => {
          this.pageIndex = 0;
          this.dataSource$.loadMembers(
            this.search.nativeElement.value,
            'asc',
            '',
            this.pageIndex,
            this.pageSize,
            '',
          );
        })
      ).subscribe();
  }

  onPage(event: PageEvent) {
    this.dataSource$.loadMembers(
      this.search.nativeElement.value,
      'asc',
      '',//this.search.nativeElement.value,
      event.pageIndex,
      event.pageSize,
      '',
    );
  }

  create() {
    let dialogRef = this.dialog.open(MemberAddDialog, this.config);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.licence !== undefined)
        this.store.dispatch(new MembersActions.AddMember(result));
    });
  }

  gotoDetail(): void {
  }

  ngOnDestroy() {
    //this.actionsSubscription.unsubscribe();
  }

}