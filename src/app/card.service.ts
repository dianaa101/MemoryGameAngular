import { Injectable } from '@angular/core';
import { cards } from './data';

interface Card {
  id: number;
  value: string;
}

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor() {}

  getCards(): Card[] {
    return cards;
  }
}
