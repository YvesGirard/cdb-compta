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
    selector: 'm-member-form',
    templateUrl: 'member-form.component.html',
    styles: [
        `
    `,
    ],
})
export class MemberFormComponent {
    //form: FormGroup;

    constructor(

    ) {

    }

    @Input() member: Member;
    @Input() form: FormGroup;

    @Input() inCollection: boolean;
    @Output() update = new EventEmitter<Member>();
    @Output() remove = new EventEmitter<Member>();

    // Controles 

    get given_nameControl() {
        return this.form.get('given_name') as FormControl;
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
    }

    get rankControl() {
        return this.form.get('rank') as FormControl;
    }

    get rankControlInvalid() {
        return this.rankControl.hasError('required') && this.rankControl.touched;
    }

    // Model
    get id() {
        return this.member._id;
    }

    get given_name() {
        return this.member.given_name;
    }

    get family_name() {
        return this.member.family_name;
    }

    get name() {
        return this.member.name;
    }

    get email() {
        return this.email
    }

    get rank() {
        return this.rank
    }

    get id_ac() {
        return this.member.id_ac;
    }

}
