import { controller } from '../../controller/controller';
import { WordsResponseSchema } from '../../types/types';
import HTMLConstructor from '../components/constructor';
import CardsContainer from './cards-container';
import Pagination from './pagination';

export default class TextbookView extends HTMLConstructor {
  cardsContainer: CardsContainer;

  pagination: Pagination;

  textbook: HTMLElement;

  cardsContainerInstance!: HTMLElement;

  paginationTopInstance: HTMLElement;

  paginationBottomInstance: HTMLElement;

  constructor() {
    super();
    this.cardsContainer = new CardsContainer();
    this.pagination = new Pagination();
    this.textbook = document.getElementById('body') as HTMLElement;
    this.paginationTopInstance = this.pagination.generatePaginationContainer('top');
    this.paginationBottomInstance = this.pagination.generatePaginationContainer('bottom');
  }

  async drawPage(): Promise<void> {
    const words: WordsResponseSchema[] = await controller.api.words.getWords();

    this.cardsContainerInstance = this.cardsContainer.generateCardContainer(words);
    this.textbook.append(this.paginationTopInstance, this.cardsContainerInstance, this.paginationBottomInstance);
  }
}

const test: TextbookView = new TextbookView();
test.drawPage();
console.dir(test);
