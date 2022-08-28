import { api } from '../../api/api';
import { view } from '../../view/view';
import { PageConfigResponce, WordsResponseSchema } from '../../types/types';
import PageConfig from './page-config';
import SoundHelper from './sound-helper';

export default class TextbookService {
  pageConfig: PageConfig;

  soundHelper: SoundHelper;

  pageNumberItemsLeft!: NodeListOf<Element>;

  pageNumberItemsRight!: NodeListOf<Element>;

  groupNumberItemsLeft!: NodeListOf<Element>;

  groupNumberItemsRight!: NodeListOf<Element>;

  pageNumberCurrent!: NodeListOf<Element>;

  groupNumberCurrent!: NodeListOf<Element>;

  pageNumber!: NodeListOf<Element>;

  groupNumber!: NodeListOf<Element>;

  soundIcons!: NodeListOf<Element>;

  constructor() {
    this.pageConfig = new PageConfig();
    this.soundHelper = new SoundHelper();
  }

  async getWords(pageConfig: PageConfigResponce): Promise<WordsResponseSchema[]> {
    const words: WordsResponseSchema[] = await api.words.getWords(pageConfig.groupNumber, pageConfig.pageNumber);
    return words;
  }

  async drawPage(): Promise<void> {
    const pageConfig: PageConfigResponce = this.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] = await this.getWords(pageConfig);

    view.textbookView.drawPage(words, pageConfig);
    this.setPaginationItems();
    this.setCardsItems();
    this.listenPagination();
    this.listenCards();
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
  }

  setCardsItems(): void {
    this.soundIcons = view.textbookView.textbook.querySelectorAll('.sound-icon');
  }

  async decreasePageNumber(): Promise<void> {
    this.pageConfig.shiftPageNumber('-');

    const pageConfig: PageConfigResponce = this.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.pageNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words);
    this.setCardsItems();
    this.listenCards();
  }

  async increasePageNumber(): Promise<void> {
    this.pageConfig.shiftPageNumber('+');

    const pageConfig: PageConfigResponce = this.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.pageNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words);
    this.setCardsItems();
    this.listenCards();
  }

  async decreaseGroupNumber(): Promise<void> {
    this.pageConfig.shiftGroupNumber('-');

    const pageConfig: PageConfigResponce = this.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.groupNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words);
    this.setCardsItems();
    this.listenCards();
  }

  async increaseGroupNumber(): Promise<void> {
    this.pageConfig.shiftGroupNumber('+');

    const pageConfig: PageConfigResponce = this.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.groupNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words);
    this.setCardsItems();
    this.listenCards();
  }

  async setPageNumber(event: Event): Promise<void> {
    const value: number = Number((event.target as HTMLElement).innerText) - 1;
    this.pageConfig.setPageNumber(value);

    const pageConfig: PageConfigResponce = this.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.pageNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words);
    this.setCardsItems();
    this.listenCards();
  }

  async setGroupNumber(event: Event): Promise<void> {
    const value: number = Number((event.target as HTMLElement).innerText) - 1;
    this.pageConfig.setGroupNumber(value);

    const pageConfig: PageConfigResponce = this.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.groupNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words);
    this.setCardsItems();
    this.listenCards();
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
  }

  playSound(event: Event): false | true {
    let elem: SVGUseElement | SVGSVGElement = event.target as SVGUseElement | SVGSVGElement;
    if (elem.tagName === 'use') {
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

  listenCards(): void {
    this.soundIcons.forEach((item: Element): void => item.addEventListener('click', this.playSound.bind(this)));
  }
}
