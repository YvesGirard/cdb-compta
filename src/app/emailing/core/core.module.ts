import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';
import { MailingListEffects } from './effects/mailinglist.effects';
import { MailingListMemberEffects } from './effects/member.effects';
import { MailEffects } from './effects/mail.effects';
import { MailCollectionEffects } from './effects/mail.collection.effects';


import { CoreComponent } from './containers/core.component';
import { MaterialModule } from '../../material.module';
import { MailingListPageComponent } from './containers/mailinglists-page.component';
import { SelectedMailingListPageComponent } from './containers/selected-mailinglist-page.component';
import { ViewMailingListPageComponent } from './containers/view-mailinglist-page.component';
import { MailingListDetailComponent } from './components/mailinglist-detail.component';

import { MailingListAddDialog } from './components/mailinglist-add-dialog.component';
import { MailingListsComponent } from './components/mailing-lists.component';

import { MailingListsMembersComponent } from './components/members.component';

import { MailingListLoadedGuard } from './guards/mailinglist-loaded.guard';
import { SearchMemberPageComponent } from './containers/search-members-page.component';

// MAILS
import { MailPageListComponent } from './containers/mail-page-list.component';
import { MailPageComponent } from './containers/mail-page.component';
import { MailSearchComponent } from './components/mail-search.component';
import { MailListComponent } from './components/mail-list.component';


import { UiMailingModule } from '../../ui/mailing/ui.mailing.module';

import { SharedModule } from '../../shared.module';
import { MemberModule } from '../../member/member.module';


import * as fromServices from './services';

export const COMPONENTS = [
  CoreComponent,
  MailingListPageComponent,
  MailingListAddDialog,
  MailingListsComponent,
  SelectedMailingListPageComponent,
  ViewMailingListPageComponent,
  MailingListDetailComponent,
  MailingListsMembersComponent,
  SearchMemberPageComponent,
  MailPageListComponent,
  MailPageComponent,
  MailSearchComponent,
  MailListComponent,
];


export const ENTRY_COMPONENTS = [
  MailingListAddDialog,
];

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: CoreComponent,
    canActivate: [MailingListLoadedGuard],
    children: [
      {
        path: 'mailinglist',
        component: MailingListPageComponent,
      },
      {
        path: 'mailinglist/:id',
        component: ViewMailingListPageComponent,
        //canActivate: [ParticipantExistsGuard],
      },
      {
        path: 'mailinglist/:id/members',
        component: SearchMemberPageComponent,
      },
      {
        path: 'mails',
        component: MailPageComponent,
      },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    UiMailingModule,
    SharedModule,
    MemberModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('mailinglists', reducers),
    EffectsModule.forFeature([
      MailingListEffects,
      MailingListMemberEffects,
      MailEffects,
      MailCollectionEffects,
    ]),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  entryComponents: ENTRY_COMPONENTS,
  providers: [...fromServices.services,
    MailingListLoadedGuard,
  ],

})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
    };
  }
}