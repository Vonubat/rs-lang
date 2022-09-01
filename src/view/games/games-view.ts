import GamesCards from './games-cards';

export default class GamesView {
  gamesCards: GamesCards;

  games!: HTMLElement;

  gamesCardsInstance!: HTMLElement;

  gamesMiniCardsInstance!: HTMLElement;

  constructor() {
    this.gamesCards = new GamesCards();
  }

  drawCards(): void {
    this.games = document.getElementById('main') as HTMLElement;
    this.gamesCardsInstance = this.gamesCards.generateCards();

    this.games.append(this.gamesCardsInstance);
  }

  drawMiniCards(page: 'dictionary' | 'textbook'): HTMLElement {
    this.games = document.getElementById('main') as HTMLElement;
    this.gamesMiniCardsInstance = this.gamesCards.generateMiniCards(page);

    return this.gamesMiniCardsInstance;
  }
}
