import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MailinglistsMembersDataSource } from '../datasource/members.data-source';

@Component({
    selector: 'm-mailing-lists-members',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'members.component.html',
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
export class MailingListsMembersComponent {
    @Input() datasource: MailinglistsMembersDataSource;

    displayedColumns = [
        'address',
        'name',
        'subscribed',
      ];

    constructor() {
    }


}