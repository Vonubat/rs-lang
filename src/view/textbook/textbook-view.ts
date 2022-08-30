import { PageConfigResponce, PaginatedResult, WordsResponseSchema } from '../../types/types';
import CardsContainer from './cards-container';
import Pagination from './pagination';

export default class TextbookView {
  cardsContainer: CardsContainer;

  pagination: Pagination;

  textbook: HTMLElement;

  cardsContainerInstance!: HTMLElement;

  paginationTopInstance!: HTMLElement;

  paginationBottomInstance!: HTMLElement;

  constructor() {
    this.cardsContainer = new CardsContainer();
    this.pagination = new Pagination();
    this.textbook = document.getElementById('body') as HTMLElement;
  }

  drawPage(words: WordsResponseSchema[] | PaginatedResult[], pageConfig: PageConfigResponce): void {
    this.textbook = document.getElementById('main') as HTMLElement;
    this.cardsContainerInstance = this.cardsContainer.generateCardContainer(words, pageConfig);
    this.paginationTopInstance = this.pagination.generatePaginationContainer('top', pageConfig);
    this.paginationBottomInstance = this.pagination.generatePaginationContainer('bottom', pageConfig);

    this.textbook.append(this.paginationTopInstance, this.cardsContainerInstance, this.paginationBottomInstance);
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
