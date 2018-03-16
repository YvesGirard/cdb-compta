import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'member-add-dialog.component',
  templateUrl: 'member-add-dialog.component.html',
  styleUrls: [ 'member-add-dialog.component.css' ],
})
export class MemberAddDialog {
  memberForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MemberAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) { 
    this.createForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm(): void {
    this.memberForm = this.fb.group({
      name: '', 
    });

  }

  save() {
    this.dialogRef.close(this.memberForm.value);
  }

}