import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CoreComponent } from './containers/core.component';
import { MaterialModule } from '../../material.module';
import { SetupModule } from '../parametrage/setup.module';

export const COMPONENTS = [
  CoreComponent
];

// routes
export const ROUTES: Routes = [
  {
    path: '', component: CoreComponent, children: [
      {
        path: 'parametrage',
        loadChildren: '../parametrage/setup.module#SetupModule',
      }
    ]
  },
];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, RouterModule.forChild(ROUTES),
    
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
    };
  }
}