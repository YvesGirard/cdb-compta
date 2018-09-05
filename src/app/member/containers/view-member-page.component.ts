import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromMembers from '../reducers';
import * as MemberActions from '../actions/member.actions';


@Component({
  selector: 'm-view-member-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <m-selected-member-page></m-selected-member-page>
  `,
})
export class ViewMemberPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromMembers.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => new MemberActions.SelectMember(params.id)))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}