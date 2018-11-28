import {
    Component, Input, Output, EventEmitter, OnChanges,
    SimpleChanges,
} from '@angular/core';
import { Mail } from '../../../model/mail';

import {
    FormControl,
    FormGroup,
    FormArray,
    FormBuilder,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'm-mail-detail',
    templateUrl: 'mail-detail.component.html',
    styles: [
        `
      :host {
        display: flex;
        justify-content: center;
        margin: 75px 0;
      }
      mat-card {
        max-width: 600px;
      }
      mat-card-title-group {
        margin-left: 0;
      }
      img {
        width: 60px;
        min-width: 60px;
        margin-left: 5px;
      }
      mat-card-content {
        margin: 15px 0 50px;
      }
      mat-card-actions {
        margin: 25px 0 0 !important;
      }
      mat-card-footer {
        padding: 0 25px 25px;
        position: relative;
      }
    `,
    ],
})
export class MailDetailComponent implements OnChanges {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {
        this.createForm();
    }

    @Input() mail: Mail;
    @Input() inCollection: boolean;
    @Output() update = new EventEmitter<Mail>();
    @Output() remove = new EventEmitter<Mail>();

    createForm(): void {
        this.form = this.fb.group({
            from: this.fb.array(
              [this.fb.group({
                _id: [''],
                address: [''],
              })]
            ),
            to: this.fb.array(
              [this.fb.group({
                _id: [''],
                address: [''],
              })]
            )
          });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.mail && this.mail._id) {
            this.form.patchValue(this.mail);
        }
    }

    // Model

    get subject() {
        return this.mail.subject;
    }

    _update(): void {
        const { value, valid } = this.form;

        Object.keys(this.form.controls).forEach(field => {
            const control = this.form.get(field);
            control.markAsTouched({ onlySelf: true });
        });

        if (valid) {
            this.update.emit({ ...this.mail, ...value });
        }
    }

    _remove(): void {
        const { value, valid } = this.form;

        this.remove.emit({ ...this.mail, ...value });

    }

}
