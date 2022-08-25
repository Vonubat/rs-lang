import HTMLConstructor from '../components/constructor';
import CardsContainer from './cards-container';
import Pagination from './pagination';

export default class TextbookView extends HTMLConstructor {
  body: HTMLElement;

  cardsContainer: CardsContainer;

  pagination: Pagination;

  constructor() {
    super();
    this.body = document.getElementById('body') as HTMLElement;
    this.cardsContainer = new CardsContainer();
    this.pagination = new Pagination();
  }

  async drawPage(): Promise<void> {
    const paginationTop: HTMLElement = this.pagination.generatePaginationContainer('top');
    const cardsContainer: HTMLElement = await this.cardsContainer.generateCardContainer();
    const paginationBottom: HTMLElement = this.pagination.generatePaginationContainer('bottom');

    this.body.append(paginationTop, cardsContainer, paginationBottom);
  }
}

const test: TextbookView = new TextbookView();
test.drawPage();
