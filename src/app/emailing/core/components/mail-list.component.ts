import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, } from '@angular/core';
import { MailsDataSource } from '../datasource/mails.data-source';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'm-mail-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'mail-list.component.html',
    styles: [
        `
        mat-cell {
            color:rgba(0,0,0,0.86);
            font-size:14px;
            font-family:Roboto,"Helvetica Neue",sans-serif;
            font-weight: normal;
        }
        
        mat-cell a {
            color: #0a84ae;
            text-decoration: none;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        mat-cell a:hover {
            cursor: pointer;
        }
        
        .mat-elevation-z8 {
            -webkit-box-shadow: none;
             box-shadow: none;
        }
  `,
    ],
})
export class MailListComponent {
    @Input() datasource: MailsDataSource;
    @Input() displayedColumns: Array<string>;

    constructor() {

    }


}