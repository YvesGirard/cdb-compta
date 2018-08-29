import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './store/reducers';
import { AccountEffects } from './store/effects/account.effects';
import { ExerciceEffects } from './store/effects/exercice.effects';
//import { ComponentsModule } from './components';
import { SetupPageComponent } from './containers/setup-page.component';
import { AccountPageComponent } from './containers/account-page.component';
import { AccountPreviewListComponent } from './components/account-preview-list.component';
import { AccountAddDialog } from './components/account-add-dialog.component';

import { ExercicePageComponent } from './containers/exercice-page.component';
import { ExercicePreviewListComponent } from './components/exercice-preview-list.component';
import { ExerciceAddDialog } from './components/exercice-add-dialog.component';


import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

//import { reducers } from './reducers';
// services
import * as fromServices from './services';

export const ENTRY_COMPONENTS = [
    AccountAddDialog,
    ExerciceAddDialog,
  ];

export const COMPONENTS = [
    SetupPageComponent, 
    AccountPageComponent, 
    AccountPreviewListComponent, 
    AccountAddDialog,
    ExercicePageComponent,
    ExerciceAddDialog,
    ExercicePreviewListComponent,
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
        StoreModule.forFeature('setup', reducers),
        EffectsModule.forFeature([
            AccountEffects,
            ExerciceEffects,
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
