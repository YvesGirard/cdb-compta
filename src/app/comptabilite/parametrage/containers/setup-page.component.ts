import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

//import * as CollectionActions from '../actions/collection.actions';
//import { Book } from '../models/book';
//import * as fromBooks from '../reducers';

@Component({
    selector: 'setup-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <mat-tab-group>
        <mat-tab label="Comptes">
            <st-account-setup-page></st-account-setup-page>
        </mat-tab>
    </mat-tab-group>
  `,
    /**
     * Container components are permitted to have just enough styles
     * to bring the view together. If the number of styles grow,
     * consider breaking them out into presentational
     * components.
     */
    styles: [
        `

  `,
    ],
})
export class SetupPageComponent implements OnInit {
    //books$: Observable<Book[]>;

    constructor() {
    }

    ngOnInit() {
    }
}