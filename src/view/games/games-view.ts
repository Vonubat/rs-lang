import { services } from '../../services/services';
import { WordsResponseSchema, PaginatedResult } from '../../types/types';
import GamesCards from './games-cards';
import GamesLevels from './games-levels';
import SprintGame from './sprint/sprint-game';
import StartGameView from './start-game';

export default class GamesView {
  gamesCards: GamesCards;

  startGameView: StartGameView;

  gamesLevels: GamesLevels;

  sprintGame: SprintGame;

  games!: HTMLElement;

  gamesCardsInstance!: HTMLElement;

  gamesMiniCardsInstance!: HTMLElement;

  gamesLevelsInstance!: HTMLElement;

  currentGame!: HTMLElement;

  constructor() {
    this.gamesCards = new GamesCards();
    this.gamesLevels = new GamesLevels();
    this.startGameView = new StartGameView();
    this.sprintGame = new SprintGame();
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

  drawGame(game: 'sprint' | 'audio-challenge', words: WordsResponseSchema[] | PaginatedResult[]): HTMLElement {
    if (game === 'sprint') {
      this.currentGame = this.startGameView.drawStartLocation(
        this.games,
        game,
        words,
        services.sprintService.launchSprint
      );
    }

    /*  this.currentGame = this.startGameView.drawStartLocation(
      this.games,
      game,
      words,
      services.sprintService.launchSprint
    ); */

    return this.currentGame;
  }
}
