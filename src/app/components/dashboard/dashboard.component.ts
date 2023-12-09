import { Component, OnInit } from '@angular/core';
import { SignUpComponent } from './../signUp/signUp.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule, NgIf } from '@angular/common';
import { MainstoreComponent } from './storedashboard/mainstore/mainstore.component';
import { BehaviorSubject } from 'rxjs';
import { CreateCardService } from 'src/app/services/create-card.service';
import { StoreComponent } from './storedashboard/mainstore/allstore/store/store.component';
import {
  StoreCard,
  StoreCreateService,
} from 'src/app/services/store-create.service';
@Component({
  standalone: true,

  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    SignUpComponent,
    HttpClientModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    RouterLink,
    MatIconModule,
    MatMenuModule,
    NgIf,
    MainstoreComponent,
    CommonModule,
    StoreComponent,
  ],
})
export class DashboardComponent implements OnInit {
  isDarkTheme = false;
  shops: any[] = [];
  storeCards: StoreCard[] = [];
  constructor(
    public AuthService: AuthService,
    private router: Router,
    private storeService: StoreCreateService
  ) {}
  ngOnInit() {
    this.storeCards = this.storeService.getStoreCard();
  }
  onLogOut() {
    this.AuthService.logOut();
    this.router.navigate(['/login']);
  }
}
