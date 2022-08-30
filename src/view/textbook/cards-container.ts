import { PageConfigResponce, PaginatedResult, WordsResponseSchema } from '../../types/types';
import HTMLConstructor from '../components/constructor';
import CardGenerator from './card-generator';
import TextbookColor from './textbook-color';

export default class CardsContainer extends HTMLConstructor {
  cardGenerator: CardGenerator;

  textbookColor: TextbookColor;

  constructor() {
    super();
    this.cardGenerator = new CardGenerator();
    this.textbookColor = new TextbookColor();
  }

  createCardContainer(pageConfig: PageConfigResponce): HTMLElement {
    let cardsContainer: HTMLElement | null = document.getElementById('cards-container');

    if (cardsContainer) {
      cardsContainer.remove();
    }

    cardsContainer = this.createHtmlElement(
      'div',
      ['d-flex', 'flex-row', 'flex-wrap', 'justify-content-center', 'cards-container'],
      `cards-container`
    );

    this.textbookColor.switchColor(cardsContainer, pageConfig);

    return cardsContainer;
  }

  generateCardContainer(words: WordsResponseSchema[] | PaginatedResult[], pageConfig: PageConfigResponce): HTMLElement {
    const cardsContainer: HTMLElement = this.createCardContainer(pageConfig);
    cardsContainer.innerHTML = '';

    words.forEach((item: WordsResponseSchema | PaginatedResult): void => {
      cardsContainer.append(this.cardGenerator.generateCard(item));
    });

    return cardsContainer;
  }
}
