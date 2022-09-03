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

export default class TextbookService {
  pageNumberItemsLeft!: NodeListOf<HTMLElement>;

  pageNumberItemsRight!: NodeListOf<HTMLElement>;

  groupNumberItemsLeft!: NodeListOf<HTMLElement>;

  groupNumberItemsRight!: NodeListOf<HTMLElement>;

  pageNumberCurrent!: NodeListOf<HTMLElement>;

  groupNumberCurrent!: NodeListOf<HTMLElement>;

  pageNumber!: NodeListOf<HTMLElement>;

  groupNumber!: NodeListOf<HTMLElement>;

  soundIcons!: NodeListOf<SVGSVGElement>;

  difficultBtns!: NodeListOf<HTMLElement>;

  learnedBtns!: NodeListOf<HTMLElement>;

  sprintGame!: HTMLDivElement;

  audioChallengeGame!: HTMLDivElement;

  async getWords(pageConfig: PageConfigResponce): Promise<WordsResponseSchema[] | PaginatedResult[]> {
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

  async drawPage(): Promise<void> {
    view.loading.createSpinners();
    const pageConfig: PageConfigResponce = services.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] | PaginatedResult[] = await this.getWords(pageConfig);

    view.textbookView.drawPage(words, pageConfig);
    this.setPaginationItems();
    this.setCardsItems();
    this.listenPagination();
    this.listenCards();
    view.loading.delSpinners();
  }

  setPaginationItems(): void {
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
  }

  setCardsItems(): void {
    this.soundIcons = view.textbookView.textbook.querySelectorAll('.sound-icon');
    this.difficultBtns = view.textbookView.textbook.querySelectorAll('.word-difficult-btn');
    this.learnedBtns = view.textbookView.textbook.querySelectorAll('.word-learned-btn');
  }

  async decreasePageNumber(): Promise<void> {
    view.loading.createSpinners();
    services.pageConfig.shiftPageNumber('-');

    const pageConfig: PageConfigResponce = services.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] | PaginatedResult[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.pageNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words, pageConfig);
    this.setCardsItems();
    this.listenCards();
    view.loading.delSpinners();
  }

  async increasePageNumber(): Promise<void> {
    view.loading.createSpinners();
    services.pageConfig.shiftPageNumber('+');

    const pageConfig: PageConfigResponce = services.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] | PaginatedResult[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.pageNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words, pageConfig);
    this.setCardsItems();
    this.listenCards();
    view.loading.delSpinners();
  }

  async decreaseGroupNumber(): Promise<void> {
    view.loading.createSpinners();
    services.pageConfig.shiftGroupNumber('-');

    const pageConfig: PageConfigResponce = services.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] | PaginatedResult[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.groupNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words, pageConfig);
    this.setCardsItems();
    this.listenCards();
    view.loading.delSpinners();
  }

  async increaseGroupNumber(): Promise<void> {
    view.loading.createSpinners();
    services.pageConfig.shiftGroupNumber('+');

    const pageConfig: PageConfigResponce = services.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] | PaginatedResult[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.groupNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words, pageConfig);
    this.setCardsItems();
    this.listenCards();
    view.loading.delSpinners();
  }

  async setPageNumber(event: Event): Promise<void> {
    view.loading.createSpinners();
    const value: number = Number((event.target as HTMLElement).innerText) - 1;
    services.pageConfig.setPageNumber(value);

    const pageConfig: PageConfigResponce = services.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] | PaginatedResult[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.pageNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words, pageConfig);
    this.setCardsItems();
    this.listenCards();
    view.loading.delSpinners();
  }

  async setGroupNumber(event: Event): Promise<void> {
    view.loading.createSpinners();
    const value: number = Number((event.target as HTMLElement).innerText) - 1;
    services.pageConfig.setGroupNumber(value);

    const pageConfig: PageConfigResponce = services.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] | PaginatedResult[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.groupNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words, pageConfig);
    this.setCardsItems();
    this.listenCards();
    view.loading.delSpinners();
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

  async addDiffcultWord(event: Event): Promise<UsersWordsResponseSchema> {
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

    view.textbookView.cardGenerator.updateCardColor(event.target as HTMLElement, 'red');
    view.loading.delSpinners();
    return userWord;
  }

  async addLearnedWord(event: Event): Promise<UsersWordsResponseSchema> {
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

    view.textbookView.cardGenerator.updateCardColor(event.target as HTMLElement, 'green');
    view.loading.delSpinners();
    return userWord;
  }

  listenPagination(): void {
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

  listenCards(): void {
    this.soundIcons.forEach((item: Element): void => item.addEventListener('click', this.playSound.bind(this)));
    this.difficultBtns.forEach((item: Element): void =>
      item.addEventListener('click', this.addDiffcultWord.bind(this))
    );
    this.learnedBtns.forEach((item: Element): void => item.addEventListener('click', this.addLearnedWord.bind(this)));
  }
}
