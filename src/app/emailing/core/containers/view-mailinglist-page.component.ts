import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as frommailinglists from '../reducers';
import * as mailinglistActions from '../actions/mailinglist.actions';


@Component({
  selector: 'm-view-mailinglist-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <m-selected-mailinglist-page></m-selected-mailinglist-page>
  `,
})
export class ViewMailingListPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<frommailinglists.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => new mailinglistActions.SelectMailingList(params.id)))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}