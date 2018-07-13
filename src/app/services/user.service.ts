import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';


import { User } from '../model/user';
import { Service } from './service';
import { MatSnackBar } from '@angular/material';
import { LoggerSnackbarService } from './logger-snackbar.service';

@Injectable()
export class UserService extends Service {
  private userUrl = 'api/users';  // URL to web api

  constructor( protected http: Http
    ,public snackBarService: LoggerSnackbarService
    ,private httpClient: HttpClient) {
    super(http, snackBarService);
    this.url = this.userUrl;
  }

  getUsers(): Promise<User[]> {
    return this.httpClient.get(this.userUrl)
      .toPromise()
      .then((response: User[]) => response)
      .catch(this.handleError);
  }

  getUsersSlowly(): Promise<User[]> {
    return new Promise<User[]>(resolve =>
      setTimeout(resolve, 2000)) // delay 2 seconds
      .then(() => this.getUsers());
  }

  getUser(id: string): Promise<User> {
    return this.getUsers()
      .then(users => {console.log(users)
        return users.find(user => user._id === id);
      });
  }


  /*  update(user: User): Promise<User> {
      const url = `${this.userUrl}/${user._id}`;
      return this.http
        .put(url, JSON.stringify(user), { headers: this.headers })
        .toPromise()
        .then(() => user)
        .catch(this.handleError);
    }*/

  create(user: User): Promise<User> {
    return this.http
      .post(this.userUrl, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.userUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

