
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantFormComponent } from './components/participant-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

export const COMPONENTS = [
    ParticipantFormComponent,
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})

export class UiParticipantModule { }
