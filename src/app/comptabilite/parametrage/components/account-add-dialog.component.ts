import { Component, Inject, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {   FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'account-add-dialog.component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'account-add-dialog.component.html',
  styleUrls: ['account-add-dialog.component.css'],
})
export class AccountAddDialog implements OnChanges {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AccountAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm(): void {
    this.form = this.fb.group({
      account_id: '',
      descr: '',
    });

  }

  save(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.dialogRef.close(this.form.value);
    }
  }

}