import {
    Component, Input, Output, EventEmitter, OnChanges,
    SimpleChanges,
} from '@angular/core';
import { Participant } from '../../model/participant';
import {
    FormControl,
    FormGroup,
    FormArray,
    FormBuilder,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'p-participant-form',
    templateUrl: 'participant-form.component.html',
    styles: [
        `
    `,
    ],
})
export class ParticipantFormComponent {
    //form: FormGroup;

    constructor(

    ) {

    }

    @Input() participant: Participant;
    @Input() form: FormGroup;

    @Input() inCollection: boolean;
    @Output() update = new EventEmitter<Participant>();
    @Output() remove = new EventEmitter<Participant>();

    // Controles 
    get serieControl() {
        return this.form.get('serie') as FormControl;
    }

    get serieControlInvalid() {
        return this.serieControl.hasError('required') && this.serieControl.touched;
    }

    get licenceControl() {
        return this.form.get('licence') as FormControl;
    }

    get licenceControlInvalid() {
        return this.licenceControl.hasError('required') && this.licenceControl.touched;
    }

    get given_nameControl() {
        return this.form.get('licence') as FormControl;
    }

    get given_nameControlInvalid() {
        return this.given_nameControl.hasError('required') && this.given_nameControl.touched;
    }

    get family_nameControl() {
        return this.form.get('licence') as FormControl;
    }

    get family_nameControlInvalid() {
        return this.family_nameControl.hasError('required') && this.family_nameControl.touched;
    }

    get genderControl() {
        return this.form.get('licence') as FormControl;
    }

    get genderControlInvalid() {
        return this.genderControl.hasError('required') && this.genderControl.touched;
    }

    get birthdayControl() {
        return this.form.get('licence') as FormControl;
    }

    get birthdayControlInvalid() {
        return this.birthdayControl.hasError('required') && this.birthdayControl.touched;
    }

    // Model
    get id() {
        return this.participant._id;
    }

    get serie() {
        return this.participant.serie;
    }

    get licence() {
        return this.participant.licence;
    }

    get given_name() {
        return this.participant.given_name;
    }

    get family_name() {
        return this.participant.family_name;
    }

    get name() {
        return this.participant.name;
    }


    get gender() {
        return this.gender
    }

    get licence_validity() {
        return this.licence_validity
    }


}
