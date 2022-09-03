import { WordsStatistic, WordsStatistics } from '../../types/types';
import HTMLConstructor from '../components/constructor';

export default class GamesResults extends HTMLConstructor {
  createModal(): HTMLElement {
    const classList: string[] = ['modal fade', 'fade'];
    const modal: HTMLElement = this.createHtmlElement('div', classList, `modal`, [
      ['data-bs-backdrop', 'static'],
      ['data-bs-keyboard', 'false'],
      ['tabindex', '-1'],
      ['aria-hidden', 'true'],
    ]);
    return modal;
  }

  createModalDialog(): HTMLElement {
    const classList: string[] = ['modal-dialog', 'modal-dialog-centered', 'modal-dialog-scrollable'];
    const modalDialog: HTMLElement = this.createHtmlElement('div', classList, `modal-dialog`);
    return modalDialog;
  }

  createModalContent(): HTMLElement {
    const classList: string[] = ['modal-content'];
    const modalContent: HTMLElement = this.createHtmlElement('div', classList, `modal-content`);
    return modalContent;
  }

  createModalHeader(): HTMLElement {
    const classList: string[] = ['modal-header'];
    const modalHeader: HTMLElement = this.createHtmlElement('div', classList, `modal-header`);
    return modalHeader;
  }

  createModalTitle(): HTMLElement {
    const classList: string[] = ['modal-title'];
    const modalTitle: HTMLElement = this.createHtmlElement('h3', classList, `modal-title`, undefined, 'Results');
    return modalTitle;
  }

  createBtnClose(): HTMLElement {
    const classList: string[] = ['btn-close'];
    const btnClose: HTMLElement = this.createHtmlElement('button', classList, `btn-close`, [['type', 'button']]);
    return btnClose;
  }

  createModalBody(): HTMLElement {
    const classList: string[] = ['modal-body'];
    const btnClose: HTMLElement = this.createHtmlElement('div', classList, `modal-body`);
    return btnClose;
  }

  createAccuracyElement(accuracy: number): HTMLElement {
    const accuracyElement: HTMLElement = this.createHtmlElement(
      'span',
      undefined,
      `accuracy`,
      undefined,
      `Accuracy: ${this.createBadge(accuracy, 'text-bg-warning')}%`
    );
    return accuracyElement;
  }

  createInARowElement(inARow: number): HTMLElement {
    const inARowElement: HTMLElement = this.createHtmlElement(
      'span',
      undefined,
      `in-a-row`,
      undefined,
      `In a row: ${this.createBadge(inARow, 'text-bg-secondary')}`
    );
    return inARowElement;
  }

  createRepeatedWordsElement(repeatedWords: number): HTMLElement {
    const repeatedWordsElement: HTMLElement = this.createHtmlElement(
      'span',
      undefined,
      `repeated-words`,
      undefined,
      `Words were repeated: ${this.createBadge(repeatedWords, 'text-bg-primary')}`
    );
    return repeatedWordsElement;
  }

  createRightAnswersElement(rightAnswers: number): HTMLElement {
    const rightAnswersElement: HTMLElement = this.createHtmlElement(
      'span',
      undefined,
      `right-answers`,
      undefined,
      `Right Answers: ${this.createBadge(rightAnswers, 'text-bg-success')}`
    );
    return rightAnswersElement;
  }

  createMistakesElement(mistakes: number): HTMLElement {
    const mistakesElement: HTMLElement = this.createHtmlElement(
      'span',
      undefined,
      `mistakes`,
      undefined,
      `Mistakes: ${this.createBadge(mistakes, 'text-bg-danger')}`
    );
    return mistakesElement;
  }

  createBadge(text: string | number, colorClass: string): HTMLElement {
    const badge: HTMLElement = this.createHtmlElement(
      'span',
      ['badge', `${colorClass}`],
      undefined,
      undefined,
      `${text}`
    );
    return badge;
  }

  createIcon(wordId: string, audio: string): SVGSVGElement {
    return this.svg('volume-up-fill', ['sound-icon'], `sound-icon-${wordId}`, [['data-audio', `${audio}`]]);
  }

  createWord(wordId: string, word: string, wordTranslate: string, audio: string): HTMLElement {
    const wordContainer: HTMLElement = this.createHtmlElement('div', ['d-flex'], `${wordId}`);
    const newWord: HTMLElement = this.createHtmlElement('span', [], undefined, undefined, `${word} — `);
    const newWordTranslate: HTMLElement = this.createHtmlElement(
      'span',
      ['text-muted'],
      undefined,
      undefined,
      `${wordTranslate}`
    );
    const icon: SVGSVGElement = this.createIcon(wordId, audio);

    wordContainer.append(icon, newWord, newWordTranslate);
    return wordContainer;
  }

  createIncorrectWords(wordsStatistics: WordsStatistics): HTMLElement {
    const incorrectWordsWrapper: HTMLElement = this.createHtmlElement('div', ['d-flex', 'flex-column']);

    const words: WordsStatistic[] = Object.values(wordsStatistics);
    words.forEach((item: WordsStatistic) => {
      if (item.incorrectAttempts > 0) {
        incorrectWordsWrapper.append(this.createWord(item.wordId, item.word, item.wordTranslate, item.audio));
      }
    });

    return incorrectWordsWrapper;
  }

  createCorrectWords(wordsStatistics: WordsStatistics): HTMLElement {
    const correctWordsWrapper: HTMLElement = this.createHtmlElement('div', ['d-flex', 'flex-column']);

    const words: WordsStatistic[] = Object.values(wordsStatistics);
    words.forEach((item: WordsStatistic) => {
      if (item.correctAttempts > 0) {
        correctWordsWrapper.append(this.createWord(item.wordId, item.word, item.wordTranslate, item.audio));
      }
    });

    return correctWordsWrapper;
  }

  generateResult(
    wordsStatistics: WordsStatistics,
    accuracy: number,
    inARow: number,
    rightAnswers: number,
    mistakes: number,
    repeatedWords: number
  ): HTMLElement {
    const modal: HTMLElement = this.createModal();
    const modalDialog: HTMLElement = this.createModalDialog();
    const modalContent: HTMLElement = this.createModalContent();
    const modalHeader: HTMLElement = this.createModalHeader();
    const modalTitle: HTMLElement = this.createModalTitle();
    const btnClose: HTMLElement = this.createBtnClose();
    const modalBody: HTMLElement = this.createModalBody();
    modal.append(modalDialog);
    modalDialog.append(modalContent);
    modalContent.append(modalHeader, modalBody);
    modalHeader.append(modalTitle, btnClose);
    const accuracyElement = this.createAccuracyElement(accuracy);
    const inARowElement = this.createInARowElement(inARow);
    const repeatedWordsElement = this.createRepeatedWordsElement(repeatedWords);
    const rightAnswersElement = this.createRightAnswersElement(rightAnswers);
    const mistakesElement = this.createMistakesElement(mistakes);
    const correctWordsWrapper = this.createCorrectWords(wordsStatistics);
    const incorrectWordsWrapper = this.createIncorrectWords(wordsStatistics);
    modalBody.append(
      accuracyElement,
      inARowElement,
      repeatedWordsElement,
      rightAnswersElement,
      correctWordsWrapper,
      mistakesElement,
      incorrectWordsWrapper
    );
    return modal;
  }
}
