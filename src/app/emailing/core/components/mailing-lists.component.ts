import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MailinglistsDataSource } from '../datasource/mailinglists.data-source';

@Component({
    selector: 'm-mailing-lists',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'mailing-lists.component.html',
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
export class MailingListsComponent {
    @Input() datasource: MailinglistsDataSource;
    @Input() displayedColumns: Array<string>;

    constructor() {
    }


}