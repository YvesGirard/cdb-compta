import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromParticipants from '../reducers';
import * as ParticipantActions from '../../core/participant/actions/participant.actions';


@Component({
  selector: 'p-view-participant-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-selected-participant-page></p-selected-participant-page>
  `,
})
export class ViewParticipantPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromParticipants.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => new ParticipantActions.SelectParticipant(params.id)))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}