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

  @Component({
    selector: 'user-profile-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
      <div class="user-profile-form">
        <form [formGroup]="form">
          <div formGroupName="app_metadata">
            <mat-form-field class="cdb-input-full-width" dividerColor="primary">
            <input matInput formControlName="licence" placeholder="Licence FFD" name="licence">
            <mat-hint align="end">
              coucou
            </mat-hint>
            </mat-form-field>
          </div>

          <ng-content></ng-content>

          <div class="user-form__actions">
            <div class="cdb-list-separator">
              <button mat-raised-button (click)="updateUser(form)" color="primary">
                Enregistrer
              </button>	
            </div>
          </div>
        </form>
      </div>
    `,
  })
  export class ProfileFormComponent implements OnChanges {
    exists = false;
  
    @Input() user: User;
  
    @Output() update = new EventEmitter<User>();

  
    form = this.fb.group({
      app_metadata: this.fb.group({
        licence: [''],
        roles: ['']
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