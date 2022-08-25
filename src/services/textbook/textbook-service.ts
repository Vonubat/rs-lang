import { api } from '../../api/api';
import { view } from '../../view/view';
import { PageConfigResponce, WordsResponseSchema } from '../../types/types';
import PageConfig from './page-config';

export default class TextbookService {
  pageConfig: PageConfig;

  pageNumberItemsLeft!: NodeListOf<Element>;

  pageNumberItemsRight!: NodeListOf<Element>;

  groupNumberItemsLeft!: NodeListOf<Element>;

  groupNumberItemsRight!: NodeListOf<Element>;

  pageNumberCurrent!: NodeListOf<Element>;

  groupNumberCurrent!: NodeListOf<Element>;

  constructor() {
    this.pageConfig = new PageConfig();
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
    this.listenPaginationPageNumber();
  }

  setPaginationItems(): void {
    this.pageNumberItemsLeft = view.textbookView.textbook.querySelectorAll('.left-page-number');
    this.pageNumberItemsRight = view.textbookView.textbook.querySelectorAll('.right-page-number');
    this.groupNumberItemsLeft = view.textbookView.textbook.querySelectorAll('.left-group-number');
    this.groupNumberItemsRight = view.textbookView.textbook.querySelectorAll('.right-group-number');
    this.pageNumberCurrent = view.textbookView.textbook.querySelectorAll('.page-number-current');
    this.groupNumberCurrent = view.textbookView.textbook.querySelectorAll('.group-number-current');
  }

  async decreasePageNumber(): Promise<void> {
    this.pageConfig.shiftPageNumber('-');

    const pageConfig: PageConfigResponce = this.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.pageNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words);
  }

  async increasePageNumber(): Promise<void> {
    this.pageConfig.shiftPageNumber('+');

    const pageConfig: PageConfigResponce = this.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.pageNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words);
  }

  async decreaseGroupNumber(): Promise<void> {
    this.pageConfig.shiftGroupNumber('-');

    const pageConfig: PageConfigResponce = this.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.groupNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words);
  }

  async increaseGroupNumber(): Promise<void> {
    this.pageConfig.shiftGroupNumber('+');

    const pageConfig: PageConfigResponce = this.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.groupNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words);
  }

  async setPageNumber(): Promise<void> {
    this.pageConfig.setPageNumber(5);

    const pageConfig: PageConfigResponce = this.pageConfig.getPageConfigResponse();
    const words: WordsResponseSchema[] = await this.getWords(pageConfig);

    view.textbookView.updatePaginationNumberCurrent(this.groupNumberCurrent, pageConfig);
    view.textbookView.drawCardsContainer(words);
  }

  listenPaginationPageNumber(): void {
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
    this.pageNumberCurrent.forEach((item: Element): void =>
      // item.addEventListener('click', this.setPageNumber.bind(this))
      console.log(item)
    );

    this.groupNumberCurrent.forEach((item: Element): void =>
      // item.addEventListener('click', this.setPageNumber.bind(this))
      console.log(item)
    );
  }
}
