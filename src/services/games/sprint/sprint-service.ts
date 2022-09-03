import {
  WordsResponseSchema,
  PaginatedResult,
  TypeOfWordIsPaginatedResult,
  WordsStatistics,
} from '../../../types/types';
import Utils from '../../../utilities/utils';
import { view } from '../../../view/view';
import AuthService from '../../auth/auth-service';
import PageConfig from '../../components/page-config';
import SoundHelper from '../../components/sound-helper';
import { services } from '../../services';

export default class SprintService {
  soundHelper: SoundHelper;

  pageConfig: PageConfig;

  words: WordsResponseSchema[] | PaginatedResult[];

  currentWordCounter: number;

  pointsValue: number;

  multiplicatorValue: number;

  steps: boolean[];

  mistakes: number;

  correctAnswers: number;

  allWordsCounter: number;

  wordsStatistics: WordsStatistics;

  inARow: number;

  inARowCurrent: number;

  inARowHistory: number[];

  right!: HTMLButtonElement;

  wrong!: HTMLButtonElement;

  pointsElement!: HTMLElement;

  step1!: HTMLSpanElement;

  step2!: HTMLSpanElement;

  step3!: HTMLSpanElement;

  multiplicatorElement!: HTMLElement;

  stepsElements!: HTMLSpanElement[];

  prediction!: boolean;

  wordId!: string;

  word!: string;

  correctWordTranslate!: string;

  accuracy!: string;

  triggerModal!: HTMLButtonElement;

  soundIcons!: NodeListOf<SVGSVGElement>;

  closeBtn!: HTMLButtonElement;

  totalCount!: number;

  constructor() {
    this.soundHelper = new SoundHelper();
    this.pageConfig = new PageConfig();
    this.words = [];
    this.steps = [];
    this.currentWordCounter = 0;
    this.pointsValue = 0;
    this.multiplicatorValue = 10;
    this.mistakes = 0;
    this.correctAnswers = 0;
    this.allWordsCounter = 0;
    this.wordsStatistics = {};
    this.inARow = 0;
    this.inARowCurrent = 0;
    this.inARowHistory = [];
  }

  launchSprint(words: WordsResponseSchema[] | PaginatedResult[]): void {
    const page: HTMLElement = view.gamesView.games;
    page.innerHTML = '';

    this.words = words;
    this.totalCount = this.pageConfig.getTotalCount();
    const { wordId, newWord, newWordTranslate } = this.chooseTranslate(this.words[this.currentWordCounter]);

    page.append(
      view.gamesView.sprintGame.generateGameContainer(
        wordId,
        newWord,
        newWordTranslate,
        this.finishSprint.bind(services.sprintService),
        words
      )
    );
    this.setItems();
    this.listenGame();
  }

  finishSprint(words: WordsResponseSchema[] | PaginatedResult[]): void {
    const page: HTMLElement = view.gamesView.games;
    this.soundHelper.playGameSound('../../assets/sounds/congratulations.wav');
    this.prepareFinalData(words);

    page.append(
      view.gamesView.gamesResults.generateResults(
        this.wordsStatistics,
        this.pointsValue,
        this.accuracy,
        this.inARow,
        this.correctAnswers,
        this.mistakes,
        this.allWordsCounter
      )
    );
    this.setItems();
    this.listenFinal();
    this.triggerModal.dispatchEvent(new Event('click'));
  }

  closeGame(): void {
    this.eraseData();
    window.location.href = '#';
    window.location.href = '#games';
  }

  eraseData(): void {
    this.words = [];
    this.steps = [];
    this.currentWordCounter = 0;
    this.pointsValue = 0;
    this.multiplicatorValue = 10;
    this.mistakes = 0;
    this.correctAnswers = 0;
    this.allWordsCounter = 0;
    this.wordsStatistics = {};
    this.inARow = 0;
    this.inARowCurrent = 0;
    this.inARowHistory = [];
  }

  chooseTranslate(
    word: WordsResponseSchema | PaginatedResult
  ): {
    wordId: string;
    newWord: string;
    newWordTranslate: string;
  } {
    const chance: number = Utils.getChance(this.currentWordCounter, this.totalCount);
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    const newWord: string = word.word;
    const newWordTranslate: string = this.words[chance].wordTranslate;

    this.prediction = false;
    this.wordId = wordId;
    this.word = newWord;
    this.correctWordTranslate = this.words[this.currentWordCounter].wordTranslate;

    if (chance === this.currentWordCounter) {
      this.prediction = true;
      return {
        wordId,
        newWord,
        newWordTranslate,
      };
    }

    return {
      wordId,
      newWord,
      newWordTranslate,
    };
  }

  controlCurrentWord(): void {
    if (this.currentWordCounter < this.totalCount) {
      this.currentWordCounter += 1;
    } else {
      this.currentWordCounter = 0;
      this.words = Utils.shuffleWords(this.words);
    }
  }

  addPoints(): void {
    this.pointsValue += this.multiplicatorValue;
    this.pointsElement.innerText = `${this.pointsValue}`;
  }

  setMultiplicator(action: '+' | '-'): void {
    if (action === '+') {
      this.inARowCurrent += 1;
      this.inARowHistory.push(this.inARowCurrent);
      this.steps.push(true);
    } else {
      this.inARowCurrent = 0;
      this.steps.length = 0;
      this.multiplicatorValue = 10;
    }

    if (this.steps.length > 3) {
      this.steps.length = 0;
      this.multiplicatorValue += 10;
    }

    this.multiplicatorElement.innerText = `+ ${this.multiplicatorValue} points`;
  }

  setSteps(): void {
    this.step1.style.backgroundColor = `#565e64`;
    this.step2.style.backgroundColor = `#565e64`;
    this.step3.style.backgroundColor = `#565e64`;

    for (let i = 0; i < this.steps.length; i += 1) {
      this.stepsElements[i].style.backgroundColor = '#dc3545';
    }
  }

  setNextWord(): void {
    const { wordId, newWord, newWordTranslate } = this.chooseTranslate(this.words[this.currentWordCounter]);
    view.gamesView.sprintGame.createWord(wordId, newWord);
    view.gamesView.sprintGame.createWordTranslate(wordId, newWordTranslate);
  }

  setWordStatistics(action: '+' | '-'): void {
    this.createWordStatisticsObject();
    if (action === '+') {
      this.wordsStatistics[this.word].correctAttempts += 1;
      this.correctAnswers += 1;
    } else {
      this.wordsStatistics[this.word].incorrectAttempts += 1;
      this.mistakes += 1;
    }
    // console.log(this.wordsStatistics);
    this.allWordsCounter = this.correctAnswers + this.mistakes;
  }

  createWordStatisticsObject(): void {
    if (!AuthService.checkUser()) {
      Object.defineProperty(this.wordsStatistics, this.word, {
        value: {
          word: this.word,
          wordId: this.wordId,
          wordTranslate: this.correctWordTranslate,
          audio: this.words[this.currentWordCounter].audio,
          correctAttempts: 0,
          incorrectAttempts: 0,
        },
        enumerable: true,
        configurable: true,
        writable: true,
      });
    }

    if (!this.wordsStatistics[this.word]) {
      Object.defineProperty(this.wordsStatistics, this.word, {
        value: {
          word: this.word,
          wordId: this.wordId,
          wordTranslate: this.correctWordTranslate,
          audio: this.words[this.currentWordCounter].audio,
          correctAttempts:
            (this.words[this.currentWordCounter] as PaginatedResult).userWord?.optional?.correctAttempts || 0,
          incorrectAttempts:
            (this.words[this.currentWordCounter] as PaginatedResult).userWord?.optional?.incorrectAttempts || 0,
          difficulty: (this.words[this.currentWordCounter] as PaginatedResult).userWord?.difficulty || null,
        },
        enumerable: true,
        configurable: true,
        writable: true,
      });
    }
  }

  checkAnswer(event: Event): void {
    const { id } = event.target as HTMLButtonElement;
    if ((id.includes('right') && this.prediction === true) || (id.includes('wrong') && this.prediction === false)) {
      this.soundHelper.playGameSound('../../assets/sounds/ok.wav');
      this.addPoints();
      this.setMultiplicator('+');
      this.setWordStatistics('+');
      this.setSteps();
    } else {
      this.soundHelper.playGameSound('../../assets/sounds/error.wav');
      this.setSteps();
      this.setMultiplicator('-');
      this.setWordStatistics('-');
      this.setSteps();
    }
    this.controlCurrentWord();
    this.setNextWord();
  }

  checkForNonValidValues(value: number): number {
    if (Object.is(value, NaN) || Object.is(value, Infinity) || Object.is(value, -Infinity)) {
      return 0;
    }
    return value;
  }

  playSound(event: Event): boolean {
    let elem: SVGUseElement | SVGSVGElement = event.target as SVGUseElement | SVGSVGElement;
    if (elem instanceof SVGUseElement) {
      elem = elem.parentNode as SVGSVGElement;
    }

    const currentAttr: string = (elem.firstChild as SVGUseElement).getAttributeNS(
      'http://www.w3.org/1999/xlink',
      'href'
    ) as string;

    if (currentAttr.includes('stop-fill')) {
      this.soundHelper.pause();
      view.htmlConstructor.changeSvg(elem.firstChild as SVGUseElement, 'volume-up-fill');
      return false;
    }

    this.soundIcons.forEach((item) => {
      view.htmlConstructor.changeSvg(item.firstChild as SVGUseElement, 'volume-up-fill');
    });

    this.soundHelper.playWordPronouncing(elem as SVGSVGElement);
    return true;
  }

  prepareFinalData(words: WordsResponseSchema[] | PaginatedResult[]): void {
    this.words = words;
    this.accuracy = `${this.checkForNonValidValues((this.correctAnswers / this.allWordsCounter) * 100).toFixed(1)} %`;
    this.inARow = this.checkForNonValidValues(Math.max(...this.inARowHistory));
  }

  setItems(): void {
    this.right = document.getElementById('btn-right') as HTMLButtonElement;
    this.wrong = document.getElementById('btn-wrong') as HTMLButtonElement;
    this.pointsElement = document.getElementById('points-sprint') as HTMLElement;
    this.multiplicatorElement = document.getElementById('multiplicator-sprint') as HTMLElement;
    this.step1 = document.getElementById('step-1') as HTMLSpanElement;
    this.step2 = document.getElementById('step-2') as HTMLSpanElement;
    this.step3 = document.getElementById('step-3') as HTMLSpanElement;
    this.stepsElements = [this.step1, this.step2, this.step3];
    this.triggerModal = document.getElementById('trigger-modal') as HTMLButtonElement;
    this.soundIcons = document.querySelectorAll('.sound-icon');
    this.closeBtn = document.getElementById('btn-close') as HTMLButtonElement;
  }

  listenGame(): void {
    this.right.addEventListener('click', this.checkAnswer.bind(this));
    this.wrong.addEventListener('click', this.checkAnswer.bind(this));
  }

  listenFinal(): void {
    this.soundIcons.forEach((item: SVGSVGElement) => item.addEventListener('click', this.playSound.bind(this)));
    this.closeBtn.addEventListener('click', this.closeGame.bind(this));
  }
}
