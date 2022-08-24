import HTMLConstructor from '../components/constructor';
import CardsContainer from './cards-container';

export default class TextbookView extends HTMLConstructor {
  cardsContainer: CardsContainer;

  constructor() {
    super();
    this.cardsContainer = new CardsContainer();
  }

  async drawPage(): Promise<void> {
    await this.cardsContainer.generateCardContainer();
  }
}

const test: TextbookView = new TextbookView();
test.drawPage();
