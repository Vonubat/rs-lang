import { PageConfigResponce, WordsResponseSchema } from '../../types/types';
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

  drawPage(words: WordsResponseSchema[], pageConfig: PageConfigResponce): void {
    this.cardsContainerInstance = this.cardsContainer.generateCardContainer(words, pageConfig);
    this.paginationTopInstance = this.pagination.generatePaginationContainer('top', pageConfig);
    this.paginationBottomInstance = this.pagination.generatePaginationContainer('bottom', pageConfig);

    this.textbook.append(this.paginationTopInstance, this.cardsContainerInstance, this.paginationBottomInstance);
    this.pagination.disableArrows(this.textbook, pageConfig);
  }

  drawCardsContainer(words: WordsResponseSchema[], pageConfig: PageConfigResponce): void {
    this.cardsContainerInstance = this.cardsContainer.generateCardContainer(words, pageConfig);
    this.paginationTopInstance.append(this.cardsContainerInstance);
  }

  updatePaginationNumberCurrent(elements: NodeListOf<Element>, pageConfig: PageConfigResponce) {
    this.pagination.updateNumberCurrent(elements, pageConfig);
    this.pagination.disableArrows(this.textbook, pageConfig);
  }
}
