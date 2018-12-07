import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromMails from '../reducers';
import * as mailActions from '../actions/mail.actions';

@Component({
  selector: 'm-view-mail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <m-selected-mail-page></m-selected-mail-page>
  `,
})
export class ViewMailPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromMails.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => new mailActions.SelectMail(params.id)))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}