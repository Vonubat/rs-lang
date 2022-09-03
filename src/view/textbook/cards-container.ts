import { PaginatedResult, WordsResponseSchema } from '../../types/types';
import HTMLConstructor from '../components/constructor';
import { view } from '../view';

export default class TextbookCardsContainer extends HTMLConstructor {
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
      cardsContainer.append(view.textbookView.cardGenerator.generateCard(item));
    });

    return cardsContainer;
  }
}
