import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject ,  from as fromPromise ,  Observable } from 'rxjs';
import { AUTH_CONFIG } from '../interface/auth0-variables';
import { JwtHelperService  } from '@auth0/angular-jwt';
import { User, UserMetaData } from '../model/user';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';

// Avoid name not found warnings
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
  private helper = new JwtHelperService();

  private mailApiUrl = '/api/v2/mails';  // URL to web api
  protected headers = new Headers({ 'Content-Type': 'application/json' });
  
  AUTH_CONFIG = new AUTH_CONFIG();

  // Create Auth0 web auth instance
  // @TODO: Update AUTH_CONFIG and remove .example extension in src/app/auth/auth0-variables.ts.example
  auth0 = new auth0.WebAuth({
    clientID: this.AUTH_CONFIG.CLIENT_ID,
    domain: this.AUTH_CONFIG.CLIENT_DOMAIN
  });

  auth0Manage: any;

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);


  userProfile: User;
  
  constructor(private router: Router, private userService: UserService, private httpClient: HttpClient) {
    // If authenticated, set local profile property and update login status subject
    if (this.authenticated) {
      this.userProfile = new User(JSON.parse(localStorage.getItem('profile')));
      console.log(this.userProfile);
      this.setLoggedIn(true);

      this.auth0Manage = new auth0.Management({
        domain: this.AUTH_CONFIG.CLIENT_DOMAIN,
        token: localStorage.getItem('id_token')
      });

    }
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login() {
    // Auth0 authorize request
    // Note: nonce is automatically generated: https://auth0.com/docs/libraries/auth0js/v8#using-nonce
    this.auth0.authorize({
      responseType: 'token id_token',
      redirectUri: this.AUTH_CONFIG.REDIRECT,
      audience: this.AUTH_CONFIG.AUDIENCE,
      scope: this.AUTH_CONFIG.SCOPE
    });
  }

  sendVerificationEmail(): Observable<boolean> {
    const url = `${this.mailApiUrl}/verification/${this.userProfile._id}`;

    return this.httpClient.post(url, { headers: this.headers })
    .map((res: boolean) => {
      console.log(res);
      return res;
    });
  }


  handleAuth() {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._getProfile(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.error(`Error: ${err.error}`);
      }
    });
  }

  getUserProfile() {
    //.getUser(userId, cb);
    return this.userProfile;
  }

  updateUserProfile(metadata: UserMetaData): Promise<User> {


  return new Promise<User>((resolve, reject) => {
      // do some async stuff
      this.auth0Manage.patchUserMetadata(this.userProfile.sub, metadata, (err,data) => {
        if (err) err.service = "patchUserMetadata";
        (err)?reject(err):resolve(data);
      });
    }).then((val) => {
      Object.assign(this.userProfile, val);
      localStorage.setItem('profile', JSON.stringify(this.userProfile));

      return <Promise<User>> this.userService.update(this.userProfile);
    });

  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      this._setSession(authResult, profile);
    });
  }

  private _setSession(authResult, profile) {
    const expTime = authResult.expiresIn * 1000 + Date.now();   

    // Save session data and update login status subject
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expTime));
    
    this.auth0Manage = new auth0.Management({
      domain: this.AUTH_CONFIG.CLIENT_DOMAIN,
      token: authResult.idToken
    });

    //console.log(profile)
    // let credentials = profile.sub.split('|');
    //this.auth0Manage.getUser(profile.sub);

    this.auth0Manage.getUser(profile.sub, (err,data) => {

      Object.assign(data, profile);
      console.log("AUTH0")
      console.log(data);
      this.userProfile = new User(data);
      

      this.userService.getUser(this.userProfile._id)
        .then(user => {
          if (!user) {
            // create user
            this.userService.create(this.userProfile)
              .then(user => {
                localStorage.setItem('profile', JSON.stringify(this.userProfile));
                this.setLoggedIn(true);
              });
          } else {
            // update user
            this.userService.update(this.userProfile)
            .then(user => {
              localStorage.setItem('profile', JSON.stringify(this.userProfile));
              this.setLoggedIn(true);
              this.userProfile = user;
            });
          }

        });
    });


  }

  logout() {
    // Remove tokens and profile and update login status subject
    localStorage.removeItem('token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/']);
    this.setLoggedIn(false);
  }

  get authenticated(): boolean {
    // Check if current date is greater than expiration
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
  }

  get isAdmin(): boolean {
    return (this.userProfile) && this.userProfile.isAdmin();
  }

  get token(): string {
    return localStorage.getItem('token');
  }
}