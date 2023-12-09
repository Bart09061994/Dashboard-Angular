import { Injectable } from '@angular/core';
export interface StoreCard {
  id: number;
  name: string;
  imgSrc: string;
  detail: string;
  salesPage: string;
  editing?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class StoreCreateService {
  
  storeCards: StoreCard[] = [];
  constructor() {
    const storedStoreCards = localStorage.getItem('store-cards');
    if (storedStoreCards) {
      this.storeCards = JSON.parse(storedStoreCards);
    } else {
      this.storeCards = [];
      localStorage.setItem('store-counter', '1');
    }
  }
  createStoreCard(storeCard: StoreCard) {
    storeCard.id = this.getStoreCounter();
    storeCard.salesPage = `/store/${storeCard.id}`;
    this.storeCards.push(storeCard);
    this.saveStoreCardToLocalStorage();
  }
  getStoreCard(): StoreCard[] {
    return this.storeCards;
  }
  getStoredCardById(id: number): StoreCard | undefined {
    return this.storeCards.find((storeCard) => storeCard.id === id);
  }
  //MOD

  updateStoreCard(updateStore: StoreCard) {
    const index = this.storeCards.findIndex(
      (storeCard) => storeCard.id === updateStore.id
    );
    if (index !== -1) {
      this.storeCards[index] = updateStore;
      this.saveStoreCardToLocalStorage();
    }
  }
  //Delete

  deleteStore(storeCard: StoreCard) {
    const index = this.storeCards.indexOf(storeCard);
    if (index !== -1) {
      this.storeCards.splice(index, 1);
      this.saveStoreCardToLocalStorage();
    }
  }
  getStoreCounter(): number {
    let counter = Number(localStorage.getItem('store-counter'));
    counter++;
    localStorage.setItem('store-counter', counter.toString());
    return counter;
  }
  saveStoreCardToLocalStorage() {
    localStorage.setItem('store-cards', JSON.stringify(this.storeCards));
  }

  //Delete All Store

  deleteAllStore() {
    this.storeCards = [];
    this.saveStoreCardToLocalStorage();
  }
  
}
