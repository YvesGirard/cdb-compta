import {
    Component, Input, Output, EventEmitter, OnChanges,
    SimpleChanges,
} from '@angular/core';
import { Member } from '../../model/member';
import {
    FormControl,
    FormGroup,
    FormArray,
    FormBuilder,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'm-member-detail',
    templateUrl: 'member-detail.component.html',
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
export class MemberDetailComponent implements OnChanges {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {
        this.createForm();
    }

    @Input() member: Member;
    @Input() inCollection: boolean;
    @Output() update = new EventEmitter<Member>();
    @Output() remove = new EventEmitter<Member>();

    createForm(): void {
        this.form = this.fb.group({
            given_name: ['', Validators.required],
            family_name: ['', Validators.required],
            email: ['', Validators.required],
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.member && this.member._id) {
            this.form.patchValue(this.member);
        }
    }

    // Model

    get name() {
        return this.member.name;
    }

    _update(): void {
        const { value, valid } = this.form;

        Object.keys(this.form.controls).forEach(field => {
            const control = this.form.get(field);
            control.markAsTouched({ onlySelf: true });
        });

        if (valid) {
            this.update.emit({ ...this.member, ...value });
        }
    }

    _remove(): void {
        const { value, valid } = this.form;

        this.remove.emit({ ...this.member, ...value });

    }

}
