import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

//import * as CollectionActions from '../actions/collection.actions';
//import { Book } from '../models/book';
//import * as fromBooks from '../reducers';

@Component({
    selector: 'core-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <mat-drawer-container class="core-container">
        <mat-drawer mode="side" opened="true"><a routerLink="mailinglist" class="" routerLinkActive="active">Listes de diffusion</a></mat-drawer>
        <mat-drawer-content><router-outlet></router-outlet></mat-drawer-content>
    </mat-drawer-container>
  `,
    /**
     * Container components are permitted to have just enough styles
     * to bring the view together. If the number of styles grow,
     * consider breaking them out into presentational
     * components.
     */
    styles: [
        `
    .core-container {
        display: flex;
      }
      .core-container mat-drawer {
        display: flex;
        overflow-y: initial;
        flex: 1;
        position:relative;
      }
      .core-container mat-drawer-content {
        display: block;
        position:relative;
        width: 100%;
      }
  `,
    ],
})
export class CoreComponent implements OnInit {
    //books$: Observable<Book[]>;

    constructor() {
    }

    ngOnInit() {
    }
}