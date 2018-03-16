import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersComponent }      from './team/members.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }   from './team/hero-detail.component';
import { UserProfileComponent }   from './user/user-profile.component';
//import { SetupComponent }   from './setup/setup.component';
import { CallbackComponent } from './services/callback.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'members',
    component: MembersComponent
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
    component: UserProfileComponent
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },
 /* {
    path: 'setup', 
    component: SetupComponent
  }*/
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
