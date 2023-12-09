import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import {
  StoreCard,
  StoreCreateService,
} from 'src/app/services/store-create.service';

@Component({
  standalone: true,
  imports: [
    MatExpansionModule,
    RouterModule,
    RouterLink,
    FormsModule,
    CommonModule,
  ],
  selector: 'app-mainStore',
  templateUrl: './mainstore.component.html',
  styleUrls: ['./mainstore.component.css'],
})
export class MainstoreComponent implements OnInit {
  storeCards: StoreCard[] = [];
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  newStore: StoreCard = {
    id: 0,
    name: '',
    detail: '',
    imgSrc: '',
    salesPage: '',
  };
  constructor(
    private storeService: StoreCreateService,
    private router: Router,
    private AuthService: AuthService
  ) {
    this.isAdmin = this.AuthService.isRoleAdmin();
  }
  ngOnInit() {
    this.storeCards = this.storeService.getStoreCard();
    this.storeCards.forEach((storeCard) => (storeCard.editing = false));
  }
  createStore() {
    this.router.navigate(['/createStore']);
  }
  saveDataToLocalStorage() {
    localStorage.setItem('store-cards', JSON.stringify(this.storeCards));
  }
  readDataToLocalStore() {
    const storedStore = localStorage.getItem('storeCards');
    if (storedStore) {
      this.storeCards = JSON.parse(storedStore);
    }
  }
  //MOD
  openEditform(storeCard: StoreCard) {
    storeCard.editing = true;
  }
  cancelEditFrom(storeCard: StoreCard) {
    storeCard.editing = false;
  }
  updateStore(storeCard: StoreCard) {
    this.storeService.updateStoreCard(storeCard);
    storeCard.editing = false;
    this.saveDataToLocalStorage();
  }
  //Delete

  deleteStore(storeCard: StoreCard) {
    this.storeService.deleteStore(storeCard);
    this.storeCards = this.storeService.getStoreCard();
  }
  deleteAllStore() {
    this.storeService.deleteAllStore();
    this.storeCards = [];
    this.saveDataToLocalStorage();
  }
  getStoreCard(): StoreCard[] {
    return this.storeCards.slice();
  }
}
