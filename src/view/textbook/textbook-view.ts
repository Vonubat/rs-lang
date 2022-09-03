import { PageConfigResponce, PaginatedResult, WordsResponseSchema } from '../../types/types';
import { view } from '../view';
import TextbookCardGenerator from './card-generator';
import TextbookCardsContainer from './cards-container';
import Pagination from './pagination';
import TextbookColor from './textbook-color';

export default class TextbookView {
  cardsContainer: TextbookCardsContainer;

  cardGenerator: TextbookCardGenerator;

  pagination: Pagination;

  color: TextbookColor;

  textbook!: HTMLElement;

  cardsContainerInstance!: HTMLElement;

  paginationTopInstance!: HTMLElement;

  paginationBottomInstance!: HTMLElement;

  constructor() {
    this.cardsContainer = new TextbookCardsContainer();
    this.cardGenerator = new TextbookCardGenerator();
    this.pagination = new Pagination();
    this.color = new TextbookColor();
  }

  drawPage(words: WordsResponseSchema[] | PaginatedResult[], pageConfig: PageConfigResponce): void {
    this.textbook = document.getElementById('main') as HTMLElement;
    this.cardsContainerInstance = this.cardsContainer.generateCardContainer(words);
    this.paginationTopInstance = this.pagination.generatePaginationContainer('top', pageConfig);
    this.paginationBottomInstance = this.pagination.generatePaginationContainer('bottom', pageConfig);

    this.textbook.append(
      view.gamesView.drawMiniCards('textbook'),
      this.paginationTopInstance,
      this.cardsContainerInstance,
      this.paginationBottomInstance
    );
    this.pagination.disableArrows(this.textbook, pageConfig);
    this.color.switchColor(this.textbook, pageConfig);
  }

  drawCardsContainer(words: WordsResponseSchema[] | PaginatedResult[], pageConfig: PageConfigResponce): void {
    this.cardsContainerInstance = this.cardsContainer.generateCardContainer(words);
    this.paginationTopInstance.after(this.cardsContainerInstance);
    this.color.switchColor(this.textbook, pageConfig);
  }

  updatePaginationNumberCurrent(elements: NodeListOf<HTMLElement>, pageConfig: PageConfigResponce) {
    this.pagination.updateNumberCurrent(elements, pageConfig);
    this.pagination.disableArrows(this.textbook, pageConfig);
    this.color.switchColor(this.textbook, pageConfig);
  }
}
