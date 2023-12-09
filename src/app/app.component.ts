import { Component, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { User } from './components/model/user.model';

@Component({
  standalone: true,
  imports: [DashboardComponent, RouterModule, HttpClientModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Pannello-Amministrativo';
  constructor(private http: HttpClient, private AuthService: AuthService) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const user = JSON.parse('user');
        this.AuthService.createUser(
          user.mail,
          user.password,
          user.username,
          user.expirationDate,
          user.token
        );
      } catch {}
    }
  }
}
