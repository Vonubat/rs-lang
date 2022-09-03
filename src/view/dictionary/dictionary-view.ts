import { PaginatedResult } from '../../types/types';
import { view } from '../view';
import DictionaryCardsContainer from './cards-container';
import DictionarySections from './dictionary-sections';

export default class DictionaryView {
  cardsContainer: DictionaryCardsContainer;

  dictionarySections: DictionarySections;

  cardsContainerInstance!: HTMLElement;

  dictionarySectionsInstance!: HTMLElement;

  paginationTopInstance!: HTMLElement;

  paginationBottomInstance!: HTMLElement;

  dictionary!: HTMLElement;

  constructor() {
    this.cardsContainer = new DictionaryCardsContainer();
    this.dictionarySections = new DictionarySections();
  }

  drawPage(words: PaginatedResult[]): void {
    this.dictionary = document.getElementById('main') as HTMLElement;

    this.dictionarySectionsInstance = this.dictionarySections.createSectionsWordsWrapper();

    if (!words.length) {
      this.cardsContainerInstance = this.cardsContainer.generateEmptyCardContainer();
    } else {
      this.cardsContainerInstance = this.cardsContainer.generateCardContainer(words);
    }

    this.dictionary.append(
      view.gamesView.drawMiniCards('dictionary'),
      this.dictionarySectionsInstance,
      this.cardsContainerInstance
    );
  }

  drawCardsContainer(words: PaginatedResult[]): void {
    if (!words.length) {
      this.cardsContainerInstance = this.cardsContainer.generateEmptyCardContainer();
    } else {
      this.cardsContainerInstance = this.cardsContainer.generateCardContainer(words);
    }

    this.dictionary.append(this.cardsContainerInstance);
  }
}
