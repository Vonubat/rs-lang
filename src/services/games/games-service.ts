import { view } from '../../view/view';

export default class GamesService {
  drawPage(): void {
    view.gamesView.drawCards();
  }
}
