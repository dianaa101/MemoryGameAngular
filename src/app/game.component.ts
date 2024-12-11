import { Component, OnInit } from '@angular/core';
import { CardService } from './card.service';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  cards: Card[] = [];
  flippedCards: Card[] = [];
  isGameOver: boolean = false;
  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.loadCards();
  }

  // load cards
  loadCards(): void {
    const cardData = this.cardService.getCards();

    //creating pairs of cards
    const pairs = [...cardData, ...cardData];

    // shuffle cards randomly
    this.cards = pairs
      .map((card) => ({ ...card, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    this.isGameOver = false;
  }

  // handling flip card action
  flipCard(card: Card): void {

    // prevents the card from flipping if conditions are met
    if (card.isFlipped || card.isMatched || this.flippedCards.length === 2) return;

    card.isFlipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.checkForMatch();
    }
  }

  // checks if two flipped cards match
  checkForMatch(): void {
    const [card1, card2] = this.flippedCards;

    // if two cards matched, they get marked as matched
    if (card1.value === card2.value) {
      card1.isMatched = true;
      card2.isMatched = true;
      this.flippedCards = [];


      if (this.cards.every(card => card.isMatched)) {
        this.isGameOver = true;
      }
      // if they didn't, flip them back after 1 second
    } else {
      setTimeout(() => {
        card1.isFlipped = false;
        card2.isFlipped = false;
        this.flippedCards = [];
      }, 1000);
    }
  }

  // restarts game
  restartGame(): void {
    this.loadCards();
    this.isGameOver = false;
  }
}
