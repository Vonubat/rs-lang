import GamesCards from './games-cards';

export default class GamesView {
  gamesCards: GamesCards;

  games!: HTMLElement;

  gamesCardsInstance!: HTMLElement;

  constructor() {
    this.gamesCards = new GamesCards();
  }

  drawCards(): void {
    this.games = document.getElementById('main') as HTMLElement;
    this.gamesCardsInstance = this.gamesCards.generateCards();

    this.games.append(this.gamesCardsInstance);
  }
}
