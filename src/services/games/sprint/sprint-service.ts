import { WordsResponseSchema, PaginatedResult, TypeOfWordIsPaginatedResult } from '../../../types/types';
import Utils from '../../../utilities/utils';
import { view } from '../../../view/view';
import SoundHelper from '../../components/sound-helper';

export default class SprintService {
  soundHelper: SoundHelper;

  words: WordsResponseSchema[] | PaginatedResult[];

  currentWord: number;

  pointsValue: number;

  multiplicatorValue: number;

  steps: boolean[];

  mistakes: number;

  correctAnswers: number;

  allWordsCounter: number;

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

  wordTranslate!: string;

  constructor() {
    this.soundHelper = new SoundHelper();
    this.words = [];
    this.steps = [];
    this.currentWord = 0;
    this.pointsValue = 0;
    this.multiplicatorValue = 10;
    this.mistakes = 0;
    this.correctAnswers = 0;
    this.allWordsCounter = 0;
  }

  launchSprint(words: WordsResponseSchema[] | PaginatedResult[]) {
    const page: HTMLElement = view.gamesView.games;
    page.innerHTML = '';

    this.words = words;
    const { wordId, newWord, newWordTranslate } = this.chooseTranslate(this.words[this.currentWord]);

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
    const chance: number = Utils.getChance(this.currentWord, 19);
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    const newWord: string = word.word;
    const newWordTranslate: string = this.words[chance].wordTranslate;

    this.prediction = false;
    this.wordId = wordId;
    this.word = newWord;
    this.wordTranslate = newWordTranslate;

    if (chance === this.currentWord) {
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
    if (this.currentWord < 19) {
      this.currentWord += 1;
    } else {
      this.currentWord = 0;
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

  checkAnswer(event: Event): void {
    const { id } = event.target as HTMLButtonElement;
    if ((id.includes('right') && this.prediction === true) || (id.includes('wrong') && this.prediction === false)) {
      this.soundHelper.playGameSound('../../assets/sounds/ok.wav');
      this.addPoints();
      this.setMultiplicator('+');
      this.setSteps();
      this.correctAnswers += 1;
    } else {
      this.soundHelper.playGameSound('../../assets/sounds/error.wav');
      this.setMultiplicator('-');
      this.setSteps();
      this.mistakes += 1;
    }
    this.allWordsCounter = this.correctAnswers + this.mistakes;
    this.controlCurrentWord();
    this.setNextWord();
  }

  setNextWord(): void {
    const { wordId, newWord, newWordTranslate } = this.chooseTranslate(this.words[this.currentWord]);
    view.gamesView.sprintGame.createWord(wordId, newWord);
    view.gamesView.sprintGame.createWordTranslate(wordId, newWordTranslate);
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
