import { PaginatedResult } from '../../types/types';
import HTMLConstructor from '../components/constructor';
import DictionaryCardGenerator from './card-generator';

export default class DictionaryCardsContainer extends HTMLConstructor {
  private cardGenerator: DictionaryCardGenerator;

  constructor() {
    super();
    this.cardGenerator = new DictionaryCardGenerator();
  }

  private createCardContainer(): HTMLElement {
    let cardsContainer: HTMLElement | null = document.getElementById('cards-container');

    if (cardsContainer) {
      cardsContainer.remove();
    }

    cardsContainer = this.createHtmlElement(
      'div',
      ['d-flex', 'flex-row', 'flex-wrap', 'justify-content-center', 'cards-container'],
      `cards-container`
    );

    return cardsContainer;
  }

  public generateCardContainer(words: PaginatedResult[]): HTMLElement {
    const cardsContainer: HTMLElement = this.createCardContainer();
    cardsContainer.innerHTML = '';

    words.forEach((item: PaginatedResult): void => {
      cardsContainer.append(this.cardGenerator.generateCard(item));
    });

    return cardsContainer;
  }

  public generateEmptyCardContainer(): HTMLElement {
    const cardsContainer: HTMLElement = this.createCardContainer();
    cardsContainer.innerHTML = '';

    cardsContainer.append(this.cardGenerator.createNoCardWord());

    return cardsContainer;
  }
}
