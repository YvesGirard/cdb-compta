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
    <mat-sidenav-container class="example-container" *ngIf="shouldRun">
        <mat-sidenav mode="side" opened><a routerLink="/setup" class="" routerLinkActive="active">Account</a></mat-sidenav>
        <mat-sidenav-content><router-outlet></router-outlet></mat-sidenav-content>
    </mat-sidenav-container>
  `,
    /**
     * Container components are permitted to have just enough styles
     * to bring the view together. If the number of styles grow,
     * consider breaking them out into presentational
     * components.
     */
    styles: [
        `
    mat-sidenav-container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #eee;
      }
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