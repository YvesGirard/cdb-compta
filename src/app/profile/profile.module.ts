import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';
import { ProfileEffects } from './effects/profile.effects';

import { ProfilePageComponent } from './containers/profile.component';
import { ProfileFormComponent } from './components/profile-form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

// services
import * as fromServices from './services';

export const ENTRY_COMPONENTS = [

  ];

export const COMPONENTS = [
    ProfilePageComponent,
    ProfileFormComponent,
  ];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule.forChild([
            { path: '', component: ProfilePageComponent, },
        ]),
        StoreModule.forFeature('profile', reducers),
        EffectsModule.forFeature([
            ProfileEffects,
        ]),
    ],
    entryComponents: ENTRY_COMPONENTS,
    declarations: COMPONENTS,
    exports: COMPONENTS,
    providers: [...fromServices.services],
})
export class ProfileModule {
    static forRoot() {
        return {
            ngModule: ProfileModule,
        };
    }
}
