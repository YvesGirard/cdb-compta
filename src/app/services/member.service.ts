import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Member } from '../model/member';
import { Service } from '../services/service';
import { LoggerSnackbarService } from '../services/logger-snackbar.service';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class MemberService extends Service {
  private memberUrl = 'api/members';  // URL to web api

  constructor(protected http: Http
    , public snackBarService: LoggerSnackbarService
    , private authHttp: AuthHttp) {
    super(http, snackBarService);
    this.url = this.memberUrl;
  }

  getMembers(filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3): Observable<Member[]> {

    const params = new HttpParams().set('filter', filter).set('sortOrder', sortOrder);
    console.log(params.toString());

    return this.authHttp.get(this.memberUrl, {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString()).toString()
    }).map((res) => {
      return res.json().data as Member[];
    });
  }

  getMember(id: number): Promise<Member> {
    return this.authHttp.get(`${this.memberUrl}/${id}`)
      .toPromise()
      .then(response => (response.json().data as Member))
      .catch(this.handleError);
  }

  create(member: Member): Observable<Member> {
    return this.authHttp
      .post(this.memberUrl, JSON.stringify(member), { headers: this.headers })
      .map((res) => {
        return res.json().data as Member;
      });;
  }

  public update(member: Member): Promise<Member> {
    const url = `${this.url}/${member._id}`;

    return this.authHttp
      .put(url, JSON.stringify(member), { headers: this.headers })
      .toPromise()
      .then((member) => {
        return member;
      })
      .catch(this.handleError);
  }

  public delete(member: Member): Promise<Member> {
    const url = `${this.url}/${member._id}`;

    return this.authHttp
      .delete(url, { headers: this.headers })
      .toPromise()
      .then((member) => {
        return member;
      })
      .catch(this.handleError);
  }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

