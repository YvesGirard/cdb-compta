import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { HttpModule } from '@angular/http';
import './rxjs-extensions';
//import { AUTH_PROVIDERS } from 'angular2-jwt';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { HeroesComponent } from './team/heroes.component';
import { MembersComponent } from './team/members.component';
import { MemberDetailComponent } from './team/member-detail.component';
import { HeroDetailComponent } from './team/hero-detail.component';
import { HeroService } from './services/hero.service';
import { MemberService } from './services/member.service';
import { MembersResolver } from './services/member.resolver';
import { UserService } from './services/user.service';
import { Service } from './services/service';
import { LoggerSnackbarComponent } from './entry/logger-snackbar.component';
import { MemberAddDialog } from './entry/member-add-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './team/hero-search.component';
import { UserProfileComponent }   from './user/user-profile.component';
import { HighlightDirective } from './directives/highlight.directive';
//import { MdlUpgradeElementDirective } from './directives/mdl-upgrade-element.directive';
import { AuthService } from './services/auth.service';
import { LoggerService } from './services/logger.service';
import { LoggerSnackbarService } from './services/logger-snackbar.service';


//import { MaterialModule } from '@angular/material';
import { CdbSelectModule } from './directives/select/select.directive';
//import { SetupComponent, CdbItem, AddDialog }   from './setup/setup.component';
//import { SetupComponent }   from './setup/setup.component';
import { MaterialModule } from './material.module';
import { CallbackComponent } from './services/callback.component';
import { Http, RequestOptions } from '@angular/http';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service
import { MailResolver } from './services/mail.resolver';
import { MailsComponent }      from './workflow/mails.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),    
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpModule,    
    MaterialModule,
    HttpClientModule,
   // MaterialModule.forRoot(),
    CdbSelectModule.forRoot(),
    //, InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  entryComponents: [ LoggerSnackbarComponent, MemberAddDialog, ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    MembersComponent,
    MailsComponent,    
    HeroDetailComponent,
    HeroSearchComponent,
    HighlightDirective,
    LoggerSnackbarComponent,
    UserProfileComponent,
    CallbackComponent,
    MemberAddDialog,
    MemberDetailComponent,
    //MdlUpgradeElementDirective,
   // SetupComponent,
   // CdbItem,
  //  AddDialog,
  ],
  bootstrap: [AppComponent],
  providers: [MembersResolver,
    MailResolver,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ],
    },
    Service,
    HeroService,
    UserService,
    MemberService,
   // AUTH_PROVIDERS,
    AuthService,
    LoggerService,
    LoggerSnackbarService,
    ]
})
export class AppModule {

}
