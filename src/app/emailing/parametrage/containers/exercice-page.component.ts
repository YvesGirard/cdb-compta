import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Exercice } from '../models/exercice';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExerciceAddDialog } from '../components/exercice-add-dialog.component';

import * as ExerciceActions from '../store/actions/exercice.actions';
//import { Book } from '../models/book';
import * as fromExercices from '../store/reducers';

@Component({
    selector: 'st-exercice-setup-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="">
	<mat-grid-list cols="2" rowHeight="100px">

		<mat-grid-tile class="flex-left">
			<div class="header">
				<h1>Exercices</h1>
			</div>
		</mat-grid-tile>

		<mat-grid-tile class="flex-right">
			<button mat-raised-button color="warn" (click)="newExercice()">
				<mat-icon>add</mat-icon>Créer exercice
				  </button>
		</mat-grid-tile>
	</mat-grid-list>
        <st-exercice-list [exercices]="exercices$ | async"></st-exercice-list>
        </div>
  `,
    styles: [
        `

  `,
    ],
})
export class ExercicePageComponent implements OnInit {
    exercices$: Observable<Exercice[]>;

    constructor(private store: Store<fromExercices.State>, public dialog: MatDialog,) {
        this.exercices$ = store.pipe(select(fromExercices.selectAllExercices));
    }

    ngOnInit() {
        this.store.dispatch(new ExerciceActions.LoadExercices());
    }

    newExercice() {
        let dialogRef = this.dialog.open(ExerciceAddDialog, {
            width: '300px',
            data: { }
          });

          dialogRef.afterClosed().subscribe(result => {
            this.store.dispatch(new ExerciceActions.AddExercice(result));
          });
    }
}