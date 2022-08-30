import { PaginatedResult } from '../../types/types';
import DictionaryCardsContainer from './cards-container';

export default class DictionaryView {
  cardsContainer: DictionaryCardsContainer;

  cardsContainerInstance!: HTMLElement;

  paginationTopInstance!: HTMLElement;

  paginationBottomInstance!: HTMLElement;

  dictionary!: HTMLElement;

  constructor() {
    this.cardsContainer = new DictionaryCardsContainer();
  }

  drawPage(words: PaginatedResult[]): void {
    this.dictionary = document.getElementById('main') as HTMLElement;
    this.cardsContainerInstance = this.cardsContainer.generateCardContainer(words);

    this.dictionary.append(this.cardsContainerInstance);
  }

  drawCardsContainer(words: PaginatedResult[]): void {
    this.cardsContainerInstance = this.cardsContainer.generateCardContainer(words);
    this.dictionary.append(this.cardsContainerInstance);
  }
}
