import { ChangeDetectionStrategy, Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, fromEvent } from 'rxjs';

import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MatDialog, PageEvent, MatDialogConfig } from '@angular/material';
import { MemberAddDialog } from '../components/member-add-dialog.component';
import { MemberDataSource } from '../datasource/member.data-source';

import * as MembersActions from '../actions/member.actions';
import * as fromMembers from '../reducers';
import { Member } from '../../model/member';



const defaultDialogConfig = new MatDialogConfig();


@Component({
  selector: 'm-member-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'member-page.component.html',
  styles: [
    `

  `,
  ],
})
export class MemberPageComponent {
  fileOption: string;

  config = {
    disableClose: false,
    // panelClass: 'custom-overlay-pane-class',
    // hasBackdrop: true,
    // backdropClass: '',
    width: '',
    height: '',
    minWidth: '',
    minHeight: '',
    maxWidth: defaultDialogConfig.maxWidth,
    maxHeight: '',
  };

  displayedColumns = ['_id',
    'given_name',
    'family_name',
    'email'
  ];


  constructor(private store: Store<fromMembers.State>, public dialog: MatDialog, ) {

  }


  create() {
    let dialogRef = this.dialog.open(MemberAddDialog, this.config);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.email !== undefined)
        this.store.dispatch(new MembersActions.AddMember(result));
    });
  }

  gotoDetail(): void {
  }

  ngOnDestroy() {
    //this.actionsSubscription.unsubscribe();
  }

  fileChange(event) {


    let fileList: FileList = event.target.files;
    console.log(event.target.files)

    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      formData.append("type", this.fileOption);

      let fileHeaders = new Headers({
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      });

      console.log("request")
      this.store.dispatch(new MembersActions.UploadMember(formData));
      //this.dataSource.updateMembers(formData);

    }
  }
}