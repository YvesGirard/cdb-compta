import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Member } from '../model/member';
import { Service } from '../services/service';
import { LoggerSnackbarService } from '../services/logger-snackbar.service';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class MemberService extends Service {
  private memberUrl = 'api/members';  // URL to web api

  constructor( protected http: Http
    ,public snackBarService: LoggerSnackbarService
    ,private authHttp: AuthHttp) {
    super(http, snackBarService);
    this.url = this.memberUrl;
  }

  getMembers(): Promise<Member[]> {
    return this.authHttp.get(this.memberUrl)
      .toPromise()
      .then(response => (response.json().data as Member[]))
      .catch(this.handleError);
  }

  create(member: Member): Promise<Member> {
    return this.http
      .post(this.memberUrl, JSON.stringify(member), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

