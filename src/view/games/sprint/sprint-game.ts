import { services } from '../../../services/services';
import HTMLConstructor from '../../components/constructor';

export default class SprintGame extends HTMLConstructor {
  newWord!: HTMLElement;

  newTranslate!: HTMLElement;

  createPointsWrapper(): HTMLElement {
    const classList: string[] = [
      'd-flex',
      'flex-column',
      'justify-content-center',
      'align-items-center',
      `points-wrapper`,
    ];
    const pointsWrapper: HTMLElement = this.createHtmlElement('div', classList, `wrapper-points-sprint`);
    return pointsWrapper;
  }

  createPoints(): HTMLElement {
    const classList: string[] = [`points-sprint`];
    const points: HTMLElement = this.createHtmlElement('h2', classList, `points-sprint`, undefined, `0`);
    return points;
  }

  createMultiplicator(): HTMLElement {
    const classList: string[] = ['multiplicator'];
    const multiplicator: HTMLElement = this.createHtmlElement(
      'h4',
      classList,
      `multiplicator-sprint`,
      undefined,
      `+ 10 points`
    );
    return multiplicator;
  }

  createSteps(): HTMLElement {
    const stepsWrapper: HTMLElement = this.createHtmlElement('div', [
      'd-flex',
      'flex-row',
      'justify-content-center',
      'align-items-center',
      `steps-wrapper`,
    ]);
    for (let i = 1; i <= 3; i += 1) {
      const step: HTMLElement = this.createHtmlElement('span', ['badge'], `step-${i}`, undefined, ' ');
      stepsWrapper.append(step);
    }
    return stepsWrapper;
  }

  generatePointsWrapper(): HTMLElement {
    const pointsWrapper: HTMLElement = this.createPointsWrapper();
    const points: HTMLElement = this.createPoints();
    const multiplicator: HTMLElement = this.createMultiplicator();
    const steps: HTMLElement = this.createSteps();
    pointsWrapper.append(points, multiplicator, steps);
    return pointsWrapper;
  }

  createCardContainer(): HTMLElement {
    const classList: string[] = [
      'd-flex',
      'flex-column',
      'justify-content-center',
      'align-items-center',
      'flex-wrap',
      'rounded',
      'shadow',
      'bg-light',
      'bg-gradient',
      `card-container`,
    ];
    const cardContainer: HTMLElement = this.createHtmlElement('div', classList);
    return cardContainer;
  }

  createWord(wordId: string, word: string): HTMLElement {
    if (!this.newWord) {
      const classList: string[] = [];
      const newWord: HTMLElement = this.createHtmlElement(
        'h4',
        classList,
        `sprint-word-${wordId}`,
        undefined,
        `${word}`
      );
      this.newWord = newWord;
      return this.newWord;
    }
    this.newWord.innerHTML = word;
    this.newWord.id = `sprint-word-${wordId}`;
    return this.newWord;
  }

  createWordTranslate(wordId: string, wordTranslate: string): HTMLElement {
    if (!this.newTranslate) {
      const classList: string[] = ['text-muted'];
      const newTranslate: HTMLElement = this.createHtmlElement(
        'h4',
        classList,
        `sprint-wordTranslate-${wordId}`,
        undefined,
        `${wordTranslate}`
      );
      this.newTranslate = newTranslate;
      return this.newTranslate;
    }
    this.newTranslate.innerHTML = wordTranslate;
    this.newTranslate.id = `sprint-translate-${wordId}`;
    return this.newTranslate;
  }

  createBtnsWrapper(): HTMLElement {
    const classList: string[] = [
      'd-flex',
      'flex-row',
      'justify-content-center',
      'align-items-center',
      'flex-wrap',
      `btn-wrapper`,
    ];
    const btnsWrapper: HTMLElement = this.createHtmlElement('div', classList, undefined, undefined);
    return btnsWrapper;
  }

  createBtnRight(): HTMLElement {
    const classList: string[] = ['btn', 'btn-danger', `btn-right`];
    const btnRight: HTMLElement = this.createHtmlElement(
      'button',
      classList,
      `btn-right`,
      [['type', 'button']],
      `RIGHT`
    );
    return btnRight;
  }

  createBtnWrong(): HTMLElement {
    const classList: string[] = ['btn', 'btn-secondary', `btn-right`];
    const btnWrong: HTMLElement = this.createHtmlElement(
      'button',
      classList,
      `btn-wrong`,
      [['type', 'button']],
      `WRONG`
    );
    return btnWrong;
  }

  generateCard(wordId: string, word: string, wordTranslate: string): HTMLElement {
    const cardContainer: HTMLElement = this.createCardContainer();
    const newWord: HTMLElement = this.createWord(wordId, word);
    const newTranslate: HTMLElement = this.createWordTranslate(wordId, wordTranslate);
    const btnsWrapper: HTMLElement = this.createBtnsWrapper();
    const btnRight: HTMLElement = this.createBtnRight();
    const btnWrong: HTMLElement = this.createBtnWrong();

    btnsWrapper.append(btnRight, btnWrong);
    cardContainer.append(newWord, newTranslate, btnsWrapper);
    return cardContainer;
  }

  createTimer(): HTMLElement {
    const timer: HTMLElement = services.timer.createTimerElement('sprint', 'game');
    services.timer.createTimerConfig(timer, 60000);

    return timer;
  }

  createGameContainer(): HTMLElement {
    const classList: string[] = [
      'd-flex',
      'flex-column',
      'justify-content-center',
      'align-items-center',
      'flex-wrap',
      'text-center',
      `game-container`,
    ];
    const gameContainer: HTMLElement = this.createHtmlElement('div', classList);
    return gameContainer;
  }

  generateGameContainer(wordId: string, word: string, wordTranslate: string): HTMLElement {
    const gameContainer: HTMLElement = this.createGameContainer();
    const pointsWrapper: HTMLElement = this.generatePointsWrapper();
    const card: HTMLElement = this.generateCard(wordId, word, wordTranslate);
    const timer: HTMLElement = this.createTimer();

    gameContainer.append(pointsWrapper, card, timer);

    return gameContainer;
  }
}
