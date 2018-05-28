import { Component, 
  //Inject, 
  ViewEncapsulation, 
  forwardRef, 
  OnDestroy,
  OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggerService } from '../services/logger.service';

/** Component opened inside a snackbar. */
@Component({
  selector: 'simple-snack-bar',
  host: {
    'class': 'mat-simple-snackbar',
  },
  templateUrl: './logger-snackbar.component.html',
 /* template: `<span>{{ (this.message | async)?.message }}</span>
<!--<button mat-button class="mat-simple-snackbar-action" (click)="onAction()">ANNULER</button>-->`,*/
  styleUrls: [ './logger-snackbar.component.css' ],
 /* styles: [`.mat-simple-snackbar {
  display: flex;
  justify-content: space-between;
  line-height: 20px;
  opacity: 1;
}`,`.mat-simple-snackbar-action {
    webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    outline: 0;
    border: none;
    -webkit-tap-highlight-color: transparent;
    background: 0 0;
    flex-shrink: 0;
    margin-left: 0px;
    line-height: 1;
    font-family: inherit;
    font-size: inherit;
    font-weight: 500;  
    color: #1e88e5;  
}`],*/
  encapsulation: ViewEncapsulation.None,
})
export class LoggerSnackbarComponent implements OnDestroy, OnInit {
  message: Observable<string>;

  constructor(private _snackLogger: LoggerService ,) {}

  ngOnInit() {
    this.message = this._snackLogger.logMessage$;
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed

  }

}