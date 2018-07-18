import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';


import * as AuthActions from './auth/actions/auth.actions';
import * as fromAuth from './auth/reducers';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Liste des compétiteurs';
  public AuthService: AuthService
  private _loading: boolean = false;

  // Login obversvable
  loggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(//private auth: AuthService,
    private store: Store<fromAuth.State>,
  ) { 
   this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
   this.isAdmin$ = this.store.pipe(select(fromAuth.isAdmin));
  }

  ngOnInit(): void {
    //this.AuthService = this.auth;
    // this.loading

  }

  login(): void {
    // Auth module login
    this.store.dispatch(new AuthActions.Login());
  }

  logout(): void {
    // Auth module logout
   this.store.dispatch(new AuthActions.Logout());
  }

}

