import { Component, OnInit,  Directive, AfterContentInit, ViewEncapsulation,  ContentChildren, Renderer, ViewChildren, ContentChild, QueryList, ElementRef,ViewChild, forwardRef} from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { Title } from '../model/title';
import { User } from '../model/user';
//import { MdCheckbox, MdDialog, MdDialogRef } from '@angular/material';
//import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
//import { MatCheckbox }  from '@angular/material';

const TITLES = [
  { _id: 1, title: 'Monsieur' },
  { _id: 2, title: 'Madame' },
  { _id: 3, title: 'Mademoiselle' },
];


/** The hint directive, used to tag content as hint labels (going under the input). */
/*@Directive({
  selector: 'cdb-item'
})
export class CdbItem implements OnInit {
  constructor(private _element: ElementRef, private _renderer: Renderer) { }

  private _new = false;
  private _update = false;
  private _delete = false;

  //@ContentChild(MatCheckbox) _checkbox: MatCheckbox;

  ngOnInit(): void {
    
  }

}*/


/*@Component({
  selector: 'add-dialog',
  template: '<div style="width:100px;height:100px;">DIALOG</div>',
})
export class AddDialog {
  constructor(public dialogRef: MatDialogRef<AddDialog>) {}
  
}*/

@Component({
  moduleId: module.id,
  selector: 'setup',
  templateUrl: 'setup.component.html',
  styleUrls: [ 'setup.component.css' ],
 // encapsulation: ViewEncapsulation.None
})

export class SetupComponent implements OnInit, AfterContentInit {
  userProfile: User;
  titles = TITLES;

  constructor(
    private AuthService: AuthService,
    private router: Router/*,
    public dialog: MatDialog*/) {}
    private selectedOption: string; 
  /**
   * Content directives.
   */
  //@ViewChildren(CdbItem) _itemChildren: QueryList<CdbItem>;
  //@ViewChild("selectAll")  _selectall: MatCheckbox;

  ngOnInit(): void {
    if (!this.AuthService.authenticated) {
       this.gotoRoot();
    }

    //this.userProfile = this.AuthService.getUserProfile()
    //this.userProfile.title = 1;
  }

  /** TODO: internal */
  ngAfterContentInit() {
    //this._listenToSelectAll();
  }

  /** Listens to selection events on each option. */
/*  private _listenToSelectAll(): void {
      this._selectall.change.subscribe(() => {
            this._itemChildren.forEach((item: CdbItem) => {
              item._checkbox.checked = this._selectall.checked;
            });
      });
  }*/

  private addDialog() {
  //  let dialogRef = this.dialog.open(AddDialog);
   // dialogRef.afterClosed().subscribe(result => {
   //   this.selectedOption = result;
   // });
  }

  private addRow() {
    //let title = new Title();
    //this.titles.push(title);
    this.addDialog();
  }

  gotoRoot(): void {
    let link = ['/'];
    this.router.navigate(link);
  }
}


