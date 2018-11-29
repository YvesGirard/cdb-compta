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
    selector: 'm-mail-form',
    templateUrl: 'mail-form.component.html',
    styles: [
        `
    `,
    ],
})
export class MailFormComponent {
    //form: FormGroup;

    constructor(

    ) {

    }

    @Input() mail: Mail;
    @Input() form: FormGroup;

    @Input() inCollection: boolean;
    @Output() update = new EventEmitter<Mail>();
    @Output() remove = new EventEmitter<Mail>();

    // Controles 

    /*get given_nameControl() {
        return this.form.get('from') as FormControl;
    }

    get given_nameControlInvalid() {
        return this.given_nameControl.hasError('required') && this.given_nameControl.touched;
    }

    get family_nameControl() {
        return this.form.get('family_name') as FormControl;
    }

    get family_nameControlInvalid() {
        return this.family_nameControl.hasError('required') && this.family_nameControl.touched;
    }

    get emailControl() {
        return this.form.get('email') as FormControl;
    }

    get emailControlInvalid() {
        return this.emailControl.hasError('required') && this.emailControl.touched;
    }*/

    // Model
   /* get id() {
        return this.mail._id;
    }

    get given_name() {
        return this.mail.given_name;
    }

    get family_name() {
        return this.mail.family_name;
    }

    get name() {
        return this.mail.name;
    }*/

    get html() {
        return this.mail.html;
    }

}
