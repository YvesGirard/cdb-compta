import { Component, Inject, OnChanges, SimpleChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Member } from '../../model/member';



@Component({
  selector: 'member-add-dialog.component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'member-add-dialog.component.html',
  styleUrls: ['member-add-dialog.component.css'],
})
export class MemberAddDialog implements OnChanges {
  form: FormGroup;

  @Input() member: Member;
 

  constructor(
    public dialogRef: MatDialogRef<MemberAddDialog>,
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