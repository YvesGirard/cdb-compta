import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { Member } from '../model/member';
import { Service } from '../services/service';
import { LoggerSnackbarService } from '../services/logger-snackbar.service';
import { map } from 'rxjs/operators';

@Injectable()
export class MemberService {
  private memberUrl = 'api/members';  // URL to web api
  private url: String;
  protected headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(protected http: HttpClient
    , public snackBarService: LoggerSnackbarService
    , private httpClient: HttpClient) {

    this.url = this.memberUrl;
  }

  getMembers(filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 10): Observable<any> {

    const params = new HttpParams().set('filter', filter).set('sortOrder', sortOrder);
    console.log(params.toString());

    return this.httpClient.get(this.memberUrl, {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).map((res) => {
      return res;
    });
  }

  getMember(id: number): Promise<Member> {
    return this.httpClient.get(`${this.memberUrl}/${id}`)
      .toPromise()
      .then((response :Member) => (response))
      .catch(this.handleError);
  }

  create(member: Member): Observable<Member> {
    return this.httpClient
      .post(this.memberUrl, JSON.stringify(member))
      .map((res: Member) => {
        return res;
      });;
  }

  public update(member: Member): Promise<Member> {
    const url = `${this.url}/${member._id}`;

    return this.httpClient
      .put(url, JSON.stringify(member))
      .toPromise()
      .then((member) => {
        return member;
      })
      .catch(this.handleError);
  }

  public delete(member: Member): Promise<Member> {
    const url = `${this.url}/${member._id}`;

    return this.httpClient
      .delete(url)
      .toPromise()
      .then((member) => {
        return member;
      })
      .catch(this.handleError);
  }

  public count() {
    return this.httpClient.get("/api/members", {
      params: new HttpParams()
        .set("count", "true")
    })
      .pipe(map(res => Number(res)));
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

    return this.httpClient
      .post(uploadMemberUrl, "test")
      .pipe(map((res) => {
        return res['data'];
      }
      ));
  }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

