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



const defaultDialogConfig = new MatDialogConfig();


@Component({
  selector: 'm-mailinglists-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'mailinglists-page.component.html',
  styles: [
    `

  `,
  ],
})
export class MailingListPageComponent implements OnInit, AfterViewInit {
  dataSource$: MailinglistsDataSource;

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

  displayedColumns = [
    'address',
    'name',
    'description',
    'access_level'
  ];

  @ViewChild('search') search: ElementRef;

  constructor(private store: Store<fromMailingLists.State>, public dialog: MatDialog, ) {

  }


  ngOnInit() {
    this.dataSource$ = new MailinglistsDataSource(this.store);
    //this.dataSource$.loadMailinglists();
}

  ngAfterViewInit(): void {
   /* fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => {
          this.pageIndex = 0;
          this.dataSource$.loadMailingLists(
            this.search.nativeElement.value,
            'asc',
            '',
            this.pageIndex,
            this.pageSize,
            '',
          );
        })
      ).subscribe();*/
  }

  create() {
    let dialogRef = this.dialog.open(MailingListAddDialog, this.config);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.licence !== undefined)
        this.store.dispatch(new MailingListsActions.AddMailingList(result));
    });
  }

  gotoDetail(): void {
  }

  ngOnDestroy() {
    //this.actionsSubscription.unsubscribe();
  }

}