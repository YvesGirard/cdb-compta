import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User, UserMetaData } from '../model/user';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoggerSnackbarService } from '../services/logger-snackbar.service';
import * as deepEqual from 'deep-equal';

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
  userFiltered: any;

  titles = TITLES;

  userForm: FormGroup;
  private loading : boolean=false;


  constructor(
    private AuthService: AuthService,
    private userService: UserService,
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
     // this.userForm.get('email').disable();
    }

  ngOnInit(): void {
    if (!this.AuthService.loggedIn) {
      this.gotoRoot();
    }

    this.userProfile = this.AuthService.getUserProfile();
    this.rebuildForm();

  }
  
  rebuildForm():void {

    this.userFiltered = Object.keys(this.userProfile.user_metadata).filter(
      (key) => {
        return this.userForm.get(key);
      }).reduce((obj, key) => {
        obj[key] = this.userProfile.user_metadata[key];
        return obj;
      }, {});
     

    this.userForm.reset(this.userFiltered);
  }

  handleFormChange(): void {
    const given_nameControl = this.userForm.get('given_name');
    const family_nameControl = this.userForm.get('family_name');
    
    this.userForm.valueChanges.subscribe((data) => {
      if (deepEqual(this.userForm.value, this.userFiltered)) {
        this.userForm.markAsPristine();
        this.userForm.markAsUntouched();
      }
    });

    given_nameControl.valueChanges.forEach(
      (value: string) => this.userForm.patchValue({name: value + " " + this.userForm.value.family_name})
    );

    family_nameControl.valueChanges.forEach(
      (value: string) => this.userForm.patchValue({name: this.userForm.value.given_name + " " + value})
    );

  }


  save(): void {
    this.loading = true;
    //console.log("save")
    //console.log(this.userProfile)
    var updatedUser = Object.assign({},this.userProfile);

    updatedUser.user_metadata = Object.assign(new UserMetaData(this.userProfile.user_metadata),this.userForm.value);

    updatedUser.email = updatedUser.user_metadata.email;
    updatedUser.name = updatedUser.user_metadata.name;
    

    this.userService.update(updatedUser).then(user => {
      this.snackBarService.info("Enregistré");
      this.loading = false;
      this.userProfile = user;
      this.rebuildForm();
      })
      .catch((error) => {
        this.loading = false;
        console.error(error)
        if (error.service) {
          this.snackBarService.info("Erreur lors de l'enregistrement");
          this.ngOnInit();
        }
      });

    /*this.AuthService.updateUserProfile(metadata).then(user => {
      this.snackBarService.info("Enregistré");
      this.loading = false;
      this.userProfile = user;
      this.rebuildForm();
      })
      .catch((error) => {
        this.loading = false;
        console.error(error)
        if (error.service) {
          this.snackBarService.info("Erreur lors de l'enregistrement");
          this.ngOnInit();
        }
      });*/
  }



  gotoRoot(): void {
    let link = ['/'];
    this.router.navigate(link);
  }
}
