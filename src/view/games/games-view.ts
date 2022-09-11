import { services } from '../../services/services';
import { WordsResponseSchema, PaginatedResult } from '../../types/types';
import AudioChallengeView from './audio-challenge/audio-challenge-view';
import GamesCards from './games-cards';
import GamesLevels from './games-levels';
import GamesResults from './games-results';
import SprintGame from './sprint/sprint-view';
import StartGameView from './start-game';

export default class GamesView {
  private _gamesCards: GamesCards;

  public get gamesCards(): GamesCards {
    return this._gamesCards;
  }

  private _startGameView: StartGameView;

  public get startGameView(): StartGameView {
    return this._startGameView;
  }

  private _gamesLevels: GamesLevels;

  public get gamesLevels(): GamesLevels {
    return this._gamesLevels;
  }

  private _sprintView: SprintGame;

  public get sprintView(): SprintGame {
    return this._sprintView;
  }

  private _audioChallengeView: AudioChallengeView;

  public get audioChallengeView(): AudioChallengeView {
    return this._audioChallengeView;
  }

  private _gamesResults: GamesResults;

  public get gamesResults(): GamesResults {
    return this._gamesResults;
  }

  private _games!: HTMLElement;

  public get games(): HTMLElement {
    return this._games;
  }

  private _gamesCardsInstance!: HTMLElement;

  public get gamesCardsInstance(): HTMLElement {
    return this._gamesCardsInstance;
  }

  private _gamesMiniCardsInstance!: HTMLElement;

  public get gamesMiniCardsInstance(): HTMLElement {
    return this._gamesMiniCardsInstance;
  }

  private _gamesLevelsInstance!: HTMLElement;

  public get gamesLevelsInstance(): HTMLElement {
    return this._gamesLevelsInstance;
  }

  private _currentGame!: HTMLElement;

  public get currentGame(): HTMLElement {
    return this._currentGame;
  }

  constructor() {
    this._gamesCards = new GamesCards();
    this._gamesLevels = new GamesLevels();
    this._startGameView = new StartGameView();
    this._gamesResults = new GamesResults();
    this._sprintView = new SprintGame();
    this._audioChallengeView = new AudioChallengeView();
  }

  drawCards(): void {
    this._games = document.getElementById('main') as HTMLElement;
    this._games.innerHTML = '';
    this._gamesCardsInstance = this._gamesCards.generateCards();

    this._games.append(this._gamesCardsInstance);
  }

  drawMiniCards(page: 'dictionary' | 'textbook'): HTMLElement {
    this._gamesMiniCardsInstance = this._gamesCards.generateMiniCards(page);

    return this._gamesMiniCardsInstance;
  }

  drawGamesLevels(game: 'sprint' | 'audio-challenge'): HTMLElement {
    this._games = document.getElementById('main') as HTMLElement;
    this._games.innerHTML = '';
    this._gamesLevelsInstance = this._gamesLevels.generateGamesLevels(game);

    this._games.append(this._gamesLevelsInstance);
    return this._gamesLevelsInstance;
  }

  drawGame(game: 'sprint' | 'audio-challenge', words: WordsResponseSchema[] | PaginatedResult[]): HTMLElement {
    this._games = document.getElementById('main') as HTMLElement;
    if (game === 'sprint') {
      this._currentGame = this._startGameView.drawStartLocation(
        this._games,
        game,
        services.gamesService.sprintService.launchSprint.bind(services.gamesService.sprintService),
        words
      );
    } else {
      this._currentGame = this._startGameView.drawStartLocation(
        this._games,
        game,
        services.gamesService.audioChallengeService.launchAudioChallenge.bind(
          services.gamesService.audioChallengeService
        ),
        words
      );
    }

    return this._currentGame;
  }
}
