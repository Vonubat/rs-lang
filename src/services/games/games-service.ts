import { PaginatedResult, WordsResponseSchema } from '../../types/types';
import { view } from '../../view/view';
import { Route } from '../routing/routing';
import { services } from '../services';
import AudioChallengeService from './audio-challenge/audio-challenge-service';
import GamesData from './games-data';
import SprintService from './sprint/sprint-service';
import Timer from './timer';

export default class GamesService {
  private _sprintService: SprintService;

  private gamesData: GamesData;

  private _timer: Timer;

  private _audioChallengeService: AudioChallengeService;

  private gamesSprintCard!: HTMLDivElement;

  private gamesAudioChallengeCard!: HTMLDivElement;

  private backBtnToGames!: HTMLButtonElement;

  private levelsContainer!: HTMLDivElement;

  private level!: number;

  constructor() {
    this.gamesData = new GamesData();
    this._timer = new Timer();
    this._sprintService = new SprintService();
    this._audioChallengeService = new AudioChallengeService();
  }

  get timer(): Timer {
    return this._timer;
  }

  get sprintService(): SprintService {
    return this._sprintService;
  }

  get audioChallengeService(): AudioChallengeService {
    return this._audioChallengeService;
  }

  public drawPage(): void {
    view.gamesView.drawCards();
    this.setItems();
    this.listenGamesCards();
  }

  private drawGamesLevels(event: Event): void {
    const { id } = event.currentTarget as HTMLElement;
    const game: 'sprint' | 'audio-challenge' = id.includes('sprint') ? 'sprint' : 'audio-challenge';
    view.gamesView.drawGamesLevels(game);
    this.setItems();
    this.listenGamesLevels();
  }

  public async launchGame(event: Event): Promise<void> {
    const { id } = event.currentTarget as HTMLElement;
    const trigger: HTMLElement = event.target as HTMLElement;
    const triggerId: string = trigger.id;

    if (triggerId.includes('levels-container')) {
      return;
    }

    if (!Route.checkUrl('games')) {
      window.location.hash = 'games';
    }

    view.loading.createSpinners();
    const game: 'sprint' | 'audio-challenge' = id.includes('sprint') ? 'sprint' : 'audio-challenge';

    let words: WordsResponseSchema[] | PaginatedResult[];

    if (trigger.classList.contains('level')) {
      this.level = Number(trigger.innerText) - 1;
      words = await services.gamesService.gamesData.prepareData(id, this.level);
    } else {
      words = await services.gamesService.gamesData.prepareData(id);
    }

    view.gamesView.drawGame(game, words);
    view.loading.delSpinners();
  }

  private setItems(): void {
    this.gamesSprintCard = document.getElementById('card-minigames-sprint') as HTMLDivElement;
    this.gamesAudioChallengeCard = document.getElementById('card-minigames-audio-challenge') as HTMLDivElement;
    this.backBtnToGames = view.gamesView.games.querySelector('.back-btn-to-games') as HTMLButtonElement;
    this.levelsContainer = view.gamesView.games.querySelector('.levels-container') as HTMLDivElement;
  }

  private listenGamesCards(): void {
    this.gamesSprintCard.addEventListener('click', this.drawGamesLevels.bind(this));
    this.gamesAudioChallengeCard.addEventListener('click', this.drawGamesLevels.bind(this));
  }

  private listenGamesLevels(): void {
    this.backBtnToGames.addEventListener('click', this.drawPage.bind(this));
    this.levelsContainer.addEventListener('click', this.launchGame.bind(this));
  }
}
