/* eslint-disable no-param-reassign */
import { api } from '../../../api/api';
import {
  WordsResponseSchema,
  PaginatedResult,
  TypeOfWordIsPaginatedResult,
  WordsStatistics,
  WordsStatistic,
  UsersWordsResponseSchema,
  Statistics,
  DailyStatSprint,
  SprintSchema,
} from '../../../types/types';
import Utils from '../../../utilities/utils';
import { view } from '../../../view/view';
import AuthService from '../../auth/auth-service';
import Credentials from '../../auth/credentials';
import { Route } from '../../routing/routing';
import { services } from '../../services';

export default class SprintService {
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

  learnedWordsCounterSprint: number;

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

  accuracy!: number;

  triggerModal!: HTMLButtonElement;

  soundIcons!: NodeListOf<SVGSVGElement>;

  closeBtn!: HTMLButtonElement;

  totalCount!: number;

  constructor() {
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
    this.learnedWordsCounterSprint = 0;
  }

  launchSprint(words: WordsResponseSchema[] | PaginatedResult[]): void {
    this.eraseData();
    const page: HTMLElement = view.gamesView.games;
    page.innerHTML = '';

    this.words = words;
    this.totalCount = services.pageConfig.getTotalCount();
    const { wordId, newWord, newWordTranslate } = this.chooseTranslate(this.words[this.currentWordCounter]);

    page.append(
      view.gamesView.sprintView.generateGameContainer(
        wordId,
        newWord,
        newWordTranslate,
        this.finishSprint.bind(services.gamesService.sprintService),
        words
      )
    );
    this.setItems();
    this.listenGame();
  }

  finishSprint(words: WordsResponseSchema[] | PaginatedResult[]): void {
    if (!Route.checkUrl('games')) {
      return;
    }
    const page: HTMLElement = view.gamesView.games;
    services.soundHelper.playGameSound('./assets/sounds/congratulations.wav');
    this.prepareFinalData(words);
    this.processWordStatistics();
    this.processUserStatistics(this.allWordsCounter, this.inARow, this.accuracy);

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
    this.learnedWordsCounterSprint = 0;
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
      this.words = Utils.shuffleWords(this.words) as WordsResponseSchema[] | PaginatedResult[];
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
      this.multiplicatorElement.classList.add('blink');
      setTimeout(() => {
        this.multiplicatorElement.classList.remove('blink');
      }, 2000);
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
    view.gamesView.sprintView.createWord(wordId, newWord);
    view.gamesView.sprintView.createWordTranslate(wordId, newWordTranslate);
  }

  async processUserStatistics(allWordsCounter: number, inARow: number, accuracy: number): Promise<void> {
    if (AuthService.checkUser()) {
      const userId: string = Credentials.getUserId();
      const currentDate: number = Date.now();
      const response: Statistics | Response = await api.usersStatistics.getStatistics(userId);
      let body: Statistics | Response;

      if (response instanceof Response) {
        body = this.createUserStatisticsObject(currentDate, allWordsCounter, inARow, accuracy);
        await api.usersStatistics.setStatistics(userId, body);
      } else {
        body = { optional: response.optional };

        const dailyStatSprint: DailyStatSprint | undefined = body.optional?.dailyStatSprint;
        let key: string | undefined;
        let diff: number;
        let lastDailyStat: number;
        if (!dailyStatSprint) {
          diff = 100; // dirty hack
        } else {
          [key] = Object.keys(dailyStatSprint);
          lastDailyStat = Number(key);
          diff = (currentDate - lastDailyStat) / (60 * 60 * 24 * 1000);
        }

        await api.usersStatistics.setStatistics(
          userId,
          this.userStatisticsDaily(body as Statistics, currentDate, allWordsCounter, inARow, accuracy, diff, key)
        );

        await api.usersStatistics.setStatistics(
          userId,
          this.userStatisticsLong(body as Statistics, currentDate, allWordsCounter, inARow, accuracy)
        );
      }
    }
  }

  createUserStatisticsObject(
    currentDate: number,
    allWordsCounter: number,
    inARow: number,
    accuracy: number
  ): Statistics {
    const body: Statistics = {
      optional: {
        dailyStatSprint: {
          [currentDate]: {
            pointsValueSprint: this.pointsValue,
            learnedWordsCounterSprint: this.learnedWordsCounterSprint,
            mistakesSprint: this.mistakes,
            allWordsCounterSprint: allWordsCounter,
            inARowSprint: inARow,
            accuracySprint: accuracy,
          },
        },
        longStatSprint: {
          [currentDate]: {
            pointsValueSprint: this.pointsValue,
            learnedWordsCounterSprint: this.learnedWordsCounterSprint,
            mistakesSprint: this.mistakes,
            allWordsCounterSprint: allWordsCounter,
            inARowSprint: inARow,
            accuracySprint: accuracy,
          },
        },
      },
    };
    return body;
  }

  userStatisticsDaily(
    body: Statistics,
    currentDate: number,
    allWordsCounter: number,
    inARow: number,
    accuracy: number,
    diff: number,
    key?: string
  ): Statistics {
    if (diff > 1 && body.optional) {
      body.optional.dailyStatSprint = {};
      Object.defineProperty(body.optional?.dailyStatSprint, currentDate, {
        value: {
          pointsValueSprint: this.pointsValue,
          learnedWordsCounterSprint: this.learnedWordsCounterSprint,
          mistakesSprint: this.mistakes,
          allWordsCounterSprint: allWordsCounter,
          inARowSprint: inARow,
          accuracySprint: accuracy,
        },
        enumerable: true,
        configurable: true,
        writable: true,
      });
    }

    if (diff < 1 && body.optional?.dailyStatSprint && key) {
      const target: SprintSchema = body.optional?.dailyStatSprint[key];
      target.pointsValueSprint = Number(target.pointsValueSprint) + this.pointsValue;
      target.learnedWordsCounterSprint = Number(target.learnedWordsCounterSprint) + this.learnedWordsCounterSprint;
      target.mistakesSprint = Number(target.mistakesSprint) + this.mistakes;
      target.allWordsCounterSprint = Number(target.allWordsCounterSprint) + allWordsCounter;
      target.inARowSprint = Number(target.inARowSprint) > inARow ? Number(target.inARowSprint) : inARow;
      target.accuracySprint = (Number(target.accuracySprint) + accuracy) / 2;
    }
    return body;
  }

  userStatisticsLong(
    body: Statistics,
    currentDate: number,
    allWordsCounter: number,
    inARow: number,
    accuracy: number
  ): Statistics {
    if (body.optional) {
      if (!body.optional.longStatSprint) {
        body.optional.longStatSprint = {};
      }
    }

    Object.defineProperty(body.optional?.longStatSprint, currentDate, {
      value: {
        pointsValueSprint: this.pointsValue,
        learnedWordsCounterSprint: this.learnedWordsCounterSprint,
        mistakesSprint: this.mistakes,
        allWordsCounterSprint: allWordsCounter,
        inARowSprint: inARow,
        accuracySprint: accuracy,
      },
      enumerable: true,
      configurable: true,
      writable: true,
    });

    return body;
  }

  async processWordStatistics(): Promise<void> {
    if (AuthService.checkUser()) {
      const result: WordsStatistic[] = Object.values(this.wordsStatistics);
      const userId: string = Credentials.getUserId();

      result.forEach(
        async (word: WordsStatistic): Promise<void> => {
          this.wordStatisticsLogicEngine(word);

          const response: UsersWordsResponseSchema | Response = await api.usersWords.getUserWordById(
            userId,
            word.wordId
          );

          if (response instanceof Response) {
            // console.log(`create learned word ${wordId}`);
            await api.usersWords.createUserWord(userId, word.wordId, {
              difficulty: word.difficulty as string,
              optional: {
                correctAttempts: word.correctAttempts,
                incorrectAttempts: word.incorrectAttempts,
              },
            });
          } else {
            // console.log(`update learned word ${wordId}`);
            await api.usersWords.updateUserWord(userId, word.wordId, {
              difficulty: word.difficulty as string,
              optional: {
                correctAttempts: word.correctAttempts,
                incorrectAttempts: word.incorrectAttempts,
              },
            });
          }
        }
      );
    }
  }

  wordStatisticsLogicEngine(word: WordsStatistic) {
    const minAttempts: boolean = word.correctAttemptsSession + word.incorrectAttemptsSession >= 3;
    let ratio: number = word.correctAttemptsSession / word.incorrectAttemptsSession;
    if (ratio === 0) {
      ratio = word.correctAttemptsSession === 0 ? 0 : 1;
    }
    if (word.difficulty === 'none') {
      if (minAttempts) {
        if (ratio > 0.5) {
          word.difficulty = 'learned';
          this.learnedWordsCounterSprint += 1;
        } else {
          word.difficulty = 'hard';
        }
      }
      return;
    }
    if (word.difficulty === 'hard') {
      if (minAttempts) {
        if (ratio > 0.7) {
          word.difficulty = 'learned';
          this.learnedWordsCounterSprint += 1;
        }
        return;
      }
    }
    if (word.difficulty === 'learned') {
      if (word.incorrectAttemptsSession > 0) {
        word.difficulty = 'none';
        this.learnedWordsCounterSprint -= 1;
      }
    }
  }

  setWordStatistics(action: '+' | '-'): void {
    this.createWordStatisticsObject();
    if (action === '+') {
      this.wordsStatistics[this.word].correctAttempts += 1;
      this.wordsStatistics[this.word].correctAttemptsSession += 1;
      this.correctAnswers += 1;
    } else {
      this.wordsStatistics[this.word].incorrectAttempts += 1;
      this.wordsStatistics[this.word].incorrectAttemptsSession += 1;
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
          correctAttemptsSession: 0,
          incorrectAttempts: 0,
          incorrectAttemptsSession: 0,
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
          correctAttemptsSession: 0,
          incorrectAttempts:
            (this.words[this.currentWordCounter] as PaginatedResult).userWord?.optional?.incorrectAttempts || 0,
          incorrectAttemptsSession: 0,
          difficulty: (this.words[this.currentWordCounter] as PaginatedResult).userWord?.difficulty || 'none',
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
      services.soundHelper.playGameSound('./assets/sounds/ok.wav');
      this.addPoints();
      this.setMultiplicator('+');
      this.setWordStatistics('+');
      this.setSteps();
    } else {
      services.soundHelper.playGameSound('./assets/sounds/error.wav');
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
      services.soundHelper.pause();
      view.htmlConstructor.changeSvg(elem.firstChild as SVGUseElement, 'volume-up-fill');
      return false;
    }

    this.soundIcons.forEach((item) => {
      view.htmlConstructor.changeSvg(item.firstChild as SVGUseElement, 'volume-up-fill');
    });

    services.soundHelper.playWordPronouncing(elem as SVGSVGElement);
    return true;
  }

  prepareFinalData(words: WordsResponseSchema[] | PaginatedResult[]): void {
    this.words = words;
    this.accuracy = Number(this.checkForNonValidValues((this.correctAnswers / this.allWordsCounter) * 100).toFixed(1));
    this.inARow = this.checkForNonValidValues(Math.max(...this.inARowHistory));
  }

  controlKeyboard(event: KeyboardEvent): void {
    event.preventDefault();

    const { code } = event;
    if (code === 'ArrowLeft') {
      this.right.dispatchEvent(new Event('click'));
    }
    if (code === 'ArrowRight') {
      this.wrong.dispatchEvent(new Event('click'));
    }
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
    document.addEventListener('keydown', this.controlKeyboard.bind(this));
  }

  listenFinal(): void {
    this.soundIcons.forEach((item: SVGSVGElement) => item.addEventListener('click', this.playSound.bind(this)));
    this.closeBtn.addEventListener('click', this.closeGame.bind(this));
  }
}
