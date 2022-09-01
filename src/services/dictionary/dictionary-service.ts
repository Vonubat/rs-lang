import { api } from '../../api/api';
import { view } from '../../view/view';
import { AggregatedWords, PaginatedResult } from '../../types/types';
import SoundHelper from '../components/sound-helper';
import Loading from '../../view/components/loading';
import Credentials from '../auth/credentials';
import DomHelper from '../../utilities/DOM-helpers';
import AuthService from '../auth/auth-service';

export default class DictionaryService {
  soundHelper: SoundHelper;

  loading: Loading;

  soundIcons!: NodeListOf<HTMLElement>;

  removeBtns!: NodeListOf<HTMLElement>;

  difficultWordsBtn!: HTMLButtonElement;

  learnedWordsBtn!: HTMLButtonElement;

  cardsCount!: number;

  dictionaryMenuItem!: HTMLElement;

  constructor() {
    this.soundHelper = new SoundHelper();
    this.loading = new Loading();
  }

  async getWords(typeOfWords: 'learned' | 'hard'): Promise<PaginatedResult[]> {
    const aggregatedWords: AggregatedWords = await api.usersAggregatedWords.getAllUserAggregatedWords(
      Credentials.getUserId(),
      `{"userWord.difficulty":"${typeOfWords}"}`,
      3600,
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
    this.setSectionsItems();
    this.listenSections();
    this.loading.delSpinners();
  }

  async updatePage(event: Event): Promise<void> {
    this.loading.createSpinners();
    const { id } = event.target as HTMLButtonElement;
    let typeOfWords: 'learned' | 'hard';

    if (id === 'section-difficult-words') {
      typeOfWords = 'hard';
    } else {
      typeOfWords = 'learned';
    }

    const words: PaginatedResult[] = await this.getWords(typeOfWords);

    view.dictionaryView.drawCardsContainer(words);
    this.setCardsItems();
    this.listenCards();
    this.loading.delSpinners();
  }

  setCardsItems(): void {
    this.cardsCount = view.dictionaryView.dictionary.querySelectorAll('.card').length;
    this.soundIcons = view.dictionaryView.dictionary.querySelectorAll('.sound-icon');
    this.removeBtns = view.dictionaryView.dictionary.querySelectorAll('.remove-word-btn');
  }

  setSectionsItems(): void {
    this.difficultWordsBtn = view.dictionaryView.dictionary.querySelector(
      '.section-difficult-words'
    ) as HTMLButtonElement;
    this.learnedWordsBtn = view.dictionaryView.dictionary.querySelector('.section-learned-words') as HTMLButtonElement;
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

  async removeWord(event: Event): Promise<void> {
    this.loading.createSpinners();
    const { target } = event;
    const { id } = event.target as HTMLButtonElement;
    const startPositionOfWordId: number = id.lastIndexOf('-') + 1;
    const wordId: string = id.slice(startPositionOfWordId);
    const userId: string = Credentials.getUserId();
    const card = DomHelper.findAncestor(target as HTMLElement, 'card');
    await api.usersWords.deleteUserWord(userId, wordId);
    card.remove();
    // console.log(`delete word ${wordId}`);

    this.cardsCount -= 1;

    if (this.cardsCount === 0) {
      const emptyCard: HTMLElement = view.dictionaryView.cardsContainer.generateEmptyCardContainer();
      view.dictionaryView.dictionary.append(emptyCard);
    }

    this.loading.delSpinners();
  }

  listenCards(): void {
    this.soundIcons.forEach((item: Element): void => item.addEventListener('click', this.playSound.bind(this)));
    this.removeBtns.forEach((item: Element): void => item.addEventListener('click', this.removeWord.bind(this)));
  }

  listenSections(): void {
    this.difficultWordsBtn.addEventListener('click', this.updatePage.bind(this));
    this.learnedWordsBtn.addEventListener('click', this.updatePage.bind(this));
  }

  hideDictionaryItems(): void {
    this.dictionaryMenuItem = document.getElementById('menu-dictionary') as HTMLElement;
    if (AuthService.checkUser()) {
      if (this.dictionaryMenuItem) {
        this.dictionaryMenuItem.style.display = '';
      }
    } else if (this.dictionaryMenuItem) {
      this.dictionaryMenuItem.style.display = 'none';
    }
  }
}
