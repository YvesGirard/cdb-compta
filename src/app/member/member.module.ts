import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';
import { MemberEffects } from './effects/member.effects';
import { MemberCollectionEffects } from './effects/collection.effects';

import { MemberPageComponent } from './containers/member-page.component';
import { ViewMemberPageComponent } from './containers/view-member-page.component';
import { MemberListComponent } from './components/member-list.component';
import { MemberSearchComponent } from './components/member-search.component';
import { MemberPageListComponent } from './containers/member-page-list.component';

import { MemberAddDialog } from './components/member-add-dialog.component';

import { SelectedMemberPageComponent } from './containers/selected-member-page.component';
import { MemberDetailComponent } from './components/member-detail.component';
import { MemberFormComponent } from './components/member-form.component';
//import { UiMemberModule } from '../ui/member/ui.member.module';



import { MemberExistsGuard } from './guards/member-exists.guard';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

// services
import * as fromServices from './services';

export const ENTRY_COMPONENTS = [
    MemberAddDialog,
  ];

export const COMPONENTS = [
    MemberPageComponent, 
    MemberListComponent, 
    MemberAddDialog,
    ViewMemberPageComponent,
    SelectedMemberPageComponent,
    MemberDetailComponent,
    MemberFormComponent,
    MemberSearchComponent,
    MemberPageListComponent,
  ];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule,
        StoreModule.forFeature('members', reducers),
        EffectsModule.forFeature([
            MemberEffects,
            MemberCollectionEffects,
        ]),
    ],
    entryComponents: ENTRY_COMPONENTS,
    declarations: COMPONENTS,
    exports: COMPONENTS,
    providers: [...fromServices.services,
        MemberExistsGuard,
    ],
})
export class MemberModule {
    static forRoot() {
        return {
            ngModule: MemberModule,
        };
    }
}
