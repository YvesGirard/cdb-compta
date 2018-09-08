import { ChangeDetectionStrategy, Component, Input, EventEmitter, Output } from '@angular/core';
import { MailinglistsMembersDataSource } from '../datasource/members.data-source';
import { SelectionModel } from '@angular/cdk/collections';
import { MailingListMember } from '../../../model/mail';


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
    @Output() remove = new EventEmitter<MailingListMember[]>();

    selection: SelectionModel<any>;

    displayedColumns = [
        'select',
        'address',
        'name',
        'subscribed',
    ];

    constructor() {
        const initialSelection = [];
        const allowMultiSelect = true;
        this.selection = new SelectionModel<number>(allowMultiSelect, initialSelection);
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = 10;
        return numSelected == numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() : true
        //this.dataSource.data.forEach(row => this.selection.select(row._id));
    }

    _remove(): void {
        this.remove.emit({ ...this.selected });
    }

    selectionToggle(row: any) {
        this.selection.toggle(row.address);
        //this.selectedChange.emit(this.selection.selected.values);
    }

    get selected(): Array<any> {
        console.log(this.selection.selected.values())
        return Array.from(this.selection.selected.values());
    }

}