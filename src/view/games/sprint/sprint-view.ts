import { services } from '../../../services/services';
import { PaginatedResult, WordsResponseSchema } from '../../../types/types';
import HTMLConstructor from '../../components/constructor';

export default class SprintView extends HTMLConstructor {
  private _newWord!: HTMLElement;

  private _newTranslate!: HTMLElement;

  createPointsWrapper(): HTMLElement {
    const classList: string[] = [
      'd-flex',
      'flex-column',
      'justify-content-center',
      'align-items-center',
      `points-wrapper`,
    ];
    const pointsWrapper: HTMLElement = this.createHtmlElement('div', classList, `points-wrapper-sprint`);
    return pointsWrapper;
  }

  private createPoints(): HTMLElement {
    const classList: string[] = [`points-sprint`];
    const points: HTMLElement = this.createHtmlElement('h2', classList, `points-sprint`, undefined, `0`);
    return points;
  }

  private createMultiplicator(): HTMLElement {
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

  private createSteps(): HTMLElement {
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

  private generatePointsWrapper(): HTMLElement {
    const pointsWrapper: HTMLElement = this.createPointsWrapper();
    const points: HTMLElement = this.createPoints();
    const multiplicator: HTMLElement = this.createMultiplicator();
    const steps: HTMLElement = this.createSteps();
    pointsWrapper.append(points, multiplicator, steps);
    return pointsWrapper;
  }

  private createCardContainer(): HTMLElement {
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

  public createWord(wordId: string, word: string): HTMLElement {
    if (!this._newWord) {
      const classList: string[] = [];
      const newWord: HTMLElement = this.createHtmlElement(
        'h4',
        classList,
        `sprint-word-${wordId}`,
        undefined,
        `${word}`
      );
      this._newWord = newWord;
      return this._newWord;
    }
    this._newWord.innerHTML = word;
    this._newWord.id = `sprint-word-${wordId}`;
    return this._newWord;
  }

  public createWordTranslate(wordId: string, wordTranslate: string): HTMLElement {
    if (!this._newTranslate) {
      const classList: string[] = ['text-muted'];
      const newTranslate: HTMLElement = this.createHtmlElement(
        'h4',
        classList,
        `sprint-wordTranslate-${wordId}`,
        undefined,
        `${wordTranslate}`
      );
      this._newTranslate = newTranslate;
      return this._newTranslate;
    }
    this._newTranslate.innerHTML = wordTranslate;
    this._newTranslate.id = `sprint-translate-${wordId}`;
    return this._newTranslate;
  }

  private createBtnsWrapper(): HTMLElement {
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

  private createBtnRight(): HTMLElement {
    const classList: string[] = ['btn', 'btn-danger', `btn-right`];
    const btnRight: HTMLElement = this.createHtmlElement(
      'button',
      classList,
      `btn-right`,
      [['type', 'button']],
      `&#8592; RIGHT`
    );
    return btnRight;
  }

  private createBtnWrong(): HTMLElement {
    const classList: string[] = ['btn', 'btn-secondary', `btn-right`];
    const btnWrong: HTMLElement = this.createHtmlElement(
      'button',
      classList,
      `btn-wrong`,
      [['type', 'button']],
      ` WRONG &#8594;`
    );
    return btnWrong;
  }

  private generateCard(wordId: string, word: string, wordTranslate: string): HTMLElement {
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

  private createTimer(
    cb: (words: WordsResponseSchema[] | PaginatedResult[]) => void,
    words: WordsResponseSchema[] | PaginatedResult[]
  ): HTMLElement {
    const timer: HTMLElement = services.gamesService.timer.createTimerElement('sprint', 'game');
    services.gamesService.timer.createTimerConfig(timer, 60000, cb, words);

    return timer;
  }

  private createGameContainer(): HTMLElement {
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

  public generateGameContainer(
    wordId: string,
    word: string,
    wordTranslate: string,
    cb: (words: WordsResponseSchema[] | PaginatedResult[]) => void,
    words: WordsResponseSchema[] | PaginatedResult[]
  ): HTMLElement {
    const gameContainer: HTMLElement = this.createGameContainer();
    const pointsWrapper: HTMLElement = this.generatePointsWrapper();
    const card: HTMLElement = this.generateCard(wordId, word, wordTranslate);
    const timer: HTMLElement = this.createTimer(cb, words);

    gameContainer.append(pointsWrapper, card, timer);
    gameContainer.classList.add('game-container-sprint');

    return gameContainer;
  }
}
