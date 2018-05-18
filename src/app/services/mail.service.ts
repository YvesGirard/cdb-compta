import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Mail } from '../model/mail';
import { Service } from '../services/service';
import { LoggerSnackbarService } from '../services/logger-snackbar.service';
import { AuthHttp } from 'angular2-jwt';
import { map } from 'rxjs/operators';

@Injectable()
export class MailService {
  private mailUrl = 'api/mails';  // URL to web api
  private url: String;
  protected headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(protected http: HttpClient
    , public snackBarService: LoggerSnackbarService
    , private authHttp: AuthHttp) {

    this.url = this.mailUrl;
  }

  getMails(filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 10): Observable<any> {

    const params = new HttpParams().set('filter', filter).set('sortOrder', sortOrder);
    console.log(params.toString());

    return this.authHttp.get(this.mailUrl, {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
        .toString()
    }).map((res) => {
      return res.json().data;
    });
  }

  public count() {
    return this.authHttp.get(this.mailUrl, {
      params: new HttpParams()
        .set("count", "true").toString()
    })
      .pipe(map(res => Number(res.json().data)));
  }

/*
  getMember(id: number): Promise<Member> {
    return this.authHttp.get(`${this.memberUrl}/${id}`)
      .toPromise()
      .then(response => (response.json().data as Member))
      .catch(this.handleError);
  }

  create(member: Member): Observable<Member> {
    return this.authHttp
      .post(this.memberUrl, JSON.stringify(member))
      .map((res) => {
        return res.json().data as Member;
      });;
  }

  public update(member: Member): Promise<Member> {
    const url = `${this.url}/${member._id}`;

    return this.authHttp
      .put(url, JSON.stringify(member))
      .toPromise()
      .then((member) => {
        return member;
      })
      .catch(this.handleError);
  }

  public delete(member: Member): Promise<Member> {
    const url = `${this.url}/${member._id}`;

    return this.authHttp
      .delete(url)
      .toPromise()
      .then((member) => {
        return member;
      })
      .catch(this.handleError);
  }

  public count() {
    return this.authHttp.get("/api/members", {
      params: new HttpParams()
        .set("count", "true").toString()
    })
      .pipe(map(res => Number(res.json().data)));
  }

  public uploadFile(formData: FormData): Observable<Object> {
    let uploadMemberUrl = '/api/members/upload';

    return this.http
      .post(uploadMemberUrl, formData)
      .pipe(map((res) => {
        return res['data'];
      }
      ));
  }

  public mailing(): Observable<Object> {
    let uploadMemberUrl = '/api/mails/v2/verification';

    return this.authHttp
      .post(uploadMemberUrl, "test")
      .pipe(map((res) => {
        return res['data'];
      }
      ));
  }
*/
  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

