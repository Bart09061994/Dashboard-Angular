import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Card {
  id: number;
  name: string;
  imgSrc: string;
  detail: string;
  price: number;
  store: string;
  editing?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CreateCardService {
  cards: Card[] = [];

  constructor(private http: HttpClient) {
    const cards = localStorage.getItem('cards');
    if (cards) {
      this.cards = JSON.parse(cards);
    } else {
      this.cards = [];
      localStorage.setItem('cards-counter', '1');
    }
  }

  //Creazione

  createCard(card: Card) {
    card.id = this.getCounter();
    this.cards.push(card);
    this.saveToLocalStorage();
  }

  getCard(): Card[] {
    return this.cards;
  }

  getCardById(storeId: number): Card[] {
    return this.cards.filter((card) => card.store === storeId.toString());
  }

  // //MOD
  updateCard(updatedCard: Card) {
    const index = this.cards.findIndex((card) => card.id === updatedCard.id);
    if (index !== -1) {
      this.cards[index] = updatedCard;
      this.saveToLocalStorage();
    }
  }

  // //Delete

  deleteCard(card: Card) {
    const index = this.cards.indexOf(card);
    if (index !== -1) {
      this.cards.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  // //Metodi
  getCounter(): number {
    let counter = Number(localStorage.getItem('cards-counter'));
    counter++;
    localStorage.setItem('cards-counter', counter.toString());
    return counter;
  }

  // //salva Local
  saveToLocalStorage() {
    localStorage.setItem('cards', JSON.stringify(this.cards));
  }

  // //DeleteAll
  deleteAllCards() {
    this.cards = [];
    this.saveToLocalStorage();
  }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post('url_del_servizio_di_archiviazione', formData);
  }
}
