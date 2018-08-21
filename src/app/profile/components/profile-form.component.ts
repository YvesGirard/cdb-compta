import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    ChangeDetectionStrategy,
  } from '@angular/core';
  import {
    FormControl,
    FormGroup,
    FormArray,
    FormBuilder,
    Validators,
  } from '@angular/forms';
  
  import { map } from 'rxjs/operators';
  
  import { User } from '../../model/user';

  const TITLES = [
    { id: 'MR', title: 'Monsieur' },
    { id: 'MD', title: 'Madame' },
    { id: 'MA', title: 'Mademoiselle' },
  ];

  @Component({
    selector: 'user-profile-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'profile-form.component.html',
    styleUrls: ['profile-form.component.css']
  })
  export class ProfileFormComponent implements OnChanges {
    exists = false;
    titles = TITLES;

    @Input() user: User;
  
    @Output() update = new EventEmitter<User>();

  
    form = this.fb.group({
      user_metadata: this.fb.group({
        given_name: [''],
        gender: [''],
        family_name: [''],
        name: [''],
        title: [''],
        birthday: [''],
        email: [''],
      }),  
      app_metadata: this.fb.group({
        licence: [''],
        roles: [''],
        licence_verified: [''],
        user_email_verified: [''],
      }),    
    });
  
    constructor(private fb: FormBuilder) {}
  
    get licenceControl() {
      return this.form.get('licence') as FormControl;
    }
  
    get nameControlInvalid() {
      return this.licenceControl.hasError('required') && this.licenceControl.touched;
    }
  
    ngOnChanges(changes: SimpleChanges) {
      if (this.user && this.user.user_id) {
        this.exists = true;
  
        this.form.patchValue(this.user);
      }

    }
   
    updateUser(form: FormGroup) {
      const { value, valid, touched } = form;
      console.log(this.user)
      console.log(value)
      if (touched && valid) {
        this.update.emit({ ...this.user, ...value });
      }
    }
  

  }