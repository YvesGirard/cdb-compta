import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { OnInit } from '@angular/core';

@Component({
  moduleId: module.id,  
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ]
})

export class AppComponent implements OnInit {
  title = 'Liste des compétiteurs';
  public AuthService: AuthService
  private _loading: boolean = false;

  constructor(private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.AuthService = this.auth;
   // this.loading

  } 

}

