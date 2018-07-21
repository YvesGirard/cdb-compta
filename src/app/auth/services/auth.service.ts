import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { AUTH_CONFIG } from '../models/auth0';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { User } from '../models/user';
import { AuthResult } from '../models/auth';
import { Auth } from '../models/auth';

// Avoid name not found warnings
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
   //private helper = new JwtHelperService();

    AUTH_CONFIG = new AUTH_CONFIG();

    // Create Auth0 web auth instance
    auth0 = new auth0.WebAuth({
        clientID: this.AUTH_CONFIG.CLIENT_ID,
        domain: this.AUTH_CONFIG.CLIENT_DOMAIN
    });

    auth0Manage: any;

    constructor(
        //private httpClient: HttpClient
    ) {
    }


    handleAuth(): Observable<AuthResult> {
        // When Auth0 hash parsed, get profile<Observable<User>>
        const promise = new Promise<AuthResult>((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {

                    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {

                        if (err)
                            return reject(err.error);

                        const expTime = authResult.expiresIn * 1000 + Date.now();

                        const uauthResult = new AuthResult();
                        uauthResult.auth = new Auth();
                        uauthResult.auth.token = authResult.accessToken;
                        uauthResult.auth.id_token = authResult.idToken;                       
                        uauthResult.auth.expires_at = expTime;                       

                        this.auth0Manage = new auth0.Management({
                            domain: this.AUTH_CONFIG.CLIENT_DOMAIN,
                            token: authResult.idToken
                        });

                        this.auth0Manage.getUser(profile.sub, (err, data) => {
                            if (err)
                                return reject(err.error);

                            uauthResult.user = data as User;

                            return resolve(uauthResult);
                        });
                    });

                } else if (err) {
                    return reject(err.error);
                }
            });
        });

        return from(promise);
    }

    login(): Observable<boolean> {
        // Auth0 authorize request
        this.auth0.authorize({
            responseType: 'token id_token',
            redirectUri: this.AUTH_CONFIG.REDIRECT,
            audience: this.AUTH_CONFIG.AUDIENCE,
            scope: this.AUTH_CONFIG.SCOPE
        });

        return of(true);
    }

    logout(): Observable<boolean> {
        return of(true);
    }
}

