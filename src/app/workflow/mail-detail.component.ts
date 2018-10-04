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
          console.log(this.mail);
          this.buildForm();
        });
    });
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      from: this.fb.array(
        [this.fb.group({
          _id: [''],
          address: [''],
        })]
      ),
      to: this.fb.array(
        [this.fb.group({
          _id: [''],
          address: [''],
        })]
      )
    });
  }

  buildForm(): void {
    if (this.mail && this.mail._id) {
      this.form.patchValue(this.mail);
      //this.setFrom();
      //this.setTo();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.buildForm();
  }

 /* setFrom(): void {
    let control = <FormArray>this.form.controls.from;
    this.mail.from.forEach(x => {
      control.push(this.fb.group({
        address: x.address
      }))
    })
  }

  setTo(): void {
    let control = <FormArray>this.form.controls.to;
    this.mail.to.forEach(x => {
      control.push(this.fb.group({
        address: x.address
      }))
    })
  }*/

  goBack(): void {
    this.location.back();
  }

  save(): void {
    const { value, valid } = this.form;

    Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
    });

    
    this.mail = { ...this.mail, ...value };
    console.log(this.mail)

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
