import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  moduleId: module.id,  
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {

  users: User[] = [];
  authSubscription: Subscription;

  constructor(  
    private router: Router,
    private userService: UserService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit DashboardComponent');

    this.authSubscription = this.auth.loggedIn$
    .subscribe(loggedIn => {
      if (loggedIn) {
        this._getUsers();
      } else {
        this.users = null;
      }
    }
  );

  }

  private _getUsers() {
    this.userService.getUsers()
      .then(users => this.users = users.slice(0, 4)); 
  }

  gotoDetail(user: User): void {
    let link = ['/detail', user._id];
    this.router.navigate(link);
  }
}
