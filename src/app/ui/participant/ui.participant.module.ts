
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantFormComponent } from './components/participant-form.component';
import { ReactiveFormsModule } from '@angular/forms';

export const COMPONENTS = [
    ParticipantFormComponent,
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})

export class UiParticipantModule { }
