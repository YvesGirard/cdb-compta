import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Competition } from '../models/competition';

//import * as CollectionActions from '../actions/collection.actions';
//import { Book } from '../models/book';
//import * as fromBooks from '../reducers';

@Component({
    selector: 'st-competition-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <mat-list role="list">
        <mat-list-item role="listitem" *ngFor="let competition of competitions">
        {{ competition.descr }}
        </mat-list-item>
    </mat-list>
  `,
    styles: [
        `

  `,
    ],
})
export class CompetitionPreviewListComponent  implements OnInit {
    @Input() competitions: Competition[];

    constructor() {
    }

    ngOnInit() {
    }
}