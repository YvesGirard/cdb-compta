import {
    Component, Input, Output, EventEmitter, OnChanges,
    SimpleChanges,
} from '@angular/core';
import { Mail, MailingList } from '../../../model/mail';

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
    @Input() mailingLists: MailingList[];
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
            to: ['', Validators.required],
          });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.mail && this.mail._id) {
            this.form.patchValue(this.mail);
            //if (this.mail.to.length )
            this.form.controls['to'].patchValue(this.mail.to[0].address);
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
            let updated_mail = { ...this.mail, ...value };
            updated_mail.to = [{address : updated_mail.to}];
            console.log(updated_mail);
            this.update.emit(updated_mail);
        }
    }

    _remove(): void {
        const { value, valid } = this.form;

        this.remove.emit({ ...this.mail, ...value });

    }

}
