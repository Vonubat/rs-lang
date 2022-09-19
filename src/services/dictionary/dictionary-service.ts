import { api } from '../../api/api';
import { view } from '../../view/view';
import { AggregatedWords, PaginatedResult } from '../../types/types';
import Credentials from '../auth/credentials';
import Utils from '../../utilities/utils';
import AuthService from '../auth/auth-service';
import { services } from '../services';

export default class DictionaryService {
  private soundIcons!: NodeListOf<HTMLElement>;

  private removeBtns!: NodeListOf<HTMLElement>;

  private difficultWordsBtn!: HTMLButtonElement;

  private learnedWordsBtn!: HTMLButtonElement;

  private cardsCount!: number;

  private dictionaryMenuItem!: HTMLElement;

  private sprintGame!: HTMLDivElement;

  private audioChallengeGame!: HTMLDivElement;

  private gamesContainer!: HTMLDivElement;

  private async getWords(typeOfWords: 'learned' | 'hard'): Promise<PaginatedResult[]> {
    const aggregatedWords: AggregatedWords = await api.usersAggregatedWords.getAllUserAggregatedWords(
      Credentials.getUserId(),
      `{"userWord.difficulty":"${typeOfWords}"}`,
      3600
    );
    return aggregatedWords.paginatedResults;
  }

  public async drawPage(): Promise<void> {
    view.loading.createSpinners();
    const words: PaginatedResult[] = await this.getWords('hard');

    view.dictionaryView.drawPage(words);
    this.setCardsItems();
    this.listenCards();
    this.setSectionsItems();
    this.listenSections();
    this.hideGamesContainer();
    view.loading.delSpinners();
  }

  private async updatePage(event: Event): Promise<void> {
    view.loading.createSpinners();
    const { id } = event.target as HTMLButtonElement;
    let typeOfWords: 'learned' | 'hard';

    if (id === 'section-difficult-words') {
      typeOfWords = 'hard';
    } else {
      typeOfWords = 'learned';
    }

    const words: PaginatedResult[] = await this.getWords(typeOfWords);

    view.dictionaryView.drawCardsContainer(words);
    this.gamesContainer.classList.add('disabled');
    this.setCardsItems();
    this.listenCards();
    this.hideGamesContainer();
    view.loading.delSpinners();
  }

  private setCardsItems(): void {
    this.cardsCount = view.dictionaryView.dictionary.querySelectorAll('.dictionary-card').length;
    this.soundIcons = view.dictionaryView.dictionary.querySelectorAll('.sound-icon');
    this.removeBtns = view.dictionaryView.dictionary.querySelectorAll('.remove-word-btn');
  }

  private setSectionsItems(): void {
    this.difficultWordsBtn = view.dictionaryView.dictionary.querySelector(
      '.section-difficult-words'
    ) as HTMLButtonElement;
    this.learnedWordsBtn = view.dictionaryView.dictionary.querySelector('.section-learned-words') as HTMLButtonElement;
    this.sprintGame = document.getElementById('card-dictionary-sprint') as HTMLDivElement;
    this.audioChallengeGame = document.getElementById('card-dictionary-audio-challenge') as HTMLDivElement;
    this.gamesContainer = view.dictionaryView.dictionary.querySelector(
      '.mini-card-wrapper-games-dictionary'
    ) as HTMLDivElement;
  }

  private playSound(event: Event): boolean {
    let elem: SVGUseElement | SVGSVGElement = event.target as SVGUseElement | SVGSVGElement;
    if (elem instanceof SVGUseElement) {
      elem = elem.parentNode as SVGSVGElement;
    }

    const currentAttr: string = (elem.firstChild as SVGUseElement).getAttributeNS(
      'http://www.w3.org/1999/xlink',
      'href'
    ) as string;

    if (currentAttr.includes('stop-fill')) {
      services.soundHelper.pause();
      view.htmlConstructor.changeSvg(elem.firstChild as SVGUseElement, 'volume-up-fill');
      return false;
    }

    this.soundIcons.forEach((item: HTMLElement): void => {
      view.htmlConstructor.changeSvg(item.firstChild as SVGUseElement, 'volume-up-fill');
    });

    services.soundHelper.playQueue(elem as SVGSVGElement);
    return true;
  }

  private async removeWord(event: Event): Promise<void> {
    view.loading.createSpinners();
    const { target } = event;
    const { id } = event.target as HTMLButtonElement;
    const startPositionOfWordId: number = id.lastIndexOf('-') + 1;
    const wordId: string = id.slice(startPositionOfWordId);
    const userId: string = Credentials.getUserId();
    const card: HTMLElement = Utils.findAncestor(target as HTMLElement, 'card');
    await api.usersWords.deleteUserWord(userId, wordId);
    card.remove();

    this.cardsCount -= 1;

    if (this.cardsCount === 0) {
      const emptyCard: HTMLElement = view.dictionaryView.cardsContainer.generateEmptyCardContainer();
      view.dictionaryView.dictionary.append(emptyCard);
      this.hideGamesContainer();
    }

    view.loading.delSpinners();
  }

  private listenCards(): void {
    this.soundIcons.forEach((item: Element): void => item.addEventListener('click', this.playSound.bind(this)));
    this.removeBtns.forEach((item: Element): void => item.addEventListener('click', this.removeWord.bind(this)));
  }

  private listenSections(): void {
    this.difficultWordsBtn.addEventListener('click', this.updatePage.bind(this));
    this.learnedWordsBtn.addEventListener('click', this.updatePage.bind(this));
    this.sprintGame.addEventListener('click', services.gamesService.launchGame.bind(this));
    this.audioChallengeGame.addEventListener('click', services.gamesService.launchGame.bind(this));
  }

  public hideDictionaryItems(): void {
    this.dictionaryMenuItem = document.getElementById('menu-dictionary') as HTMLElement;
    if (AuthService.checkUser()) {
      if (this.dictionaryMenuItem) {
        this.dictionaryMenuItem.style.display = '';
      }
    } else if (this.dictionaryMenuItem) {
      this.dictionaryMenuItem.style.display = 'none';
    }
  }

  private hideGamesContainer(): void {
    if (this.cardsCount < 1) {
      this.gamesContainer.classList.add('disabled');
    } else {
      this.gamesContainer.classList.remove('disabled');
    }
  }
}
