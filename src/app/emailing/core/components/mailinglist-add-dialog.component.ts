import { Component, Inject, OnChanges, SimpleChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MailingList } from '../../../model/mail';



@Component({
  selector: 'mailinglist-add-dialog.component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'mailinglist-add-dialog.component.html',
  styleUrls: ['mailinglist-add-dialog.component.css'],
})
export class MailingListAddDialog implements OnChanges {
  form: FormGroup;

  @Input() mailinglist: MailingList;
 

  constructor(
    public dialogRef: MatDialogRef<MailingListAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  onNoClick(): void {
    this.dialogRef.close({});
  }

  createForm(): void {
    this.form = this.fb.group({
      address: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      access_level: ['', Validators.required],
    });

  }

  // Model

  get name() {
    return this.form.value.name;
  }

  save(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    const { value, valid } = this.form;
    if (valid) {
      this.dialogRef.close(value);
    }
  }

}