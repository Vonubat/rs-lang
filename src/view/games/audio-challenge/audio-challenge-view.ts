import Constants from '../../../constants';
import { WordsResponseSchema, PaginatedResult } from '../../../types/types';
import HTMLConstructor from '../../components/constructor';

export default class AudioChallengeView extends HTMLConstructor {
  private btnControl!: HTMLElement;

  private image!: HTMLElement | null;

  private createPointsWrapper(): HTMLElement {
    const classList: string[] = [
      'd-flex',
      'flex-column',
      'justify-content-center',
      'align-items-center',
      `points-wrapper`,
    ];
    const pointsWrapper: HTMLElement = this.createHtmlElement('div', classList, `points-wrapper-audio-challenge`);
    return pointsWrapper;
  }

  private createPoints(): HTMLElement {
    const classList: string[] = [`points-audio-challenge`];
    const points: HTMLElement = this.createHtmlElement('h2', classList, `points-audio-challenge`, undefined, `0`);
    return points;
  }

  private createMultiplicator(): HTMLElement {
    const classList: string[] = ['multiplicator'];
    const multiplicator: HTMLElement = this.createHtmlElement(
      'h4',
      classList,
      `multiplicator-audio-challenge`,
      undefined,
      `+ 10 points`
    );
    return multiplicator;
  }

  private generatePointsWrapper(): HTMLElement {
    const pointsWrapper: HTMLElement = this.createPointsWrapper();
    const points: HTMLElement = this.createPoints();
    const multiplicator: HTMLElement = this.createMultiplicator();
    pointsWrapper.append(points, multiplicator);
    return pointsWrapper;
  }

  private createCardContainer(): HTMLElement {
    const classList: string[] = [
      'd-flex',
      'flex-column',
      'justify-content-center',
      'align-items-center',
      'flex-wrap',
      `card-container`,
    ];
    const cardContainer: HTMLElement = this.createHtmlElement('div', classList);
    return cardContainer;
  }

  private createBtnsWrapper(wordsForIteration: [string, WordsResponseSchema | PaginatedResult][]): HTMLElement {
    const classList: string[] = [
      'd-flex',
      'flex-row',
      'justify-content-center',
      'align-items-center',
      'flex-wrap',
      `btn-wrapper`,
    ];
    const btnsWrapper: HTMLElement = this.createHtmlElement('div', classList);
    wordsForIteration.forEach((word: [string, WordsResponseSchema | PaginatedResult], index): void => {
      const btn: HTMLElement = this.createBtnWord(word, index);
      btnsWrapper.append(btn);
    });

    return btnsWrapper;
  }

  private createBtnWord(word: [string, WordsResponseSchema | PaginatedResult], index: number): HTMLElement {
    const classList: string[] = ['btn', 'btn-light', `btn-word`];
    const btnWord: HTMLElement = this.createHtmlElement(
      'button',
      classList,
      `btn-${index + 1}-${word[0]}`,
      [['type', 'button']],
      `${index + 1} ${word[1].wordTranslate}`
    );
    return btnWord;
  }

  private createIcon(wordsForIteration: [string, WordsResponseSchema | PaginatedResult][]): SVGSVGElement {
    let audio = '';

    wordsForIteration.forEach((word) => {
      if (word[0] === 'keyWord') {
        audio = word[1].audio;
      }
    });

    return this.svg('volume-up-fill', ['sound-icon'], `sound-icon-main`, [['data-audio', `${audio}`]]);
  }

  private generateCard(wordsForIteration: [string, WordsResponseSchema | PaginatedResult][]): HTMLElement {
    const cardContainer: HTMLElement = this.createCardContainer();
    const icon: SVGSVGElement = this.createIcon(wordsForIteration);
    const btnsWrapper: HTMLElement = this.createBtnsWrapper(wordsForIteration);

    cardContainer.append(icon, btnsWrapper);

    return cardContainer;
  }

  private createWordsCounter(totalCount: number): HTMLElement {
    const progress: HTMLElement = this.createHtmlElement('div', ['progress', 'w-50']);
    const progressBar: HTMLElement = this.createHtmlElement(
      'div',
      ['progress-bar', 'progress-bar-striped', 'progress-bar-animated'],
      'words-counter',
      [['role', 'progressbar']]
    );
    const increment: number = 100 / totalCount;
    progressBar.style.width = `${increment}%`;
    progress.append(progressBar);
    return progress;
  }

  public incrementWordsCounter(totalCount: number): void {
    const progressBar: HTMLDivElement = document.getElementById('words-counter') as HTMLDivElement;
    const increment: number = 100 / totalCount;
    progressBar.style.width = `${parseInt(progressBar.style.width, 10) + increment}%`;
  }

  private createBtnControl(): HTMLElement {
    const classList: string[] = ['btn', 'btn-primary', `btn-control`];
    const btnControl: HTMLElement = this.createHtmlElement(
      'button',
      classList,
      `btn-control`,
      [['type', 'button']],
      `I don't know`
    );
    this.btnControl = btnControl;
    return btnControl;
  }

  public createImage(wordsForIteration: [string, WordsResponseSchema | PaginatedResult][]): HTMLElement {
    const cardContainer: HTMLElement | null = document.querySelector('.card-container');

    if (this.image && cardContainer) {
      cardContainer.prepend(this.image);
      this.image = null;
    }

    let imgPath = '';

    wordsForIteration.forEach((word) => {
      if (word[0] === 'keyWord') {
        imgPath = word[1].image;
      }
    });

    const image: HTMLElement = this.createHtmlElement('img', ['img-fluid', 'image'], `image-correct`, [
      ['alt', `image of correct word`],
      ['src', `${Constants.BASE_URL}/${imgPath}`],
    ]);

    return image;
  }

  public createWord(wordsForIteration: [string, WordsResponseSchema | PaginatedResult][]): HTMLElement {
    const soundIcon: HTMLElement = document.querySelector('.sound-icon') as HTMLElement;
    let correctWord = '';

    wordsForIteration.forEach((word) => {
      if (word[0] === 'keyWord') {
        correctWord = word[1].word;
      }
    });

    const word: HTMLElement = this.createHtmlElement(
      'h2',
      ['word-correct'],
      `word-correct`,
      undefined,
      `${correctWord}`
    );

    soundIcon.before(word);
    return word;
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
    wordsForIteration: [string, WordsResponseSchema | PaginatedResult][],
    totalCount: number
  ): HTMLElement {
    const gameContainer: HTMLElement = this.createGameContainer();
    const pointsWrapper: HTMLElement = this.generatePointsWrapper();
    const card: HTMLElement = this.generateCard(wordsForIteration);
    const btnControl: HTMLElement = this.createBtnControl();
    const wordsCounter: HTMLElement = this.createWordsCounter(totalCount);
    const image: HTMLElement = this.createImage(wordsForIteration);
    this.image = image;

    gameContainer.append(wordsCounter, btnControl, card, pointsWrapper);
    gameContainer.classList.add('game-container-audio-challenge');

    return gameContainer;
  }

  public updateBtnControl(action: 'next' | 'skip'): void {
    if (action === 'next') {
      this.btnControl.innerText = 'Next word';
    } else {
      this.btnControl.innerText = `I don't know`;
    }
  }

  public updateGameContainer(wordsForIteration: [string, WordsResponseSchema | PaginatedResult][]): void {
    const oldCard: HTMLElement = document.querySelector('.card-container') as HTMLElement;
    const pointsWrapper: HTMLElement = document.querySelector('.points-wrapper') as HTMLElement;
    const newCard: HTMLElement = this.generateCard(wordsForIteration);
    const image: HTMLElement = this.createImage(wordsForIteration);
    this.image = image;
    oldCard.remove();
    pointsWrapper.before(newCard);
  }
}
