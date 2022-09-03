import {
  WordsResponseSchema,
  PaginatedResult,
  TypeOfWordIsPaginatedResult,
  WordsStatistics,
} from '../../../types/types';
import Utils from '../../../utilities/utils';
import { view } from '../../../view/view';
import AuthService from '../../auth/auth-service';
import SoundHelper from '../../components/sound-helper';

export default class SprintService {
  soundHelper: SoundHelper;

  words: WordsResponseSchema[] | PaginatedResult[];

  currentWordCounter: number;

  pointsValue: number;

  multiplicatorValue: number;

  steps: boolean[];

  mistakes: number;

  correctAnswers: number;

  allWordsCounter: number;

  wordsStatistics: WordsStatistics;

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

  constructor() {
    this.soundHelper = new SoundHelper();
    this.words = [];
    this.steps = [];
    this.currentWordCounter = 0;
    this.pointsValue = 0;
    this.multiplicatorValue = 10;
    this.mistakes = 0;
    this.correctAnswers = 0;
    this.allWordsCounter = 0;
    this.wordsStatistics = {};
  }

  launchSprint(words: WordsResponseSchema[] | PaginatedResult[]) {
    const page: HTMLElement = view.gamesView.games;
    page.innerHTML = '';

    this.words = words;
    const { wordId, newWord, newWordTranslate } = this.chooseTranslate(this.words[this.currentWordCounter]);

    page.append(view.gamesView.sprintGame.generateGameContainer(wordId, newWord, newWordTranslate));
    this.setItems();
    this.listen();
  }

  chooseTranslate(
    word: WordsResponseSchema | PaginatedResult
  ): {
    wordId: string;
    newWord: string;
    newWordTranslate: string;
  } {
    const chance: number = Utils.getChance(this.currentWordCounter, 19);
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
    if (this.currentWordCounter < 19) {
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
      this.steps.push(true);
    } else {
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

  setStatistic(action: '+' | '-'): void {
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
      });
    }

    if (action === '+') {
      this.wordsStatistics[this.word].correctAttempts += 1;
      this.correctAnswers += 1;
    } else {
      this.wordsStatistics[this.word].incorrectAttempts += 1;
      this.mistakes += 1;
    }
    console.log(this.wordsStatistics);
    this.allWordsCounter = this.correctAnswers + this.mistakes;
  }

  checkAnswer(event: Event): void {
    const { id } = event.target as HTMLButtonElement;
    if ((id.includes('right') && this.prediction === true) || (id.includes('wrong') && this.prediction === false)) {
      this.soundHelper.playGameSound('../../assets/sounds/ok.wav');
      this.addPoints();
      this.setMultiplicator('+');
      this.setStatistic('+');
      this.setSteps();
    } else {
      this.soundHelper.playGameSound('../../assets/sounds/error.wav');
      this.setSteps();
      this.setMultiplicator('-');
      this.setStatistic('-');
      this.setSteps();
    }
    this.controlCurrentWord();
    this.setNextWord();
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
  }

  listen(): void {
    this.right.addEventListener('click', this.checkAnswer.bind(this));
    this.wrong.addEventListener('click', this.checkAnswer.bind(this));
  }
}
