import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';


import { Member } from '../model/member';
import { MemberService } from '../services/member.service';
import { LoggerSnackbarService } from '../services/logger-snackbar.service';

@Component({
  moduleId: module.id,    
  selector: 'member-detail',
  templateUrl: 'member-detail.component.html',
  styleUrls: [ 'member-detail.component.css' ]
})

export class MemberDetailComponent {
  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
    private location: Location,
    private snackBarService: LoggerSnackbarService,
  ) {
    this.route.params.subscribe( params => {
      let id = params['id'];
      this.memberService.getMember(id)
        .then(member => this.member = member);
    });
  }

  member: Member;

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.memberService.update(this.member)
      .then(() => this.snackBarService.info("Enregistré"));
  }

}
