import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

//import { ComponentsModule } from './components';
import { SetupPageComponent } from './containers/setup-page.component';
import { AccountPageComponent } from './containers/account-page.component';
import { AccountPreviewListComponent } from './components/account-preview-list.component';


import { MaterialModule } from '../../material.module';

//import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      /*{ path: 'find', component: FindBookPageComponent },
      {
        path: ':id',
        component: ViewBookPageComponent,
        canActivate: [BookExistsGuard],
      },*/
     { path: '', component: SetupPageComponent , },
    ]),
    //StoreModule.forFeature('books', reducers),
    //EffectsModule.forFeature([BookEffects, CollectionEffects]),
  ],
  declarations: [SetupPageComponent, AccountPageComponent, AccountPreviewListComponent],
  exports: [SetupPageComponent, AccountPageComponent, AccountPreviewListComponent],
  //providers: [BookExistsGuard],
})
export class SetupModule {
    static forRoot() {
        return {
          ngModule: SetupModule,
        };
      }
}
