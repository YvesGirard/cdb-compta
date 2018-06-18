import { Component, Inject, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {   FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'exercice-add-dialog.component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'exercice-add-dialog.component.html',
  styleUrls: ['exercice-add-dialog.component.css'],
})
export class ExerciceAddDialog implements OnChanges {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ExerciceAddDialog>,
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
      fiscal_year: '',
      begin_dt: '',
      end_dt: '',
    });

  }

  save(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.dialogRef.close(this.form.value);
    }
  }

}