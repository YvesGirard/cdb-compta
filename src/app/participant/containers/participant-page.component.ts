import { ChangeDetectionStrategy, Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, fromEvent } from 'rxjs';

import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MatDialog, PageEvent, MatDialogConfig } from '@angular/material';
import { ParticipantAddDialog } from '../components/participant-add-dialog.component';
import { ParticipantDataSource } from '../datasource/participant.data-source';

import * as ParticipantsActions from '../../core/participant/actions/participant.actions';
import * as fromParticipants from '../reducers';
import { Participant } from '../../model/participant';



const defaultDialogConfig = new MatDialogConfig();


@Component({
  selector: 'p-participant-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'participant-page.component.html',
  styles: [
    `

  `,
  ],
})
export class ParticipantPageComponent implements OnInit, AfterViewInit {
  dataSource$: ParticipantDataSource;
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
    'licence',
    'serie'
  ];

  @ViewChild('search', {static: true}) search: ElementRef;

  constructor(private store: Store<fromParticipants.State>, public dialog: MatDialog, ) {
    this.total$ = this.store.pipe(select(fromParticipants.getCollectionTotal));
    this.pageIndex = 0;
    this.pageSize = 10;
  }


  ngOnInit(): void {
    this.dataSource$ = new ParticipantDataSource(this.store);
    this.dataSource$.loadParticipants();
  }

  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => {
          this.pageIndex = 0;
          this.dataSource$.loadParticipants(
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
    this.dataSource$.loadParticipants(
      this.search.nativeElement.value,
      'asc',
      '',//this.search.nativeElement.value,
      event.pageIndex,
      event.pageSize,
      '',
    );
  }

  create() {
    let dialogRef = this.dialog.open(ParticipantAddDialog, this.config);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.licence !== undefined)
        this.store.dispatch(new ParticipantsActions.AddParticipant(result));
    });
  }

  gotoDetail(): void {
  }

  ngOnDestroy() {
    //this.actionsSubscription.unsubscribe();
  }

}