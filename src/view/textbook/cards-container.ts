import { PaginatedResult, WordsResponseSchema } from '../../types/types';
import HTMLConstructor from '../components/constructor';
import TextbookCardGenerator from './card-generator';

export default class TextbookCardsContainer extends HTMLConstructor {
  cardGenerator: TextbookCardGenerator;

  constructor() {
    super();
    this.cardGenerator = new TextbookCardGenerator();
  }

  createCardContainer(): HTMLElement {
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

  generateCardContainer(words: WordsResponseSchema[] | PaginatedResult[]): HTMLElement {
    const cardsContainer: HTMLElement = this.createCardContainer();
    cardsContainer.innerHTML = '';

    words.forEach((item: WordsResponseSchema | PaginatedResult): void => {
      cardsContainer.append(this.cardGenerator.generateCard(item));
    });

    return cardsContainer;
  }
}
