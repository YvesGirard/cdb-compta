import { ChangeDetectionStrategy, Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { tap, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import * as MembersActions from '../actions/member.actions';
import * as fromMembers from '../reducers';
import * as MailinglistsMemberActions from '../actions/member.actions';

import { MailingListMember } from '../../../model/mail';
import { SelectionModel } from '@angular/cdk/collections';
import { MemberPageListComponent } from '../../../member/containers/member-page-list.component';

import * as frommailinglists from '../reducers';
import * as mailinglistActions from '../actions/mailinglist.actions';


@Component({
  selector: 'm-search-member-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="">
  <mat-grid-list cols="2" rowHeight="100px">

      <mat-grid-tile class="flex-left" colspan="2">
          <div class="header">
              <h1>Ajouter Membres</h1>
          </div>
      </mat-grid-tile>

      <mat-grid-tile class="flex-right" colspan="2">
          <button mat-raised-button color="primary" (click)="ajouter()">
              <mat-icon>add</mat-icon>Ajouter membre
          </button>
      </mat-grid-tile>

  </mat-grid-list>
  <m-member-page-list [displayedColumns]="displayedColumns"></m-member-page-list>
</div>
  `,
  styles: [
    `

  `,
  ],
})
export class SearchMemberPageComponent {
  actionsSubscription: Subscription;
  selected: Array<any>;

  displayedColumns = ['select',
    '_id',
    'given_name',
    'family_name',
    'email'
  ];

  @ViewChild(MemberPageListComponent, {static: true}) _list: MemberPageListComponent;

  constructor(private store: Store<frommailinglists.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => new mailinglistActions.SelectMailingList(params.id)))
      .subscribe(store);
  }


  ajouter(): void {
    if (this._list.selected.length) {
      this.store.dispatch(new MailinglistsMemberActions.AddMailingListMember(this._list.selected));
    }
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

}