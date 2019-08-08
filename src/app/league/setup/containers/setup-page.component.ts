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
    <div class="setup-page">
        <mat-tab-group>
            <mat-tab label="Competition">
                <st-competition-setup-page></st-competition-setup-page>
            </mat-tab>
            <mat-tab label="????">
        </mat-tab>
        </mat-tab-group>
    </div>
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

    constructor() {
    }

    ngOnInit() {
    }
}