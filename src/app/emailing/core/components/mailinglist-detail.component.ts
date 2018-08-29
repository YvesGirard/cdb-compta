import {
    Component, Input, Output, EventEmitter, OnChanges,
    SimpleChanges,
} from '@angular/core';
import { MailingList } from '../../../model/mail';
import {
    FormControl,
    FormGroup,
    FormArray,
    FormBuilder,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'm-mailinglist-detail',
    templateUrl: 'mailinglist-detail.component.html',
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
export class MailingListDetailComponent implements OnChanges {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {
        this.createForm();
    }

    @Input() mailinglist: MailingList;
    @Input() inCollection: boolean;
    @Output() update = new EventEmitter<MailingList>();
    @Output() remove = new EventEmitter<MailingList>();

    createForm(): void {
        this.form = this.fb.group({
            address: ['', Validators.required],
            name: ['', Validators.required],
            description: ['', Validators.required],
            access_level: ['', Validators.required],
          });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.mailinglist && this.mailinglist._id) {
            this.form.patchValue(this.mailinglist);
        }
    }

    // Model

    get name() {
        return this.mailinglist.name;
    }

    _update(): void {
        const { value, valid } = this.form;

        Object.keys(this.form.controls).forEach(field => {
            const control = this.form.get(field);
            control.markAsTouched({ onlySelf: true });
        });

        if (valid) {
            this.update.emit({ ...this.mailinglist, ...value });
        }
    }

    _remove(): void {
        const { value, valid } = this.form;

        this.remove.emit({ ...this.mailinglist, ...value });

    }

}
