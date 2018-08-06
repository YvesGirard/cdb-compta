import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Participant } from '../../model/participant';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
//import { ParticipantAddDialog } from '../components/participant-add-dialog.component';
import { ParticipantDataSource } from '../datasource/participant.data-source';
import * as ParticipantsActions from '../actions/participant.actions';
import * as CollectionActions from '../actions/collection.actions';
import * as fromParticipants from '../reducers';

@Component({
    selector: 'p-participant-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="">
	<mat-grid-list cols="2" rowHeight="100px">

		<mat-grid-tile class="flex-left">
			<div class="header">
				<h1>Participants</h1>
			</div>
		</mat-grid-tile>

		<mat-grid-tile class="flex-right">
			<button mat-raised-button color="warn" (click)="new()">
				<mat-icon>add</mat-icon>Créer participant
				  </button>
		</mat-grid-tile>
	</mat-grid-list>
        <p-participant-list [participants]="participants$ | async"></p-participant-list>
        </div>
  `,
    styles: [
        `

  `,
    ],
})
export class AccountPageComponent implements OnInit {
    dataSource: ParticipantDataSource;

    constructor(private store: Store<fromParticipants.State>, public dialog: MatDialog,) {
        
    }


  ngOnInit(): void {
    this.dataSource = new ParticipantDataSource(this.store);
    this.dataSource.loadMembers();
    this.dataSource.count$.subscribe((data) => {
      if (this.membersCount != data)
            this.membersCount = data;
      //this.paginator.pageIndex = 0;
    });

    /*this.dataSource.loading$.subscribe((data) => {
      this.loadingService.loadingSubject.next(data);
    });*/   

    this.membersCount = this.route.snapshot.data["membersCount"];
  }
    
    newAccount() {
     /*   let dialogRef = this.dialog.open(AccountAddDialog, {
            width: '300px',
            data: { }
          });

          dialogRef.afterClosed().subscribe(result => {
            this.store.dispatch(new AccountActions.AddAccount(result));
          });*/
    }
}