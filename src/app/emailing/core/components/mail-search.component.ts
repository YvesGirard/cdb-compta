import {
    Component, Input, Output, EventEmitter, OnChanges,
    SimpleChanges, AfterViewInit, ViewChild, ElementRef,
} from '@angular/core';
import { Mail } from '../../../model/mail';

import {
    FormControl,
    FormGroup,
    FormArray,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { Observable, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'm-mail-search',
    template: `
    <mat-grid-list cols="1" rowHeight="100px">
        <mat-grid-tile class="flex-left">
            <span class="search-area">
                <i class="icon-budicon-489"></i>
                <input  class="js-user-input user-input" type="text" [value]="query" placeholder="Recherche" spellcheck="false" #search>
            </span>
            <span class="controls pull-right">
                <button type="reset">
                    Reset
                    <i class="icon-budicon-471"></i>
                </button>
            </span>
        </mat-grid-tile>
    </mat-grid-list>
    `,
    styles: [
        `
  
    `,
    ],
})
export class MailSearchComponent implements AfterViewInit {

    @ViewChild('search') _search: ElementRef;
    @Input() query = '';

    constructor() {
    }

    @Output() search = new EventEmitter<string>();
    
    get value(): any { return this._search.nativeElement.value; };

    ngAfterViewInit(): void {
        fromEvent(this._search.nativeElement, 'keyup')
          .pipe(
            debounceTime(200),
            distinctUntilChanged(),
            tap(() => {
                this.search.emit(this._search.nativeElement.value);
            })
          ).subscribe();
      }

}
