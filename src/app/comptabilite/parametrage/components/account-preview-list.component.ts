import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

//import * as CollectionActions from '../actions/collection.actions';
//import { Book } from '../models/book';
//import * as fromBooks from '../reducers';

@Component({
    selector: 'st-account-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <mat-list role="list">
        <mat-list-item role="listitem" *ngFor="let account of accounts">
        {{ account.account_id }} - {{ account.descr }}
        </mat-list-item>
    </mat-list>
  `,
    styles: [
        `

  `,
    ],
})
export class AccountPreviewListComponent  implements OnInit {
    @Input() accounts: Account[];

    constructor() {
    }

    ngOnInit() {
    }
}