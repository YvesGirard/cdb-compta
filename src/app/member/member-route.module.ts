import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MemberPageComponent } from './containers/member-page.component';
import { ViewMemberPageComponent } from './containers/view-member-page.component';

import { MemberExistsGuard } from './guards/member-exists.guard';
import { MemberModule } from './member.module';


@NgModule({
    imports: [
        CommonModule,
        MemberModule,
        RouterModule.forChild([
            {
              path: ':id',
              component: ViewMemberPageComponent,
              canActivate: [MemberExistsGuard],
            },
            { path: '', component: MemberPageComponent, },
        ]),
    ]
})
export class MemberRouteModule {
    static forRoot() {
        return {
            ngModule: MemberRouteModule,
        };
    }
}
