import { services } from '../../services/services';
import { WordsResponseSchema, PaginatedResult } from '../../types/types';
import AudioChallengeView from './audio-challenge/audio-challenge-view';
import GamesCards from './games-cards';
import GamesLevels from './games-levels';
import GamesResults from './games-results';
import SprintGame from './sprint/sprint-view';
import StartGameView from './start-game';

export default class GamesView {
  gamesCards: GamesCards;

  startGameView: StartGameView;

  gamesLevels: GamesLevels;

  sprintView: SprintGame;

  audioChallengeView: AudioChallengeView;

  gamesResults: GamesResults;

  games!: HTMLElement;

  gamesCardsInstance!: HTMLElement;

  gamesMiniCardsInstance!: HTMLElement;

  gamesLevelsInstance!: HTMLElement;

  currentGame!: HTMLElement;

  constructor() {
    this.gamesCards = new GamesCards();
    this.gamesLevels = new GamesLevels();
    this.startGameView = new StartGameView();
    this.gamesResults = new GamesResults();
    this.sprintView = new SprintGame();
    this.audioChallengeView = new AudioChallengeView();
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
    this.games = document.getElementById('main') as HTMLElement;
    this.games.innerHTML = '';
    this.gamesLevelsInstance = this.gamesLevels.generateGamesLevels(game);

    this.games.append(this.gamesLevelsInstance);
    return this.gamesLevelsInstance;
  }

  drawGame(game: 'sprint' | 'audio-challenge', words: WordsResponseSchema[] | PaginatedResult[]): HTMLElement {
    this.games = document.getElementById('main') as HTMLElement;
    if (game === 'sprint') {
      this.currentGame = this.startGameView.drawStartLocation(
        this.games,
        game,
        services.gamesService.sprintService.launchSprint.bind(services.gamesService.sprintService),
        words
      );
    } else {
      this.currentGame = this.startGameView.drawStartLocation(
        this.games,
        game,
        services.gamesService.audioChallengeService.launchAudioChallenge.bind(
          services.gamesService.audioChallengeService
        ),
        words
      );
    }

    return this.currentGame;
  }
}
