import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Competition } from '../models/competition';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CompetitionAddDialog } from '../components/competition-add-dialog.component';

import * as CompetitionActions from '../store/actions/competition.actions';
//import { Book } from '../models/book';
import * as fromCompetitions from '../store/reducers';

@Component({
    selector: 'st-competition-setup-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="">
	<mat-grid-list cols="2" rowHeight="100px">

		<mat-grid-tile class="flex-left">
			<div class="header">
				<h1>Comptes</h1>
			</div>
		</mat-grid-tile>

		<mat-grid-tile class="flex-right">
			<button mat-raised-button color="warn" (click)="newCompetition()">
				<mat-icon>add</mat-icon>Créer compte
				  </button>
		</mat-grid-tile>
	</mat-grid-list>
        <st-competition-list [competitions]="competitions$ | async"></st-competition-list>
        </div>
  `,
    styles: [
        `

  `,
    ],
})
export class CompetitionPageComponent implements OnInit {
    competitions$: Observable<Competition[]>;

    constructor(private store: Store<fromCompetitions.State>, public dialog: MatDialog,) {
        this.competitions$ = store.pipe(select(fromCompetitions.selectAllCompetitions));
    }

    ngOnInit() {
        this.store.dispatch(new CompetitionActions.LoadCompetitions());
    }

    newCompetition() {
        let dialogRef = this.dialog.open(CompetitionAddDialog, {
            width: '300px',
            data: { }
          });

          dialogRef.afterClosed().subscribe(result => {
            this.store.dispatch(new CompetitionActions.AddCompetition(result));
          });
    }
}