import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { MembersComponent } from './team/members.component';

export const COMPONENTS = [
  MembersComponent,
];

@NgModule({
  imports: [
      CommonModule,
      MaterialModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})

export class SharedModule {}
