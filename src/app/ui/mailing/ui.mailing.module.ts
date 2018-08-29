
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailingListFormComponent } from './components/mailinglist-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

export const COMPONENTS = [
    MailingListFormComponent,
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

export class UiMailingModule { }
