import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, } from '@angular/core';
import { MemberDataSource } from '../datasource/member.data-source';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'm-member-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'member-list.component.html',
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
export class MemberListComponent {
    @Input() datasource: MemberDataSource;
    @Input() displayedColumns: Array<string>;
   // @Input() selected: Array<any>;

    selection: SelectionModel<any>;

   // @Output() readonly selectedChange: EventEmitter<any> = new EventEmitter<any>()

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

    ajouterListe() {
        this.selection.selected.forEach((id) => {
            console.log(id);
        });
    }

    selectionToggle(row: any) {
        this.selection.toggle(row._id);
        //this.selectedChange.emit(this.selection.selected.values);
    }

    get selected(): Array<any> {
        return Array.from(this.selection.selected.values());
    }

    //selection.toggle(row._id)
}