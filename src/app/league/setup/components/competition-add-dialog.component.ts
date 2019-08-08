import { Component, Inject, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {   FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'competition-add-dialog.component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'competition-add-dialog.component.html',
  styleUrls: ['competition-add-dialog.component.css'],
})
export class CompetitionAddDialog implements OnChanges {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CompetitionAddDialog>,
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
      competition_id: '',
      descr: '',
    });

  }

  save(): void {
    const { value, valid } = this.form;
    if (valid) {
      this.dialogRef.close(value);
    }
  }

}