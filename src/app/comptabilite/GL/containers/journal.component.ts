import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

//import * as CollectionActions from '../actions/collection.actions';
//import { Book } from '../models/book';
//import * as fromBooks from '../reducers';

@Component({
    selector: 'gl-journal-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
   <!-- <gl-journal-list [journals]="journals$ | async"></gl-journal-list> -->
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
export class JournalComponent implements OnInit {


    constructor() {
    }

    ngOnInit() {
    }
}