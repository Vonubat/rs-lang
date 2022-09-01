import { view } from '../../view/view';

export default class GamesService {
  minigamesSprintCard!: HTMLDivElement;

  minigamesAudioChallengeCard!: HTMLDivElement;

  backBtnToGames!: HTMLButtonElement;

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

  setItems(): void {
    this.minigamesSprintCard = document.getElementById('card-minigames-sprint') as HTMLDivElement;
    this.minigamesAudioChallengeCard = document.getElementById('card-minigames-audio-challenge') as HTMLDivElement;
    this.backBtnToGames = view.gamesView.games.querySelector('.back-btn-to-games') as HTMLButtonElement;
  }

  listenGamesCards(): void {
    this.minigamesSprintCard.addEventListener('click', this.drawGamesLevels.bind(this));
    this.minigamesAudioChallengeCard.addEventListener('click', this.drawGamesLevels.bind(this));
  }

  listenGamesLevels(): void {
    this.backBtnToGames.addEventListener('click', this.drawPage.bind(this));
  }
}
