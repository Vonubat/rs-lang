import { PageConfigResponce, PaginatedResult, WordsResponseSchema } from '../../types/types';
import { view } from '../view';
import TextbookCardGenerator from './card-generator';
import TextbookCardsContainer from './cards-container';
import Pagination from './pagination';
import TextbookColor from './textbook-color';

export default class TextbookView {
  private _cardsContainer: TextbookCardsContainer;

  public get cardsContainer(): TextbookCardsContainer {
    return this._cardsContainer;
  }

  private _cardGenerator: TextbookCardGenerator;

  public get cardGenerator(): TextbookCardGenerator {
    return this._cardGenerator;
  }

  private _pagination: Pagination;

  public get pagination(): Pagination {
    return this._pagination;
  }

  private _color: TextbookColor;

  public get color(): TextbookColor {
    return this._color;
  }

  private _textbook!: HTMLElement;

  public get textbook(): HTMLElement {
    return this._textbook;
  }

  private _cardsContainerInstance!: HTMLElement;

  public get cardsContainerInstance(): HTMLElement {
    return this._cardsContainerInstance;
  }

  private _paginationTopInstance!: HTMLElement;

  public get paginationTopInstance(): HTMLElement {
    return this._paginationTopInstance;
  }

  private _paginationBottomInstance!: HTMLElement;

  public get paginationBottomInstance(): HTMLElement {
    return this._paginationBottomInstance;
  }

  constructor() {
    this._cardsContainer = new TextbookCardsContainer();
    this._cardGenerator = new TextbookCardGenerator();
    this._pagination = new Pagination();
    this._color = new TextbookColor();
  }

  drawPage(words: WordsResponseSchema[] | PaginatedResult[], pageConfig: PageConfigResponce): void {
    this._textbook = document.getElementById('main') as HTMLElement;
    this._cardsContainerInstance = this.cardsContainer.generateCardContainer(words);
    this._paginationTopInstance = this.pagination.generatePaginationContainer('top', pageConfig);
    this._paginationBottomInstance = this.pagination.generatePaginationContainer('bottom', pageConfig);

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
    this._cardsContainerInstance = this.cardsContainer.generateCardContainer(words);
    this.paginationTopInstance.after(this.cardsContainerInstance);
    this.color.switchColor(this.textbook, pageConfig);
  }

  updatePaginationNumberCurrent(elements: NodeListOf<HTMLElement>, pageConfig: PageConfigResponce) {
    this.pagination.updateNumberCurrent(elements, pageConfig);
    this.pagination.disableArrows(this.textbook, pageConfig);
    this.color.switchColor(this.textbook, pageConfig);
  }
}
