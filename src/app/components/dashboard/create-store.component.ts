import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  StoreCard,
  StoreCreateService,
} from 'src/app/services/store-create.service';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css'],
})
export class CreateStoreComponent {
  newStore: StoreCard = {
    id: 0,
    name: '',
    detail: '',
    imgSrc: '',
    salesPage: '',
  };
  constructor(
    private router: Router,
    private storeService: StoreCreateService,
    private http: HttpClient
  ) {}
  createNewStore(newStore: StoreCard) {
    if (newStore.name.trim() !== '') {
      this.storeService.createStoreCard(newStore);
      const newStoreId = newStore.id;
      this.onStoreCreated(newStoreId);
    }
    this.router.navigate(['']);
  }
  onStoreCreated(newStoreId: number) {
    this.router.navigate([`/store/${newStoreId}`]);
  }
}
