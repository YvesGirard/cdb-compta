import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './store/reducers';
import { CompetitionEffects } from './store/effects/competition.effects';


import { SetupPageComponent } from './containers/setup-page.component';
import { CompetitionPageComponent } from './containers/competition-page.component';
import { CompetitionPreviewListComponent } from './components/competition-preview-list.component';
import { CompetitionAddDialog } from './components/competition-add-dialog.component';


import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

//import { reducers } from './reducers';
// services
import * as fromServices from './services';

export const ENTRY_COMPONENTS = [
    CompetitionAddDialog,
  ];

export const COMPONENTS = [
    SetupPageComponent, 
    CompetitionPageComponent, 
    CompetitionPreviewListComponent, 
    CompetitionAddDialog,
  ];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule.forChild([
            /*{ path: 'find', component: FindBookPageComponent },
            {
              path: ':id',
              component: ViewBookPageComponent,
              canActivate: [BookExistsGuard],
            },*/
            { path: '', component: SetupPageComponent, },
        ]),
        StoreModule.forFeature('setup_competition', reducers),
        EffectsModule.forFeature([
            CompetitionEffects,
        ]),
        //StoreModule.forFeature('books', reducers),
        //EffectsModule.forFeature([BookEffects, CollectionEffects]),
    ],
    entryComponents: ENTRY_COMPONENTS,
    declarations: COMPONENTS,
    exports: COMPONENTS,
    providers: [...fromServices.services],
})
export class SetupModule {
    static forRoot() {
        return {
            ngModule: SetupModule,
        };
    }
}
