import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from as fromPromise, Observable } from 'rxjs';
import { AUTH_CONFIG } from '../models/auth0';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

// Avoid name not found warnings
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
    private helper = new JwtHelperService();

    AUTH_CONFIG = new AUTH_CONFIG();

    // Create Auth0 web auth instance
    auth0 = new auth0.WebAuth({
        clientID: this.AUTH_CONFIG.CLIENT_ID,
        domain: this.AUTH_CONFIG.CLIENT_DOMAIN
    });

    auth0Manage: any;

    constructor(
        private httpClient: HttpClient) {
        // If authenticated, set local profile property and update login status subject
        /* if (this.authenticated) {
           this.userProfile = new User(JSON.parse(localStorage.getItem('profile')));
           console.log(this.userProfile);
           this.setLoggedIn(true);
     
           this.auth0Manage = new auth0.Management({
             domain: this.AUTH_CONFIG.CLIENT_DOMAIN,
             token: localStorage.getItem('id_token')
           });
     
         }*/
    }

    login(): Observable<boolean> {
        // Auth0 authorize request
        // Note: nonce is automatically generated: https://auth0.com/docs/libraries/auth0js/v8#using-nonce
        this.auth0.authorize({
            responseType: 'token id_token',
            redirectUri: this.AUTH_CONFIG.REDIRECT,
            audience: this.AUTH_CONFIG.AUDIENCE,
            scope: this.AUTH_CONFIG.SCOPE
        });
        return of(true);
    }


}

