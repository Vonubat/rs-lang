import GamesCards from './games-cards';
import GamesLevels from './games-leves';

export default class GamesView {
  gamesCards: GamesCards;

  gamesLevels: GamesLevels;

  games!: HTMLElement;

  gamesCardsInstance!: HTMLElement;

  gamesMiniCardsInstance!: HTMLElement;

  gamesLevelsInstance!: HTMLElement;

  constructor() {
    this.gamesCards = new GamesCards();
    this.gamesLevels = new GamesLevels();
  }

  drawCards(): void {
    this.games = document.getElementById('main') as HTMLElement;
    this.games.innerHTML = '';
    this.gamesCardsInstance = this.gamesCards.generateCards();

    this.games.append(this.gamesCardsInstance);
  }

  drawMiniCards(page: 'dictionary' | 'textbook'): HTMLElement {
    this.gamesMiniCardsInstance = this.gamesCards.generateMiniCards(page);

    return this.gamesMiniCardsInstance;
  }

  drawGamesLevels(game: 'sprint' | 'audio-challenge'): HTMLElement {
    this.games.innerHTML = '';
    this.gamesLevelsInstance = this.gamesLevels.generateGamesLevels(game);

    this.games.append(this.gamesLevelsInstance);
    return this.gamesLevelsInstance;
  }
}
