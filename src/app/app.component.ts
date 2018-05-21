import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';

@Component({
  moduleId: module.id,  
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ]
})

export class AppComponent {
  title = 'Liste des compétiteurs';
  public AuthService: AuthService

  constructor(private auth: AuthService,
    private loading: LoadingService,
  ) {}

  ngOnInit(): void {
    this.AuthService = this.auth;

  }
}

