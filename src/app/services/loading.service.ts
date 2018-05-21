import { Component, Inject, forwardRef, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatSnackBarRef } from '@angular/material';
import { Subject, AnonymousSubject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { TimeInterval } from 'rxjs/operator/timeInterval';
import 'rxjs/Rx';
import { defaultIfEmpty } from 'rxjs/operators'
import { setTimeout } from 'timers';

import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import * as _ from 'lodash';


@Injectable()
export class LoadingService {

  public loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor() { }

  connect(): Observable<boolean> {
      return this.loadingSubject.asObservable();
  }

  disconnect(): void {
      this.loadingSubject.complete();
  }


  
}