import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ParticipantDataSource } from '../datasource/participant.data-source';

@Component({
    selector: 'p-participant-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'participant-list.component.html',
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
export class ParticipantListComponent {
    @Input() datasource: ParticipantDataSource;
    @Input() displayedColumns: Array<string>;

    constructor() {
    }


}