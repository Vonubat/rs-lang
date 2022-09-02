import GamesCards from './games-cards';
import GamesLevels from './games-levels';
import StartGameView from './start-game';

export default class GamesView {
  gamesCards: GamesCards;

  startGameView: StartGameView;

  gamesLevels: GamesLevels;

  games!: HTMLElement;

  gamesCardsInstance!: HTMLElement;

  gamesMiniCardsInstance!: HTMLElement;

  gamesLevelsInstance!: HTMLElement;

  startLocation!: HTMLElement;

  constructor() {
    this.gamesCards = new GamesCards();
    this.gamesLevels = new GamesLevels();
    this.startGameView = new StartGameView();
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

  drawSprintStartLocation(game: 'sprint' | 'audio-challenge'): HTMLElement {
    this.startLocation = this.startGameView.drawStartLocation(this.games, game);

    return this.startLocation;
  }
}
