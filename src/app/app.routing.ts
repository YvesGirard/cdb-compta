import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersComponent }      from './team/members.component';
import { MailsComponent }      from './workflow/mails.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }   from './team/hero-detail.component';
import { MemberDetailComponent }   from './team/member-detail.component';
import { MailDetailComponent }   from './workflow/mail-detail.component';
import { UserProfileComponent }   from './user/user-profile.component';
//import { SetupComponent }   from './setup/setup.component';
import { CallbackComponent } from './services/callback.component';
import { MembersResolver } from './services/member.resolver';
import { MailResolver } from './services/mail.resolver';
import { MailExistsGuard } from './mailing/guards/mail-exists.guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'members',
    component: MembersComponent,
    resolve: {
      membersCount: MembersResolver
    }
  },
  {
    path: 'mails',
    component: MailsComponent,
    canActivate: [MailExistsGuard],
  },  
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'member/:id', 
    component: MemberDetailComponent
  },
  {
    path: 'mail/:id', 
    component: MailDetailComponent
  },
  {
    path: 'detail/:id', 
    component: HeroDetailComponent
  },
  {
    path: 'profile', 
    component: UserProfileComponent
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },
  {
    path: 'comptabilite',
    loadChildren: './comptabilite/books.module#BooksModule',
  },
 /* {
    path: 'setup', 
    component: SetupComponent
  }*/
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
