import { WordsResponseSchema } from '../../types/types';
import HTMLConstructor from '../components/constructor';
import CardGenerator from './card-generator';

export default class CardsContainer extends HTMLConstructor {
  cardGenerator: CardGenerator;

  constructor() {
    super();
    this.cardGenerator = new CardGenerator();
  }

  createCardContainer(): HTMLElement {
    const cardsContainer: HTMLElement | null = document.getElementById('cards-container');

    if (cardsContainer) {
      cardsContainer.remove();
    }
    return this.createHtmlElement(
      'div',
      ['d-flex', 'flex-row', 'flex-wrap', 'justify-content-center', 'cards-container'],
      `cards-container`
    );
  }

  generateCardContainer(words: WordsResponseSchema[]): HTMLElement {
    const cardsContainer: HTMLElement = this.createCardContainer();
    cardsContainer.innerHTML = '';

    words.forEach((item: WordsResponseSchema): void => cardsContainer.append(this.cardGenerator.generateCard(item)));

    return cardsContainer;
  }
}