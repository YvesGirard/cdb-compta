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
    selector: 'p-participant-detail',
    templateUrl: 'participant-detail.component.html',
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
export class ParticipantDetailComponent implements OnChanges {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {
        this.createForm();
    }

    @Input() participant: Participant;
    @Input() inCollection: boolean;
    @Output() update = new EventEmitter<Participant>();
    @Output() remove = new EventEmitter<Participant>();

    createForm(): void {
        this.form = this.fb.group({
            serie: ['', Validators.required],
            licence: ['', Validators.required],
            given_name: ['', Validators.required],
            family_name: ['', Validators.required],
            gender: ['', Validators.required],
            birthday: ['', Validators.required],
            licence_validity: this.fb.array(
                [this.fb.group({
                    type: [''],
                    saison: [''],
                })]
            )
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.participant && this.participant._id) {
            this.form.patchValue(this.participant);
        }
    }

    // Model

    get licence() {
        return this.participant.licence;
    }

    get name() {
        return this.participant.name;
    }

    _update(): void {
        const { value, valid } = this.form;

        Object.keys(this.form.controls).forEach(field => {
            const control = this.form.get(field);
            control.markAsTouched({ onlySelf: true });
        });

        if (valid) {
            this.update.emit({ ...this.participant, ...value });
        }
    }

    _remove(): void {
        const { value, valid } = this.form;

        this.remove.emit({ ...this.participant, ...value });

    }

}
