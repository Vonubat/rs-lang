import { PageConfigResponce, PaginatedResult, WordsResponseSchema } from '../../types/types';
import { view } from '../view';
import TextbookCardsContainer from './cards-container';
import Pagination from './pagination';

export default class TextbookView {
  cardsContainer: TextbookCardsContainer;

  pagination: Pagination;

  textbook!: HTMLElement;

  cardsContainerInstance!: HTMLElement;

  paginationTopInstance!: HTMLElement;

  paginationBottomInstance!: HTMLElement;

  constructor() {
    this.cardsContainer = new TextbookCardsContainer();
    this.pagination = new Pagination();
  }

  drawPage(words: WordsResponseSchema[] | PaginatedResult[], pageConfig: PageConfigResponce): void {
    this.textbook = document.getElementById('main') as HTMLElement;
    this.cardsContainerInstance = this.cardsContainer.generateCardContainer(words, pageConfig);
    this.paginationTopInstance = this.pagination.generatePaginationContainer('top', pageConfig);
    this.paginationBottomInstance = this.pagination.generatePaginationContainer('bottom', pageConfig);

    this.textbook.append(
      view.gamesView.drawMiniCards('textbook', pageConfig),
      this.paginationTopInstance,
      this.cardsContainerInstance,
      this.paginationBottomInstance
    );
    this.pagination.disableArrows(this.textbook, pageConfig);
    this.pagination.updateColor(pageConfig);
  }

  drawCardsContainer(words: WordsResponseSchema[] | PaginatedResult[], pageConfig: PageConfigResponce): void {
    this.cardsContainerInstance = this.cardsContainer.generateCardContainer(words, pageConfig);
    this.paginationTopInstance.after(this.cardsContainerInstance);
  }

  updatePaginationNumberCurrent(elements: NodeListOf<HTMLElement>, pageConfig: PageConfigResponce) {
    this.pagination.updateNumberCurrent(elements, pageConfig);
    this.pagination.disableArrows(this.textbook, pageConfig);
    this.pagination.updateColor(pageConfig);
  }
}
