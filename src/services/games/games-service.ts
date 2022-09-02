import { view } from '../../view/view';

export default class GamesService {
  minigamesSprintCard!: HTMLDivElement;

  minigamesAudioChallengeCard!: HTMLDivElement;

  backBtnToGames!: HTMLButtonElement;

  level!: HTMLDivElement;

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

  drawStartPageGame(event: Event): void {
    const { id } = event.currentTarget as HTMLElement;
    const game: 'sprint' | 'audio-challenge' = id.includes('sprint') ? 'sprint' : 'audio-challenge';
    view.gamesView.drawSprintStartLocation(game);
  }

  setItems(): void {
    this.minigamesSprintCard = document.getElementById('card-minigames-sprint') as HTMLDivElement;
    this.minigamesAudioChallengeCard = document.getElementById('card-minigames-audio-challenge') as HTMLDivElement;
    this.backBtnToGames = view.gamesView.games.querySelector('.back-btn-to-games') as HTMLButtonElement;
    this.level = view.gamesView.games.querySelector('.wrapper-levels') as HTMLDivElement;
  }

  listenGamesCards(): void {
    this.minigamesSprintCard.addEventListener('click', this.drawGamesLevels.bind(this));
    this.minigamesAudioChallengeCard.addEventListener('click', this.drawGamesLevels.bind(this));
  }

  listenGamesLevels(): void {
    this.backBtnToGames.addEventListener('click', this.drawPage.bind(this));
    this.level.addEventListener('click', this.drawStartPageGame.bind(this));
  }
}
