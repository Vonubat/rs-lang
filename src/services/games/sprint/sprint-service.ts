import { WordsResponseSchema, PaginatedResult } from '../../../types/types';
import { view } from '../../../view/view';

export default class SprintService {
  words: WordsResponseSchema[] | PaginatedResult[];

  constructor() {
    this.words = [];
  }

  launchSprint(words: WordsResponseSchema[] | PaginatedResult[]) {
    this.words = words;
    console.log(this.words);
    const page = view.gamesView.games;
    page.innerHTML = '';
    page.append(view.gamesView.sprintGame.generateGameContainer(words[0]));
  }
}
