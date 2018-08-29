import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { Exercice } from '../models/exercice';

@Component({
    selector: 'st-exercice-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <mat-list role="list">
        <mat-list-item role="listitem" *ngFor="let exercice of exercices">
        {{ exercice.fiscal_year }} - {{ exercice.begin_dt | date: yyyy }} - {{ exercice.end_dt | date: yyyy }}
        </mat-list-item>
    </mat-list>
  `,
    styles: [
        `

  `,
    ],
})
export class ExercicePreviewListComponent  implements OnInit {
    @Input() exercices: Exercice[];

    constructor() {
    }

    ngOnInit() {
    }
}