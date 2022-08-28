import Constants from '../../constants';
import AuthService from '../../services/auth/auth-service';
import { PageConfigResponce, WordsResponseSchema } from '../../types/types';
import HTMLConstructor from '../components/constructor';
import CardGenerator from './card-generator';

export default class CardsContainer extends HTMLConstructor {
  cardGenerator: CardGenerator;

  constructor() {
    super();
    this.cardGenerator = new CardGenerator();
  }

  createCardContainer(pageConfig: PageConfigResponce): HTMLElement {
    let cardsContainer: HTMLElement | null = document.getElementById('cards-container');

    if (cardsContainer) {
      cardsContainer.remove();
    }

    cardsContainer = this.createHtmlElement(
      'div',
      ['d-flex', 'flex-row', 'flex-wrap', 'justify-content-center', 'cards-container', 'rounded'],
      `cards-container`
    );

    switch (pageConfig.groupNumber) {
      case 0:
        cardsContainer.style.backgroundColor = Constants.CONTAINER_COLORS['$pink-100'];
        break;
      case 1:
        cardsContainer.style.backgroundColor = Constants.CONTAINER_COLORS['$orange-100'];
        break;
      case 2:
        cardsContainer.style.backgroundColor = Constants.CONTAINER_COLORS['$green-100'];
        break;
      case 3:
        cardsContainer.style.backgroundColor = Constants.CONTAINER_COLORS['$yellow-100'];
        break;
      case 4:
        cardsContainer.style.backgroundColor = Constants.CONTAINER_COLORS['$cyan-100'];
        break;
      case 5:
        cardsContainer.style.backgroundColor = Constants.CONTAINER_COLORS['$indigo-100'];
        break;

      default:
        cardsContainer.style.backgroundColor = 'white';

        break;
    }
    return cardsContainer;
  }

  generateCardContainer(words: WordsResponseSchema[], pageConfig: PageConfigResponce): HTMLElement {
    const authorized: boolean = AuthService.checkUser();
    const cardsContainer: HTMLElement = this.createCardContainer(pageConfig);
    cardsContainer.innerHTML = '';

    words.forEach((item: WordsResponseSchema): void => {
      cardsContainer.append(this.cardGenerator.generateCard(item, authorized));
    });

    return cardsContainer;
  }
}
