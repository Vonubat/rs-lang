import { PaginatedResult, WordsResponseSchema } from '../../types/types';
import { view } from '../../view/view';
import { services } from '../services';

export default class GamesService {
  gamesSprintCard!: HTMLDivElement;

  gamesAudioChallengeCard!: HTMLDivElement;

  backBtnToGames!: HTMLButtonElement;

  levelsWrapper!: HTMLDivElement;

  level!: number;

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
    view.loading.createSpinners();
    const { id } = event.currentTarget as HTMLElement;
    const game: 'sprint' | 'audio-challenge' = id.includes('sprint') ? 'sprint' : 'audio-challenge';
    const trigger: HTMLElement = event.target as HTMLElement;

    let words: WordsResponseSchema[] | PaginatedResult[];

    if (trigger.classList.contains('level')) {
      this.level = Number(trigger.innerText) - 1;
      words = await services.gamesData.prepareData(id, this.level);
    } else {
      words = await services.gamesData.prepareData(id);
    }

    view.gamesView.drawGame(game, words);
    view.loading.delSpinners();
  }

  setItems(): void {
    this.gamesSprintCard = document.getElementById('card-minigames-sprint') as HTMLDivElement;
    this.gamesAudioChallengeCard = document.getElementById('card-minigames-audio-challenge') as HTMLDivElement;
    this.backBtnToGames = view.gamesView.games.querySelector('.back-btn-to-games') as HTMLButtonElement;
    this.levelsWrapper = view.gamesView.games.querySelector('.wrapper-levels') as HTMLDivElement;
  }

  listenGamesCards(): void {
    this.gamesSprintCard.addEventListener('click', this.drawGamesLevels.bind(this));
    this.gamesAudioChallengeCard.addEventListener('click', this.drawGamesLevels.bind(this));
  }

  listenGamesLevels(): void {
    this.backBtnToGames.addEventListener('click', this.drawPage.bind(this));
    this.levelsWrapper.addEventListener('click', this.launchGame.bind(this));
  }
}
