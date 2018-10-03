import {
  Component, OnInit, OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { Mail } from '../model/mail';
import { MailService } from '../services/mail.service';
import { LoggerSnackbarService } from '../services/logger-snackbar.service';
//import { LoadingService } from '../services/loading.service';

@Component({
  moduleId: module.id,
  selector: 'mail-detail',
  templateUrl: 'mail-detail.component.html',
  styleUrls: ['mail-detail.component.css']
})


export class MailDetailComponent implements OnChanges {
  form: FormGroup;
  mail: Mail;

  constructor(
    private fb: FormBuilder,
    private mailService: MailService,
    private route: ActivatedRoute,
    private location: Location,
    private snackBarService: LoggerSnackbarService,
    //  private loadingService: LoadingService,
  ) {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.mailService.getMail(id)
        .then((mail) => {
          this.mail = mail;
          console.log(this.mail)
        });
    });
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      from: this.fb.array(
        [this.fb.group({
          _id:[''],
          address: [''],
        })]
      ),
      to: this.fb.array(
        [this.fb.group({
          _id:[''],
          address: [''],
        })]
      )      
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.mail && this.mail._id) {
      this.form.patchValue(this.mail);
    }
  }


  goBack(): void {
    this.location.back();
  }

  save(): void {
    //this.loadingService.loadingSubject.next(true);
    this.mailService.update(this.mail)
      .then(() => {
        // this.loadingService.loadingSubject.next(false);
        this.snackBarService.info("Enregistré")
      });
  }

  delete(): void {
    //this.memberService.delete(this.member)
    //  .then(() => {
    //    this.snackBarService.info("Supprimé");
    //    this.location.back();
    //  });
  }
}
