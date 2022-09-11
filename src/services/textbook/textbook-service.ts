import { api } from '../../api/api';
import { view } from '../../view/view';
import {
  AggregatedWords,
  PageConfigResponce,
  PaginatedResult,
  UsersWordsResponseSchema,
  WordsResponseSchema,
} from '../../types/types';
import AuthService from '../auth/auth-service';
import Credentials from '../auth/credentials';
import { services } from '../services';
import Utils from '../../utilities/utils';

export default class TextbookService {
  private stack: { [index: string]: number };

  private pageNumberItemsLeft!: NodeListOf<HTMLElement>;

  private pageNumberItemsRight!: NodeListOf<HTMLElement>;

  private groupNumberItemsLeft!: NodeListOf<HTMLElement>;

  private groupNumberItemsRight!: NodeListOf<HTMLElement>;

  private pageNumberCurrent!: NodeListOf<HTMLElement>;

  private groupNumberCurrent!: NodeListOf<HTMLElement>;

  private pageNumber!: NodeListOf<HTMLAnchorElement>;

  private groupNumber!: NodeListOf<HTMLElement>;

  private soundIcons!: NodeListOf<SVGSVGElement>;

  private difficultBtns!: NodeListOf<HTMLElement>;

  private learnedBtns!: NodeListOf<HTMLElement>;

  private sprintGame!: HTMLDivElement;

  private audioChallengeGame!: HTMLDivElement;

  private cards!: NodeListOf<HTMLDivElement>;

  private gamesContainer!: HTMLDivElement;

  constructor() {
    this.stack = {};
  }

  public async getWords(pageConfig: PageConfigResponce): Promise<WordsResponseSchema[] | PaginatedResult[]> {
    let words: WordsResponseSchema[] | PaginatedResult[];

    if (AuthService.checkUser()) {
      const aggregatedWords: AggregatedWords = await api.usersAggregatedWords.getAllUserAggregatedWords(
        Credentials.getUserId(),
        '',
        undefined,
        pageConfig.groupNumber,
        pageConfig.pageNumber
      );
      words = aggregatedWords.paginatedResults;
    } else {
      words = await api.words.getWords(pageConfig.groupNumber, pageConfig.pageNumber);
    }

    return words;
  }

  public async drawPage(): Promise<void> {
    view.loading.createSpinners();
    const pageConfig: PageConfigResponce = services.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] | PaginatedResult[] = await this.getWords(pageConfig);

    view.textbookView.drawPage(words, pageConfig);
    this.setPaginationItems();
    this.setCardsItems();
    this.listenPagination();
    this.listenCards();
    this.checkMaxStackOfWords();
    view.loading.delSpinners();
  }

  private setPaginationItems(): void {
    this.pageNumberItemsLeft = view.textbookView.textbook.querySelectorAll('.left-page-number');
    this.pageNumberItemsRight = view.textbookView.textbook.querySelectorAll('.right-page-number');
    this.groupNumberItemsLeft = view.textbookView.textbook.querySelectorAll('.left-group-number');
    this.groupNumberItemsRight = view.textbookView.textbook.querySelectorAll('.right-group-number');
    this.pageNumberCurrent = view.textbookView.textbook.querySelectorAll('.page-number-current');
    this.groupNumberCurrent = view.textbookView.textbook.querySelectorAll('.group-number-current');
    this.pageNumber = view.textbookView.textbook.querySelectorAll('.page-number');
    this.groupNumber = view.textbookView.textbook.querySelectorAll('.group-number');
    this.sprintGame = document.getElementById('card-textbook-sprint') as HTMLDivElement;
    this.audioChallengeGame = document.getElementById('card-textbook-audio-challenge') as HTMLDivElement;
    this.gamesContainer = view.textbookView.textbook.querySelector(
      '.mini-card-wrapper-games-textbook'
    ) as HTMLDivElement;
  }

  public setCardsItems(): void {
    this.soundIcons = view.textbookView.textbook.querySelectorAll('.sound-icon');
    this.difficultBtns = view.textbookView.textbook.querySelectorAll('.word-difficult-btn');
    this.learnedBtns = view.textbookView.textbook.querySelectorAll('.word-learned-btn');
    this.cards = view.textbookView.textbook.querySelectorAll('.card');
  }

  private async decreasePageNumber(): Promise<void> {
    view.loading.createSpinners();
    services.pageConfig.shiftPageNumber('-');

    const pageConfig: PageConfigResponce = services.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] | PaginatedResult[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.pageNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words, pageConfig);
    this.setCardsItems();
    this.listenCards();
    this.checkMaxStackOfWords();
    view.loading.delSpinners();
  }

  private async increasePageNumber(): Promise<void> {
    view.loading.createSpinners();
    services.pageConfig.shiftPageNumber('+');

    const pageConfig: PageConfigResponce = services.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] | PaginatedResult[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.pageNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words, pageConfig);
    this.setCardsItems();
    this.listenCards();
    this.checkMaxStackOfWords();
    view.loading.delSpinners();
  }

  private async decreaseGroupNumber(): Promise<void> {
    view.loading.createSpinners();
    services.pageConfig.shiftGroupNumber('-');

    const pageConfig: PageConfigResponce = services.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] | PaginatedResult[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.groupNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words, pageConfig);
    this.setCardsItems();
    this.listenCards();
    this.checkMaxStackOfWords();
    view.loading.delSpinners();
  }

  private async increaseGroupNumber(): Promise<void> {
    view.loading.createSpinners();
    services.pageConfig.shiftGroupNumber('+');

    const pageConfig: PageConfigResponce = services.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] | PaginatedResult[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.groupNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words, pageConfig);
    this.setCardsItems();
    this.listenCards();
    this.checkMaxStackOfWords();
    view.loading.delSpinners();
  }

  private async setPageNumber(event: Event): Promise<void> {
    view.loading.createSpinners();
    const value: number = Number((event.target as HTMLElement).innerText) - 1;
    services.pageConfig.setPageNumber(value);

    const pageConfig: PageConfigResponce = services.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] | PaginatedResult[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.pageNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words, pageConfig);
    this.setCardsItems();
    this.listenCards();
    this.checkMaxStackOfWords();
    view.loading.delSpinners();
  }

  private async setGroupNumber(event: Event): Promise<void> {
    view.loading.createSpinners();
    const value: number = Number((event.target as HTMLElement).innerText) - 1;
    services.pageConfig.setGroupNumber(value);

    const pageConfig: PageConfigResponce = services.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] | PaginatedResult[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.groupNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words, pageConfig);
    this.setCardsItems();
    this.listenCards();
    this.checkMaxStackOfWords();
    view.loading.delSpinners();
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

    this.soundIcons.forEach((item) => {
      view.htmlConstructor.changeSvg(item.firstChild as SVGUseElement, 'volume-up-fill');
    });

    services.soundHelper.playQueue(elem as SVGSVGElement);
    return true;
  }

  private async addDifficultWord(event: Event): Promise<UsersWordsResponseSchema> {
    view.loading.createSpinners();
    const { id } = event.target as HTMLButtonElement;
    const startPositionOfWordId: number = id.lastIndexOf('-') + 1;
    const wordId: string = id.slice(startPositionOfWordId);
    const userId: string = Credentials.getUserId();
    let userWord;
    const response: UsersWordsResponseSchema | Response = await api.usersWords.getUserWordById(userId, wordId);

    if (response instanceof Response) {
      // console.log(`create hard word ${wordId}`);
      userWord = await api.usersWords.createUserWord(userId, wordId, { difficulty: 'hard', optional: {} });
    } else {
      // console.log(`update hard word ${wordId}`);
      userWord = await api.usersWords.updateUserWord(userId, wordId, { difficulty: 'hard', optional: {} });
    }

    Utils.findAncestor(event.target as HTMLElement, 'card').classList.add('hard-word');
    this.checkMaxStackOfWords();
    view.loading.delSpinners();
    return userWord;
  }

  private async addLearnedWord(event: Event): Promise<UsersWordsResponseSchema> {
    view.loading.createSpinners();
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

    Utils.findAncestor(event.target as HTMLElement, 'card').classList.add('learned-word');
    this.checkMaxStackOfWords();
    view.loading.delSpinners();
    return userWord;
  }

  public checkMaxStackOfWords(): void {
    const currentPage: number = services.pageConfig.getPageNumber();
    this.stack[currentPage] = 0;
    this.cards.forEach((item: HTMLDivElement) => {
      if (item.classList.contains('learned-word') || item.classList.contains('hard-word')) {
        this.stack[currentPage] += 1;
      }
    });

    if (this.stack[currentPage] === 20) {
      Utils.resetBackground(view.textbookView.textbook, '#565e64');
      this.gamesContainer.classList.add('disabled');
      for (let i = 0; i < this.pageNumber.length; i += 1) {
        if (this.stack[i] === 20) {
          Utils.resetBackground(this.pageNumber[i], '#565e64');
        }
      }
    } else {
      this.gamesContainer.classList.remove('disabled');
      view.textbookView.color.switchColor(view.textbookView.textbook, services.pageConfig.getPageConfigResponse());
      for (let i = 0; i < this.pageNumber.length; i += 1) {
        if (this.stack[i] !== 20) {
          Utils.resetBackground(this.pageNumber[i]);
        }
      }
    }
  }

  private listenPagination(): void {
    this.pageNumberItemsLeft.forEach((item: Element): void =>
      item.addEventListener('click', this.decreasePageNumber.bind(this))
    );
    this.pageNumberItemsRight.forEach((item: Element): void =>
      item.addEventListener('click', this.increasePageNumber.bind(this))
    );
    this.groupNumberItemsLeft.forEach((item: Element): void =>
      item.addEventListener('click', this.decreaseGroupNumber.bind(this))
    );
    this.groupNumberItemsRight.forEach((item: Element): void =>
      item.addEventListener('click', this.increaseGroupNumber.bind(this))
    );
    this.pageNumber.forEach((item: Element): void => item.addEventListener('click', this.setPageNumber.bind(this)));
    this.groupNumber.forEach((item: Element): void => item.addEventListener('click', this.setGroupNumber.bind(this)));
    this.sprintGame.addEventListener('click', services.gamesService.launchGame.bind(this));
    this.audioChallengeGame.addEventListener('click', services.gamesService.launchGame.bind(this));
  }

  public listenCards(): void {
    this.soundIcons.forEach((item: Element): void => item.addEventListener('click', this.playSound.bind(this)));
    this.difficultBtns.forEach((item: Element): void =>
      item.addEventListener('click', this.addDifficultWord.bind(this))
    );
    this.learnedBtns.forEach((item: Element): void => item.addEventListener('click', this.addLearnedWord.bind(this)));
  }
}
