import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { Mail } from '../model/mail';
import { Service } from './service';
import { LoggerSnackbarService } from './logger-snackbar.service';
import { map } from 'rxjs/operators';
import { Headers } from '@angular/http';

@Injectable()
export class MailService {
  private mailUrl = 'api/mails';  // URL to web api
  private url: string;
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(protected http: HttpClient
    , public snackBarService: LoggerSnackbarService) {

    this.url = this.mailUrl;
  }

  getMails(filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 10): Observable<any> {

    return this.http.get(this.mailUrl, {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe(
      map((res: any) => {
      return res.data;
    }),
  )
  }

  public count(): Observable<number> {
   /* return this.authHttp.get(this.mailUrl, {
      params: new HttpParams()
        .set("count", "true").toString()
    })
      .pipe(map(res => Number(res.json().data)));*/

      return this.http.get<number>(this.url, {
        params: new HttpParams()
          .set("count", "true")
      }).pipe(
        map(counter => counter),
      )
  }


  getMail(id: number): Promise<Mail> {
    return this.http.get<Mail>(`${this.mailUrl}/${id}`)
      .toPromise()
      .then(response => (new Mail(response)))
      .catch(this.handleError);
  }

  /*
  create(member: Member): Observable<Member> {
    return this.authHttp
      .post(this.memberUrl, JSON.stringify(member))
      .map((res) => {
        return res.json().data as Member;
      });;
  }*/

  public update(mail: Mail): Promise<Mail> {
    const url = `${this.url}/${mail._id}`;

    return this.http
      .put(url, JSON.stringify(mail),
        this._options
      ).toPromise()
      .then((mail) => {
        return mail;
      })
      .catch(this.handleError);
  }

  public send(mail: Mail): Promise<Mail> {
    const url = `${this.url}/send/${mail._id}`;

    return this.http
      .post(url, JSON.stringify(mail),
        this._options
      ).toPromise()
      .then((mail) => {
        return mail;
      })
      .catch(this.handleError);
  }

  /*
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

