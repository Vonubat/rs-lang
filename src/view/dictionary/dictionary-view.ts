import { PaginatedResult } from '../../types/types';
import { view } from '../view';
import DictionaryCardsContainer from './cards-container';
import DictionarySections from './dictionary-sections';

export default class DictionaryView {
  private _cardsContainer: DictionaryCardsContainer;

  private _dictionarySections: DictionarySections;

  private _cardsContainerInstance!: HTMLElement;

  private _dictionarySectionsInstance!: HTMLElement;

  private _paginationTopInstance!: HTMLElement;

  private _paginationBottomInstance!: HTMLElement;

  private _dictionary!: HTMLElement;

  constructor() {
    this._cardsContainer = new DictionaryCardsContainer();
    this._dictionarySections = new DictionarySections();
  }

  public get cardsContainer(): DictionaryCardsContainer {
    return this._cardsContainer;
  }

  public get dictionarySections(): DictionarySections {
    return this._dictionarySections;
  }

  public get cardsContainerInstance(): HTMLElement {
    return this._cardsContainerInstance;
  }

  public get dictionarySectionsInstance(): HTMLElement {
    return this._dictionarySectionsInstance;
  }

  public get paginationTopInstance(): HTMLElement {
    return this._paginationTopInstance;
  }

  public get paginationBottomInstance(): HTMLElement {
    return this._paginationBottomInstance;
  }

  public get dictionary(): HTMLElement {
    return this._dictionary;
  }

  drawPage(words: PaginatedResult[]): void {
    this._dictionary = document.getElementById('main') as HTMLElement;

    this._dictionarySectionsInstance = this.dictionarySections.createSectionsWordsWrapper();

    if (!words.length) {
      this._cardsContainerInstance = this._cardsContainer.generateEmptyCardContainer();
    } else {
      this._cardsContainerInstance = this._cardsContainer.generateCardContainer(words);
    }

    this.dictionary.append(
      view.gamesView.drawMiniCards('dictionary'),
      this._dictionarySectionsInstance,
      this._cardsContainerInstance
    );
  }

  drawCardsContainer(words: PaginatedResult[]): void {
    if (!words.length) {
      this._cardsContainerInstance = this._cardsContainer.generateEmptyCardContainer();
    } else {
      this._cardsContainerInstance = this._cardsContainer.generateCardContainer(words);
    }

    this.dictionary.append(this.cardsContainerInstance);
  }
}
