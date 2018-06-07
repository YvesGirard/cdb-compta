import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

import * as AccountActions from '../store/actions/account.actions';
//import { Book } from '../models/book';
import * as fromAccounts from '../store/reducers';

@Component({
    selector: 'st-account-setup-page',
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
			<button mat-raised-button color="warn" (click)="openDialog()">
				<mat-icon>add</mat-icon>Créer adhérent
				  </button>
		</mat-grid-tile>
	</mat-grid-list>
        <st-account-list [accounts]="accounts$ | async"></st-account-list>
        </div>
  `,
    styles: [
        `

  `,
    ],
})
export class AccountPageComponent implements OnInit {
    accounts$: Observable<Account[]>;

    constructor(private store: Store<fromAccounts.State>) {
        this.accounts$ = store.pipe(select(fromAccounts.selectAllAccounts));
    }

    ngOnInit() {
        this.store.dispatch(new AccountActions.LoadAccounts());
    }
}