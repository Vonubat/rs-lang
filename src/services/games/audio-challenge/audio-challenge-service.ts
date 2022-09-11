/* eslint-disable no-param-reassign */
import { api } from '../../../api/api';
import {
  WordsResponseSchema,
  PaginatedResult,
  WordsStatistics,
  WordsStatistic,
  UsersWordsResponseSchema,
  Statistics,
  TypeOfWordIsPaginatedResult,
  DailyStatAudioChallenge,
  AudioChallengeSchema,
} from '../../../types/types';
import Utils from '../../../utilities/utils';
import { view } from '../../../view/view';
import AuthService from '../../auth/auth-service';
import Credentials from '../../auth/credentials';
import { services } from '../../services';

export default class AudioChallengeService {
  private words: WordsResponseSchema[] | PaginatedResult[];

  private currentWordCounter: number;

  private pointsValue: number;

  private multiplicatorValue: number;

  private mistakes: number;

  private correctAnswers: number;

  private allWordsCounter: number;

  private wordsStatistics: WordsStatistics;

  private inARow: number;

  private inARowCurrent: number;

  private inARowHistory: number[];

  private learnedWordsCounterAudioChallenge: number;

  private newWordsCounterAudioChallenge: number;

  private pointsElement!: HTMLElement;

  private multiplicatorElement!: HTMLElement;

  private stepsElements!: HTMLSpanElement[];

  private prediction!: boolean;

  private wordId!: string;

  private word!: string;

  private accuracy!: number;

  private triggerModal!: HTMLButtonElement;

  private closeBtn!: HTMLButtonElement;

  private totalCount!: number;

  private btnsWord!: NodeListOf<HTMLButtonElement>;

  private soundIcons!: NodeListOf<SVGSVGElement>;

  private soundIconMain!: SVGSVGElement;

  private btnControl!: HTMLButtonElement;

  private wordsForIteration!: [string, WordsResponseSchema | PaginatedResult][];

  constructor() {
    this.words = [];
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
    this.learnedWordsCounterAudioChallenge = 0;
    this.newWordsCounterAudioChallenge = 0;
  }

  public launchAudioChallenge(words: WordsResponseSchema[] | PaginatedResult[]): void {
    this.eraseData();
    const page: HTMLElement = view.gamesView.games;
    page.innerHTML = '';

    this.words = words;
    this.totalCount = services.pageConfig.getTotalCount();

    page.append(
      view.gamesView.audioChallengeView.generateGameContainer(this.chooseWordsForIteration(), this.totalCount)
    );
    this.setItems();
    this.listenGame();
    this.listenControlBtn();
    services.soundHelper.playWordPronouncing(this.soundIconMain as SVGSVGElement);
  }

  private finishAudioChallenge(words: WordsResponseSchema[] | PaginatedResult[]): void {
    const page: HTMLElement = view.gamesView.games;
    services.soundHelper.playGameSound('./assets/sounds/congratulations.wav');
    this.removeControlBtnListeners();
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

  private closeGame(): void {
    window.location.href = '#';
    window.location.href = '#games';
  }

  private eraseData(): void {
    this.words = [];
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
    this.newWordsCounterAudioChallenge = 0;
  }

  private chooseWordsForIteration(): [string, WordsResponseSchema | PaginatedResult][] {
    const currentWordObject: WordsResponseSchema | PaginatedResult = this.words[this.currentWordCounter];

    this.word = currentWordObject.word;
    const wordId: string = TypeOfWordIsPaginatedResult(currentWordObject)
      ? currentWordObject._id
      : currentWordObject.id;
    this.wordId = wordId;

    const result: {
      keyWord: WordsResponseSchema | PaginatedResult;
      [index: string]: WordsResponseSchema | PaginatedResult;
    } = { keyWord: this.words[this.currentWordCounter] };

    const uniqueChances: number[] = [];
    for (let i = 1; i < 4; i += 1) {
      const chance: number = Utils.getChance(this.currentWordCounter, this.totalCount);
      if (uniqueChances.some((el: number): boolean => el === chance)) {
        i -= 1;
        // eslint-disable-next-line no-continue
        continue;
      }
      const key = `fakeWord${i}`;
      if (this.currentWordCounter === chance) {
        i -= 1;
        // eslint-disable-next-line no-continue
        continue;
      }
      result[key] = this.words[chance];
      uniqueChances.push(chance);
    }
    this.wordsForIteration = Utils.shuffleWords(Object.entries(result)) as [
      string,
      WordsResponseSchema | PaginatedResult
    ][];
    return this.wordsForIteration;
  }

  private controlCurrentWord(): boolean {
    this.currentWordCounter += 1;

    if (this.currentWordCounter > this.totalCount) {
      this.finishAudioChallenge(this.words);
      return true;
    }

    return false;
  }

  private addPoints(): void {
    this.pointsValue += this.multiplicatorValue;
    this.pointsElement.innerText = `${this.pointsValue}`;
  }

  private setMultiplicator(action: '+' | '-'): void {
    if (action === '+') {
      this.inARowCurrent += 1;
      this.inARowHistory.push(this.inARowCurrent);
      this.multiplicatorElement.classList.add('blink');
      setTimeout(() => {
        this.multiplicatorElement.classList.remove('blink');
      }, 2000);
      this.multiplicatorValue += 10;
    } else {
      this.inARowCurrent = 0;
      this.multiplicatorValue = 10;
    }

    this.multiplicatorElement.innerText = `+ ${this.multiplicatorValue} points`;
  }

  private setNextWord(): void {
    const wordsForIteration: [string, WordsResponseSchema | PaginatedResult][] = this.chooseWordsForIteration();
    view.gamesView.audioChallengeView.updateGameContainer(wordsForIteration);
    view.gamesView.audioChallengeView.incrementWordsCounter(this.totalCount);

    this.setItems();
    this.listenGame();
    services.soundHelper.playWordPronouncing(this.soundIconMain as SVGSVGElement);
  }

  private async processUserStatistics(allWordsCounter: number, inARow: number, accuracy: number): Promise<void> {
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
        const dailyStatAudioChallenge: DailyStatAudioChallenge | undefined = body.optional?.dailyStatAudioChallenge;
        let key: string | undefined;
        let diff: number;
        let lastDailyStat: number;
        if (!dailyStatAudioChallenge) {
          diff = 100; // dirty hack
        } else {
          [key] = Object.keys(dailyStatAudioChallenge);
          lastDailyStat = Number(key);
          diff = new Date(currentDate).getDate() - new Date(lastDailyStat).getDate();
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

  private createUserStatisticsObject(
    currentDate: number,
    allWordsCounter: number,
    inARow: number,
    accuracy: number
  ): Statistics {
    const body: Statistics = {
      optional: {
        dailyStatAudioChallenge: {
          [currentDate]: {
            pointsValueAudioChallenge: this.pointsValue,
            newWordsCounterAudioChallenge: this.newWordsCounterAudioChallenge,
            learnedWordsCounterAudioChallenge: this.learnedWordsCounterAudioChallenge,
            mistakesAudioChallenge: this.mistakes,
            allWordsCounterAudioChallenge: allWordsCounter,
            inARowAudioChallenge: inARow,
            accuracyAudioChallenge: accuracy,
          },
        },
        longStatAudioChallenge: {
          [currentDate]: {
            pointsValueAudioChallenge: this.pointsValue,
            newWordsCounterAudioChallenge: this.newWordsCounterAudioChallenge,
            learnedWordsCounterAudioChallenge: this.learnedWordsCounterAudioChallenge,
            mistakesAudioChallenge: this.mistakes,
            allWordsCounterAudioChallenge: allWordsCounter,
            inARowAudioChallenge: inARow,
            accuracyAudioChallenge: accuracy,
          },
        },
      },
    };
    return body;
  }

  private userStatisticsDaily(
    body: Statistics,
    currentDate: number,
    allWordsCounter: number,
    inARow: number,
    accuracy: number,
    diff: number,
    key?: string
  ): Statistics {
    if (diff >= 1 && body.optional) {
      body.optional.dailyStatAudioChallenge = {};
      Object.defineProperty(body.optional?.dailyStatAudioChallenge, currentDate, {
        value: {
          pointsValueAudioChallenge: this.pointsValue,
          newWordsCounterAudioChallenge: this.newWordsCounterAudioChallenge,
          learnedWordsCounterAudioChallenge: this.learnedWordsCounterAudioChallenge,
          mistakesAudioChallenge: this.mistakes,
          allWordsCounterAudioChallenge: allWordsCounter,
          inARowAudioChallenge: inARow,
          accuracyAudioChallenge: accuracy,
        },
        enumerable: true,
        configurable: true,
        writable: true,
      });
    }
    if (diff < 1 && body.optional?.dailyStatAudioChallenge && key) {
      const target: AudioChallengeSchema = body.optional?.dailyStatAudioChallenge[key];
      target.pointsValueAudioChallenge = Number(target.pointsValueAudioChallenge) + this.pointsValue;
      target.newWordsCounterAudioChallenge =
        Number(target.newWordsCounterAudioChallenge) + this.newWordsCounterAudioChallenge;
      target.learnedWordsCounterAudioChallenge =
        Number(target.learnedWordsCounterAudioChallenge) + this.learnedWordsCounterAudioChallenge;
      target.mistakesAudioChallenge = Number(target.mistakesAudioChallenge) + this.mistakes;
      target.allWordsCounterAudioChallenge = Number(target.allWordsCounterAudioChallenge) + allWordsCounter;
      target.inARowAudioChallenge =
        Number(target.inARowAudioChallenge) > inARow ? Number(target.inARowAudioChallenge) : inARow;
      target.accuracyAudioChallenge = (Number(target.accuracyAudioChallenge) + accuracy) / 2;
    }
    return body;
  }

  private userStatisticsLong(
    body: Statistics,
    currentDate: number,
    allWordsCounter: number,
    inARow: number,
    accuracy: number
  ): Statistics {
    if (body.optional) {
      if (!body.optional.longStatAudioChallenge) {
        body.optional.longStatAudioChallenge = {};
      }
    }

    Object.defineProperty(body.optional?.longStatAudioChallenge, currentDate, {
      value: {
        pointsValueAudioChallenge: this.pointsValue,
        newWordsCounterAudioChallenge: this.newWordsCounterAudioChallenge,
        learnedWordsCounterAudioChallenge: this.learnedWordsCounterAudioChallenge,
        mistakesAudioChallenge: this.mistakes,
        allWordsCounterAudioChallenge: allWordsCounter,
        inARowAudioChallenge: inARow,
        accuracyAudioChallenge: accuracy,
      },
      enumerable: true,
      configurable: true,
      writable: true,
    });

    return body;
  }

  private async processWordStatistics(): Promise<void> {
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

  private wordStatisticsLogicEngine(word: WordsStatistic): void {
    if (word.difficulty === 'none') {
      this.newWordsCounterAudioChallenge += 1;
      if (word.correctAttemptsSession > 0) {
        word.difficulty = 'learned';
        this.learnedWordsCounterAudioChallenge += 1;
      } else {
        word.difficulty = 'hard';
      }
      return;
    }
    if (word.difficulty === 'hard') {
      if (word.correctAttemptsSession > 0) {
        word.difficulty = 'learned';
        this.learnedWordsCounterAudioChallenge += 1;
      }
      return;
    }
    if (word.difficulty === 'learned') {
      if (word.incorrectAttemptsSession > 0) {
        word.difficulty = 'none';
        this.learnedWordsCounterAudioChallenge -= 1;
      }
    }
  }

  private setWordStatistics(action: '+' | '-'): void {
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

  private createWordStatisticsObject(): void {
    if (!AuthService.checkUser()) {
      Object.defineProperty(this.wordsStatistics, this.word, {
        value: {
          word: this.word,
          wordId: this.wordId,
          wordTranslate: this.words[this.currentWordCounter].wordTranslate,
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
          wordTranslate: this.words[this.currentWordCounter].wordTranslate,
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

  private checkAnswer(event: Event): void {
    const { id } = event.target as HTMLButtonElement;
    const target: HTMLButtonElement = event.target as HTMLButtonElement;

    if (id.includes('keyWord')) {
      services.soundHelper.playGameSound('./assets/sounds/ok.wav');
      target.style.backgroundColor = '#198754';
      this.addPoints();
      this.setMultiplicator('+');
      this.setWordStatistics('+');
    } else {
      services.soundHelper.playGameSound('./assets/sounds/error.wav');
      target.style.backgroundColor = '#dc3545';
      this.setMultiplicator('-');
      this.setWordStatistics('-');
    }
    view.gamesView.audioChallengeView.updateBtnControl('next');
    view.gamesView.audioChallengeView.createImage(this.wordsForIteration);
    view.gamesView.audioChallengeView.createWord(this.wordsForIteration);
    this.btnsWord.forEach((item: HTMLButtonElement) => item.classList.add('disabled'));
  }

  checkBtnControl(event: Event): void {
    const { innerText } = event.target as HTMLButtonElement;
    this.btnsWord.forEach((item: HTMLButtonElement) => item.classList.remove('disabled'));

    const thisIsTheEnd: boolean = this.controlCurrentWord();
    if (thisIsTheEnd) {
      return;
    }

    this.setNextWord();

    if (innerText === 'Next word') {
      view.gamesView.audioChallengeView.updateBtnControl('skip');
    }

    if (innerText === `I don't know`) {
      this.inARowCurrent = 0;
    }
  }

  private checkForNonValidValues(value: number): number {
    if (Object.is(value, NaN) || Object.is(value, Infinity) || Object.is(value, -Infinity)) {
      return 0;
    }
    return value;
  }

  private playSound(event: Event): boolean {
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

  private prepareFinalData(words: WordsResponseSchema[] | PaginatedResult[]): void {
    this.words = words;
    this.accuracy = Number(this.checkForNonValidValues((this.correctAnswers / this.allWordsCounter) * 100).toFixed(1));
    this.inARow = this.checkForNonValidValues(Math.max(...this.inARowHistory));
  }

  private controlKeyboard(event: KeyboardEvent): void {
    const { code } = event;
    const conditional: (num: number, el: HTMLButtonElement) => boolean = (
      num: number,
      el: HTMLButtonElement
    ): boolean => el.innerText.includes(`${num}`) && !el.classList.contains('disabled');

    if (code === 'Enter') {
      this.btnControl.dispatchEvent(new Event('click'));
    }
    if (code === 'Digit1') {
      this.btnsWord.forEach((item: HTMLButtonElement) => {
        if (conditional(1, item)) {
          item.dispatchEvent(new Event('click'));
        }
      });
    }
    if (code === 'Digit2') {
      this.btnsWord.forEach((item: HTMLButtonElement) => {
        if (conditional(2, item)) {
          item.dispatchEvent(new Event('click'));
        }
      });
    }
    if (code === 'Digit3') {
      this.btnsWord.forEach((item: HTMLButtonElement) => {
        if (conditional(3, item)) {
          item.dispatchEvent(new Event('click'));
        }
      });
    }
    if (code === 'Digit4') {
      this.btnsWord.forEach((item: HTMLButtonElement) => {
        if (conditional(4, item)) {
          item.dispatchEvent(new Event('click'));
        }
      });
    }
  }

  private setItems(): void {
    this.btnsWord = document.querySelectorAll('.btn-word') as NodeListOf<HTMLButtonElement>;
    this.pointsElement = document.getElementById('points-audio-challenge') as HTMLElement;
    this.multiplicatorElement = document.getElementById('multiplicator-audio-challenge') as HTMLElement;
    this.btnControl = document.getElementById('btn-control') as HTMLButtonElement;
    this.soundIconMain = document.querySelector('#sound-icon-main') as SVGSVGElement;
    this.triggerModal = document.getElementById('trigger-modal') as HTMLButtonElement;
    this.soundIcons = document.querySelectorAll('.sound-icon') as NodeListOf<SVGSVGElement>;
    this.closeBtn = document.getElementById('btn-close') as HTMLButtonElement;
  }

  private listenGame(): void {
    this.btnsWord.forEach((item: HTMLButtonElement) => item.addEventListener('click', this.checkAnswer.bind(this)));
    this.soundIconMain.addEventListener('click', this.playSound.bind(this));
  }

  boundControlKeyboard = this.controlKeyboard.bind(this);

  private listenControlBtn(): void {
    this.btnControl.addEventListener('click', this.checkBtnControl.bind(this));
    document.addEventListener('keydown', this.boundControlKeyboard);
  }

  removeControlBtnListeners(): void {
    document.removeEventListener('keydown', this.boundControlKeyboard);
  }

  private listenFinal(): void {
    this.soundIcons.forEach((item: SVGSVGElement) => item.addEventListener('click', this.playSound.bind(this)));
    this.closeBtn.addEventListener('click', this.closeGame.bind(this));
  }
}
