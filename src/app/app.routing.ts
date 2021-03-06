import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersComponent }      from './team/members.component';
//import { MailsComponent }      from './workflow/mails.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }   from './team/hero-detail.component';
import { MemberDetailComponent }   from './team/member-detail.component';
//import { MailDetailComponent }   from './workflow/mail-detail.component';
import { UserProfileComponent }   from './user/user-profile.component';
//import { SetupComponent }   from './setup/setup.component';
import { CallbackComponent } from './services/callback.component';
import { MembersResolver } from './services/member.resolver';
import { MailResolver } from './services/mail.resolver';
import { MailExistsGuard } from './mailing/guards/mail-exists.guard';
import { CoreComponent } from './comptabilite/core/containers/core.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'members',
    loadChildren: './member/member-route.module#MemberRouteModule',
    /*component: MembersComponent,
    resolve: {
      membersCount: MembersResolver
    }*/
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'detail/:id', 
    component: HeroDetailComponent
  },
  {
    path: 'profile', 
    //component: UserProfileComponent
    loadChildren: './profile/profile.module#ProfileModule',
  },
  {
    path: 'participant',
    loadChildren: './participant/participant.collection.module#ParticipantCollectionModule',
  },
  {
    path: 'comptabilite',
    loadChildren: './comptabilite/core/core.module#CoreModule',
  },
  {
    path: 'league',
    loadChildren: './league/core/core.module#CoreModule',
  },
  {
    path: 'mailing',
    loadChildren: './emailing/core/core.module#CoreModule',
  },
 /* {
    path: 'setup', 
    component: SetupComponent
  }*/
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
