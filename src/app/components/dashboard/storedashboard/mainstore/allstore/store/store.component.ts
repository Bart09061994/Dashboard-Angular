import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreCreateService } from 'src/app/services/store-create.service';
import { CommonModule } from '@angular/common';
import { Card, CreateCardService } from 'src/app/services/create-card.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  storeData: any;
  storeCards: Card[] = [];
  newCard: Card = {
    id: 0,
    name: '',
    detail: '',
    price: 0,
    imgSrc: '',
    store: '',
  };
  constructor(
    private route: ActivatedRoute,
    private storeService: StoreCreateService,
    private createCardService: CreateCardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const storeIdStr = params.get('storeId');
      if (storeIdStr) {
        const storeId = +storeIdStr;
        this.storeData = this.storeService.getStoredCardById(storeId);
        const cards = this.createCardService.getCardById(storeId);
        if (Array.isArray(cards)) {
          this.storeCards = cards;
        }
      }
    });
  }

  createNewCard() {
    this.router.navigate(['/createCard', this.storeData.id]);
    this.saveToLocalStorage();
  }
  saveToLocalStorage() {
    localStorage.setItem('storeCards', JSON.stringify(this.storeCards));
  }
  readDataFromLocalStorage() {
    const storedCards = localStorage.getItem('storeCards');
    if (storedCards) {
      this.storeCards = JSON.parse(storedCards);
    }
  }
  editCard(card: Card) {
    card.editing = true;
  }

  cancelEdit(card: Card) {
    card.editing = false;
  }

  saveEdit(card: Card) {
    this.createCardService.updateCard(card);
    card.editing = false;
  }

  deleteCard(card: Card) {
    this.createCardService.deleteCard(card);
    this.storeCards = this.createCardService.getCardById(this.storeData.id);
  }
  deleteAllCards() {
    this.createCardService.deleteAllCards();
    this.storeCards = [];
  }
}
