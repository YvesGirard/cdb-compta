import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';
//import { ParticipantEffects } from './effects/participant.effects';
import { CollectionEffects } from './effects/collection.effects';

import { ParticipantPageComponent } from './containers/participant-page.component';
import { ViewParticipantPageComponent } from './containers/view-participant-page.component';
import { ParticipantListComponent } from './components/participant-list.component';
import { ParticipantAddDialog } from './components/participant-add-dialog.component';

import { SelectedParticipantPageComponent } from './containers/selected-participant-page.component';
import { ParticipantDetailComponent } from './components/participant-detail.component';
//import { ParticipantFormComponent } from '../ui/participant/components/participant-form.component';
import { UiParticipantModule } from '../ui/participant/ui.participant.module';



import { ParticipantExistsGuard } from './guards/participant-exists.guard';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

// services
//import * as fromServices from './services';

export const ENTRY_COMPONENTS = [
    ParticipantAddDialog,
  ];

export const COMPONENTS = [
    ParticipantPageComponent, 
    ParticipantListComponent, 
    ParticipantAddDialog,
    ViewParticipantPageComponent,
    SelectedParticipantPageComponent,
    ParticipantDetailComponent,
   // ParticipantFormComponent,
  ];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        UiParticipantModule,
        RouterModule.forChild([
            {
              path: ':id',
              component: ViewParticipantPageComponent,
              canActivate: [ParticipantExistsGuard],
            },
            { path: '', component: ParticipantPageComponent, },
        ]),
        StoreModule.forFeature('participantscollection', reducers),
        EffectsModule.forFeature([
            //ParticipantEffects,
            CollectionEffects,
        ]),
    ],
    entryComponents: ENTRY_COMPONENTS,
    declarations: COMPONENTS,
    exports: COMPONENTS,
    providers: [//...fromServices.services,
        ParticipantExistsGuard,
    ],
})
export class ParticipantCollectionModule {
    static forRoot() {
        return {
            ngModule: ParticipantCollectionModule,
        };
    }
}
