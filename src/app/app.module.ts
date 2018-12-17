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
//import { MembersComponent } from './team/members.component';
import { MemberDetailComponent } from './team/member-detail.component';
import { HeroDetailComponent } from './team/hero-detail.component';
import { HeroService } from './services/hero.service';
import { MemberService } from './services/member.service';
import { MailService } from './services/mail.service';
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
//import { CdbSelectModule } from './directives/select/select.directive';
//import { SetupComponent, CdbItem, AddDialog }   from './setup/setup.component';
//import { SetupComponent }   from './setup/setup.component';
import { MaterialModule } from './material.module';
import { CallbackComponent } from './services/callback.component';
import { Http, RequestOptions } from '@angular/http';
//import { AuthHttp, AuthConfig } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service
import { MailResolver } from './services/mail.resolver';
//import { MailsComponent }      from './workflow/mails.component';
//import { MailDetailComponent }   from './workflow/mail-detail.component';
import { LoaderService } from './loader/loader.service';
import { LoaderComponent } from './loader/loader.component';
import { httpInterceptorProviders } from './services/interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MailEffects } from './mailing/effects/mail.effects';
import { MailExistsGuard } from './mailing/guards/mail-exists.guard';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CoreModule } from './comptabilite/core/core.module';
import { reducers, metaReducers } from './core/reducers';
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { ParticipantModule } from './core/participant/participant.module';

import { UiParticipantModule } from './ui/participant/ui.participant.module';
import { UiMailingModule } from './ui/mailing/ui.mailing.module';

import { SharedModule } from './shared.module';

import * as fromMail from './mailing/reducers';
  
/*
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}*/

@NgModule({
  imports: [
    BrowserModule,    
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpModule,    
    MaterialModule,
    SharedModule,
    HttpClientModule,
    AuthModule.forRoot(),
    ParticipantModule.forRoot(),
   // MaterialModule.forRoot(),
  //  CdbSelectModule.forRoot(),
    //, InMemoryWebApiModule.forRoot(InMemoryDataService)
    StoreModule.forRoot(reducers,  {metaReducers}),
    StoreModule.forFeature('mails', fromMail.reducers),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Compta Store DevTools',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([
      MailEffects,
  ]),
  // Shared presentational components
  UiParticipantModule,
  UiMailingModule,
  
  //CoreModule.forRoot(),
  ],
  exports: [
      LoaderComponent
  ],
  entryComponents: [ LoggerSnackbarComponent, MemberAddDialog, ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    //MembersComponent,
    //MailsComponent,    
    HeroDetailComponent,
    HeroSearchComponent,
    HighlightDirective,
    LoggerSnackbarComponent,
    UserProfileComponent,
    CallbackComponent,
    MemberAddDialog,
    MemberDetailComponent,
    //MailDetailComponent,
    LoaderComponent,
    //MdlUpgradeElementDirective,
   // SetupComponent,
   // CdbItem,
  //  AddDialog,
  ],
  bootstrap: [AppComponent],
  providers: [
    httpInterceptorProviders,
    MembersResolver,
    MailResolver,
  /*  {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ],
    },*/
    Service,
    HeroService,
    UserService,
    MemberService,
    MailService,
   // AUTH_PROVIDERS,
    AuthService,
    LoggerService,
    LoggerSnackbarService,
    LoaderService,
    MailExistsGuard,
    ]
})
export class AppModule {

}
