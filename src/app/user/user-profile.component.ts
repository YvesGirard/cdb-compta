import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { User, UserMetaData } from '../model/user';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoggerSnackbarService } from '../services/logger-snackbar.service';

const TITLES = [
  { id: 'MR', title: 'Monsieur' },
  { id: 'MD', title: 'Madame' },
  { id: 'MA', title: 'Mademoiselle' },
];

@Component({
  moduleId: module.id,
  selector: 'user-profile',
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  userProfile: User;
  titles = TITLES;

  userForm: FormGroup;

  constructor(
    private AuthService: AuthService,
    private UserService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private snackBarService: LoggerSnackbarService,
    ) { 
        this.createForm();
        this.handleFormChange();
    }
    
    createForm(): void {
      this.userForm = this.fb.group({
        name: '', 
        title: '',
        email: '',
        family_name: '',
        gender: '',
        given_name: '',
        birthday: null,
      });
      this.userForm.get('email').disable();
    }

  ngOnInit(): void {
    if (!this.AuthService.loggedIn) {
      this.gotoRoot();
    }

    this.userProfile = this.AuthService.getUserProfile();
    console.log(this.userProfile);
    var userFiltered = Object.keys(this.userProfile.user_metadata).filter(
      (key) => {
        return this.userForm.get(key);
      }).reduce((obj, key) => {
        obj[key] = this.userProfile.user_metadata[key];
        return obj;
      }, {});
     
    console.log("userFiltered");
    console.log(userFiltered);  
    this.userForm.setValue(userFiltered);
  }
  
  handleFormChange(): void {
    const given_nameControl = this.userForm.get('given_name');
    const family_nameControl = this.userForm.get('family_name');
    
    given_nameControl.valueChanges.forEach(
      (value: string) => this.userForm.patchValue({name: value + " " + this.userForm.value.family_name})
    );

    family_nameControl.valueChanges.forEach(
      (value: string) => this.userForm.patchValue({name: this.userForm.value.given_name + " " + value})
    );

  }

  save(): void {

    var metadata = Object.assign(new UserMetaData(this.userProfile.user_metadata),this.userForm.value);

    this.AuthService.updateUserProfile(metadata).then(user => {
      this.snackBarService.info("Enregistré");
     // this.userProfile = user
      })
      .catch((error) => {
        console.error(error)
        if (error.service) {
          this.snackBarService.info("Erreur lors de l'enregistrement");
          this.ngOnInit();
        }
      });
  }

  gotoRoot(): void {
    let link = ['/'];
    this.router.navigate(link);
  }
}
