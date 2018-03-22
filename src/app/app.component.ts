import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  moduleId: module.id,  
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ]
})

export class AppComponent {
  title = 'Liste des compétiteurs';
  public AuthService: AuthService

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.AuthService = this.auth;

  }
}
