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
    @Input() isAllSelected: boolean;
    @Input() isSelected: boolean;
    //@Input() _selected: string[];

    //selection: SelectionModel<any>;
    selection: string[];
    //_isSelected: boolean;

   @Output() selectedChange = new EventEmitter<string>()
   @Output() masterToggle = new EventEmitter<any>();

    constructor() {
        //const initialSelection = [];
       // const allowMultiSelect = true;
        //this.selection = new SelectionModel<number>(allowMultiSelect, initialSelection);
    }

    @Input() set _selected(value: string[]) {
        this.selection = value;
     }

    /* @Input() set isSelected(value: boolean) {
         console.log("isSelected: " + value)
        this._isSelected = value;
     }*/

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    _masterToggle() {
        this.masterToggle.emit();
    }

    isRowSelected(row: any):boolean {
        return this.selection.includes(row._id)
    }

    selectionToggle(row: any) {
        this.selectedChange.emit(row._id);
    }

    get selected(): Array<any> {
        return this.selection;
    }

}