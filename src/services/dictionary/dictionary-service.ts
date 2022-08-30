import { api } from '../../api/api';
import { view } from '../../view/view';
import { AggregatedWords, PaginatedResult, UsersWordsResponseSchema } from '../../types/types';
import SoundHelper from '../components/sound-helper';
import Loading from '../../view/components/loading';
import Credentials from '../auth/credentials';

export default class DictionaryService {
  soundHelper: SoundHelper;

  loading: Loading;

  soundIcons!: NodeListOf<HTMLElement>;

  removeBtns!: NodeListOf<HTMLElement>;

  constructor() {
    this.soundHelper = new SoundHelper();
    this.loading = new Loading();
  }

  async getWords(typeOfWords: 'learned' | 'hard'): Promise<PaginatedResult[]> {
    const aggregatedWords: AggregatedWords = await api.usersAggregatedWords.getAllUserAggregatedWords(
      Credentials.getUserId(),
      `{"userWord.difficulty":"${typeOfWords}"}`,
      undefined,
      0,
      0
    );
    return aggregatedWords.paginatedResults;
  }

  async drawPage(): Promise<void> {
    this.loading.createSpinners();
    const words: PaginatedResult[] = await this.getWords('hard');

    view.dictionaryView.drawPage(words);
    this.setCardsItems();
    this.listenCards();
    this.loading.delSpinners();
  }

  setCardsItems(): void {
    this.soundIcons = view.textbookView.textbook.querySelectorAll('.sound-icon');
    this.removeBtns = view.textbookView.textbook.querySelectorAll('.remove-word-btn');
  }

  playSound(event: Event): boolean {
    let elem: SVGUseElement | SVGSVGElement = event.target as SVGUseElement | SVGSVGElement;
    if (elem instanceof SVGUseElement) {
      elem = elem.parentNode as SVGSVGElement;
    }

    const currentAttr: string = (elem.firstChild as SVGUseElement).getAttributeNS(
      'http://www.w3.org/1999/xlink',
      'href'
    ) as string;

    if (currentAttr.includes('stop-fill')) {
      this.soundHelper.pause();
      view.htmlConstructor.changeSvg(elem.firstChild as SVGUseElement, 'volume-up-fill');
      return false;
    }

    this.soundIcons.forEach((item) => {
      view.htmlConstructor.changeSvg(item.firstChild as SVGUseElement, 'volume-up-fill');
    });

    this.soundHelper.play(elem as SVGSVGElement);
    return true;
  }

  async removeWord(event: Event): Promise<UsersWordsResponseSchema> {
    this.loading.createSpinners();
    const { id } = event.target as HTMLButtonElement;
    const startPositionOfWordId: number = id.lastIndexOf('-') + 1;
    const wordId: string = id.slice(startPositionOfWordId);
    const userId: string = Credentials.getUserId();
    let userWord;
    const response: UsersWordsResponseSchema | Response = await api.usersWords.getUserWordById(userId, wordId);

    if (response instanceof Response) {
      // console.log(`create learned word ${wordId}`);
      userWord = await api.usersWords.createUserWord(userId, wordId, { difficulty: 'learned', optional: {} });
    } else {
      // console.log(`update learned word ${wordId}`);
      userWord = await api.usersWords.updateUserWord(userId, wordId, { difficulty: 'learned', optional: {} });
    }

    view.textbookView.cardsContainer.cardGenerator.updateCardColor(event.target as HTMLElement, 'green');
    this.loading.delSpinners();
    return userWord;
  }

  listenCards(): void {
    this.soundIcons.forEach((item: Element): void => item.addEventListener('click', this.playSound.bind(this)));
    this.removeBtns.forEach((item: Element): void => item.addEventListener('click', this.removeWord.bind(this)));
  }
}
