import { PaginatedResult, WordsResponseSchema } from '../../types/types';
import { view } from '../../view/view';
import { services } from '../services';
import AudioChallengeService from './audio-challenge/audio-challenge-service';
import GamesData from './games-data';
import SprintService from './sprint/sprint-service';
import Timer from './timer';

export default class GamesService {
  sprintService: SprintService;

  gamesData: GamesData;

  timer: Timer;

  audioChallengeService: AudioChallengeService;

  gamesSprintCard!: HTMLDivElement;

  gamesAudioChallengeCard!: HTMLDivElement;

  backBtnToGames!: HTMLButtonElement;

  levelsContainer!: HTMLDivElement;

  level!: number;

  constructor() {
    this.gamesData = new GamesData();
    this.timer = new Timer();
    this.sprintService = new SprintService();
    this.audioChallengeService = new AudioChallengeService();
  }

  drawPage(): void {
    view.gamesView.drawCards();
    this.setItems();
    this.listenGamesCards();
  }

  drawGamesLevels(event: Event): void {
    const { id } = event.currentTarget as HTMLElement;
    const game: 'sprint' | 'audio-challenge' = id.includes('sprint') ? 'sprint' : 'audio-challenge';
    view.gamesView.drawGamesLevels(game);
    this.setItems();
    this.listenGamesLevels();
  }

  async launchGame(event: Event): Promise<void> {
    const { id } = event.currentTarget as HTMLElement;

    if (id.includes('levels-container')) {
      return;
    }

    view.loading.createSpinners();
    const game: 'sprint' | 'audio-challenge' = id.includes('sprint') ? 'sprint' : 'audio-challenge';
    const trigger: HTMLElement = event.target as HTMLElement;

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

  setItems(): void {
    this.gamesSprintCard = document.getElementById('card-minigames-sprint') as HTMLDivElement;
    this.gamesAudioChallengeCard = document.getElementById('card-minigames-audio-challenge') as HTMLDivElement;
    this.backBtnToGames = view.gamesView.games.querySelector('.back-btn-to-games') as HTMLButtonElement;
    this.levelsContainer = view.gamesView.games.querySelector('.levels-container') as HTMLDivElement;
  }

  listenGamesCards(): void {
    this.gamesSprintCard.addEventListener('click', this.drawGamesLevels.bind(this));
    this.gamesAudioChallengeCard.addEventListener('click', this.drawGamesLevels.bind(this));
  }

  listenGamesLevels(): void {
    this.backBtnToGames.addEventListener('click', this.drawPage.bind(this));
    this.levelsContainer.addEventListener('click', this.launchGame.bind(this));
  }
}
