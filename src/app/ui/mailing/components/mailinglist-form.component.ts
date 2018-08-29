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
    selector: 'm-mailinglist-form',
    templateUrl: 'mailinglist-form.component.html',
    styles: [
        `
    `,
    ],
})
export class MailingListFormComponent {
    //form: FormGroup;

    constructor(

    ) {

    }

    @Input() mailinglist: MailingList;
    @Input() form: FormGroup;

    @Input() inCollection: boolean;
    @Output() update = new EventEmitter<MailingList>();
    @Output() remove = new EventEmitter<MailingList>();

    // Controles 
    get addressControl() {
        return this.form.get('address') as FormControl;
    }

    get addressControlInvalid() {
        return this.addressControl.hasError('required') && this.addressControl.touched;
    }

    get nameControl() {
        return this.form.get('name') as FormControl;
    }

    get nameControlInvalid() {
        return this.nameControl.hasError('required') && this.nameControl.touched;
    }

    get descriptionControl() {
        return this.form.get('description') as FormControl;
    }

    get descriptionControlInvalid() {
        return this.descriptionControl.hasError('required') && this.descriptionControl.touched;
    }

    get access_levelControl() {
        return this.form.get('access_level') as FormControl;
    }

    get access_levelControlInvalid() {
        return this.access_levelControl.hasError('required') && this.access_levelControl.touched;
    }

    // Model
    get id() {
        return this.mailinglist._id;
    }

    get address() {
        return this.mailinglist.address;
    }

    get name() {
        return this.mailinglist.name;
    }

    get description() {
        return this.mailinglist.description;
    }

    get access_level() {
        return this.mailinglist.access_level;
    }

}
