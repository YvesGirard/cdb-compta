import { Component, Inject, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Participant } from '../../model/participant';



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
      serie: ['', Validators.required],
      licence: ['', Validators.required],
      given_name: ['', Validators.required],
      family_name: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
      licence_validity: this.fb.array(
        [this.fb.group({
          type: [''],
          saison: [''],
        })]
      )
    });

  }

  // Model

  get licence() {
    return this.form.value.licence;
  }

  get name() {
    return this.form.value.given_name + " " + this.form.value.family_name;
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