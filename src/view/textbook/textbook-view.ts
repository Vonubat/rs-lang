import { WordsResponseSchema } from '../../types/types';
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

  drawPage(words: WordsResponseSchema[], currentNumber: number): void {
    this.cardsContainerInstance = this.cardsContainer.generateCardContainer(words);
    this.paginationTopInstance = this.pagination.generatePaginationContainer('top', currentNumber);
    this.paginationBottomInstance = this.pagination.generatePaginationContainer('bottom', currentNumber);
    this.textbook.append(this.paginationTopInstance, this.cardsContainerInstance, this.paginationBottomInstance);
  }
}
