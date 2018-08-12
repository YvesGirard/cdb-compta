import { Component, Inject, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'participant-add-dialog.component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'participant-add-dialog.component.html',
  styleUrls: ['participant-add-dialog.component.css'],
})
export class ParticipantAddDialog implements OnChanges {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ParticipantAddDialog>,
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
      serie: [''],
      licence: [''],
      given_name: [''],
      family_name: [''],
      gender: [''],
      licence_validity: this.fb.array(
      [this.fb.group({
        type: [''],
        saison: [''],
      })]
    )
  });

}

buildLicence(): FormGroup {
  return this.fb.group({
    type: [''],
    saison: [''],
  });
}

save(): void {
  const { value, valid } = this.form;
  if(valid) {
    this.dialogRef.close(value);
  }
}

}