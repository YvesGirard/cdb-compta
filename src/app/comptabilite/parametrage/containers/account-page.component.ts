import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

//import * as CollectionActions from '../actions/collection.actions';
//import { Book } from '../models/book';
//import * as fromBooks from '../reducers';

@Component({
    selector: 'st-account-setup-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <st-account-list [accounts]="accounts$ | async"></st-account-list>
  `,
    styles: [
        `

  `,
    ],
})
export class AccountPageComponent implements OnInit {
    accounts$: Observable<Account[]>;

    constructor() {
    }

    ngOnInit() {
    }
}