import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';


import { Mail } from '../model/mail';
import { MailService } from '../services/mail.service';
import { LoggerSnackbarService } from '../services/logger-snackbar.service';

@Component({
  moduleId: module.id,    
  selector: 'mail-detail',
  templateUrl: 'mail-detail.component.html',
  styleUrls: [ 'mail-detail.component.css' ]
})

export class MailDetailComponent {
  constructor(
    private mailService: MailService,
    private route: ActivatedRoute,
    private location: Location,
    private snackBarService: LoggerSnackbarService,
  ) {
    this.route.params.subscribe( params => {
      let id = params['id'];
      this.mailService.getMail(id)
        .then(mail => this.mail = mail);
    });
  }

  mail: Mail;


  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.mailService.update(this.mail)
      .then(() => this.snackBarService.info("Enregistré"));
  }

  delete(): void {
    //this.memberService.delete(this.member)
    //  .then(() => {
    //    this.snackBarService.info("Supprimé");
    //    this.location.back();
    //  });
  }
}
