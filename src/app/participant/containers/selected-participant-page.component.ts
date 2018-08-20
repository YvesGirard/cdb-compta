import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromParticipants from '../../core/participant/reducers';
import * as CollectionActions from '../actions/collection.actions';
import * as ParticipantsActions from '../../core/participant/actions/participant.actions';

import { Participant } from '../../model/participant';

@Component({
  selector: 'p-selected-participant-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-participant-detail
      [participant]="participant$ | async"
      (update)="update($event)"
      (remove)="remove($event)">
    </p-participant-detail>
  `,
})
export class SelectedParticipantPageComponent {
  participant$: Observable<Participant>;

  constructor(private store: Store<fromParticipants.State>) {
    this.participant$ = store.pipe(select(fromParticipants.getSelectedParticipant)) as Observable<Participant>;
  }

  update(participant: Participant) {
    this.store.dispatch(new ParticipantsActions.UpdateParticipant(participant));
  }

  remove(participant: Participant) {
    this.store.dispatch(new ParticipantsActions.DeleteParticipant(participant));
  }
}