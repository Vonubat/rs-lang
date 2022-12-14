import { WordsStatistic, WordsStatistics } from '../../types/types';
import HTMLConstructor from '../components/constructor';

export default class GamesResults extends HTMLConstructor {
  private createTriggerModal(): HTMLElement {
    const classList: string[] = ['btn', 'btn-primary', 'visually-hidden'];
    const triggerModal: HTMLElement = this.createHtmlElement('buttom', classList, `trigger-modal`, [
      ['data-bs-toggle', 'modal'],
      ['data-bs-target', '#modal'],
    ]);
    return triggerModal;
  }

  private createModal(): HTMLElement {
    const classList: string[] = ['modal', 'fade'];
    const modal: HTMLElement = this.createHtmlElement('div', classList, `modal`, [
      ['data-bs-backdrop', 'static'],
      ['data-bs-keyboard', 'false'],
      ['tabindex', '-1'],
      ['aria-hidden', 'true'],
    ]);
    return modal;
  }

  private createModalDialog(): HTMLElement {
    const classList: string[] = ['modal-dialog', 'modal-dialog-centered', 'modal-dialog-scrollable'];
    const modalDialog: HTMLElement = this.createHtmlElement('div', classList, `modal-dialog`);
    return modalDialog;
  }

  private createModalContent(): HTMLElement {
    const classList: string[] = ['modal-content'];
    const modalContent: HTMLElement = this.createHtmlElement('div', classList, `modal-content`);
    return modalContent;
  }

  private createModalHeader(): HTMLElement {
    const classList: string[] = ['modal-header'];
    const modalHeader: HTMLElement = this.createHtmlElement('div', classList, `modal-header`);
    return modalHeader;
  }

  private createModalTitle(): HTMLElement {
    const classList: string[] = ['modal-title'];
    const modalTitle: HTMLElement = this.createHtmlElement('h3', classList, `modal-title`, undefined, 'Results');
    return modalTitle;
  }

  private createBtnClose(): HTMLElement {
    const classList: string[] = ['btn-close'];
    const btnClose: HTMLElement = this.createHtmlElement('button', classList, `btn-close`, [
      ['type', 'button'],
      ['data-bs-dismiss', 'modal'],
    ]);
    return btnClose;
  }

  private createModalBody(): HTMLElement {
    const classList: string[] = ['modal-body', 'd-flex', 'flex-column'];
    const btnClose: HTMLElement = this.createHtmlElement('div', classList, `modal-body`);
    return btnClose;
  }

  private createPointsElement(points: number): HTMLElement {
    const pointsElement: HTMLElement = this.createHtmlElement('div', undefined, `points`, undefined, `Points: `);
    pointsElement.append(this.createBadge(points, 'text-bg-info'));
    return pointsElement;
  }

  private createAccuracyElement(accuracy: number): HTMLElement {
    const accuracyElement: HTMLElement = this.createHtmlElement('div', undefined, `accuracy`, undefined, `Accuracy: `);
    accuracyElement.append(this.createBadge(accuracy, 'text-bg-warning'));
    return accuracyElement;
  }

  private createInARowElement(inARow: number): HTMLElement {
    const inARowElement: HTMLElement = this.createHtmlElement('div', undefined, `in-a-row`, undefined, `In a row: `);
    inARowElement.append(this.createBadge(inARow, 'text-bg-secondary'));
    return inARowElement;
  }

  private createRepeatedWordsElement(repeatedWords: number): HTMLElement {
    const repeatedWordsElement: HTMLElement = this.createHtmlElement(
      'div',
      undefined,
      `repeated-words`,
      undefined,
      `Words were repeated: `
    );
    repeatedWordsElement.append(this.createBadge(repeatedWords, 'text-bg-primary'));
    return repeatedWordsElement;
  }

  private createCorrectAnswersElement(correctAnswers: number): HTMLElement {
    const correctAnswersElement: HTMLElement = this.createHtmlElement(
      'div',
      undefined,
      `right-answers`,
      undefined,
      `Correct answers: `
    );
    correctAnswersElement.append(this.createBadge(correctAnswers, 'text-bg-success'));
    return correctAnswersElement;
  }

  private createMistakesElement(mistakes: number): HTMLElement {
    const mistakesElement: HTMLElement = this.createHtmlElement('div', undefined, `mistakes`, undefined, `Mistakes: `);
    mistakesElement.append(this.createBadge(mistakes, 'text-bg-danger'));
    return mistakesElement;
  }

  private createBadge(text: string | number, colorClass: string): HTMLElement {
    const badge: HTMLElement = this.createHtmlElement(
      'span',
      ['badge', `${colorClass}`],
      undefined,
      undefined,
      `${text}`
    );
    return badge;
  }

  private createIcon(wordId: string, audio: string): SVGSVGElement {
    return this.svg('volume-up-fill', ['sound-icon'], `sound-icon-${wordId}`, [['data-audio', `${audio}`]]);
  }

  createWord(wordId: string, word: string, wordTranslate: string, audio: string): HTMLElement {
    const wordContainer: HTMLElement = this.createHtmlElement(
      'div',
      ['d-flex', 'word-container', 'align-items-sm-center'],
      `${wordId}`
    );
    const newWord: HTMLElement = this.createHtmlElement('span', [], undefined, undefined, `${word} -`);
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

  private createIncorrectWords(wordsStatistics: WordsStatistics): HTMLElement {
    const incorrectWordsWrapper: HTMLElement = this.createHtmlElement('div', ['d-flex', 'flex-column']);

    const words: WordsStatistic[] = Object.values(wordsStatistics);
    words.forEach((item: WordsStatistic) => {
      if (item.incorrectAttemptsSession > 0) {
        incorrectWordsWrapper.append(this.createWord(item.wordId, item.word, item.wordTranslate, item.audio));
      }
    });

    return incorrectWordsWrapper;
  }

  private createCorrectWords(wordsStatistics: WordsStatistics): HTMLElement {
    const correctWordsWrapper: HTMLElement = this.createHtmlElement('div', ['d-flex', 'flex-column']);

    const words: WordsStatistic[] = Object.values(wordsStatistics);
    words.forEach((item: WordsStatistic) => {
      if (item.correctAttemptsSession > 0) {
        correctWordsWrapper.append(this.createWord(item.wordId, item.word, item.wordTranslate, item.audio));
      }
    });

    return correctWordsWrapper;
  }

  public generateResults(
    wordsStatistics: WordsStatistics,
    points: number,
    accuracy: number,
    inARow: number,
    correctAnswers: number,
    mistakes: number,
    repeatedWords: number
  ): HTMLElement {
    const triggerModal: HTMLElement = this.createTriggerModal();
    const modal: HTMLElement = this.createModal();
    const modalDialog: HTMLElement = this.createModalDialog();
    const modalContent: HTMLElement = this.createModalContent();
    const modalHeader: HTMLElement = this.createModalHeader();
    const modalBody: HTMLElement = this.createModalBody();
    modal.append(modalDialog);
    modalDialog.append(modalContent);
    modalContent.append(modalHeader, modalBody);
    modalHeader.append(this.createModalTitle(), this.createBtnClose());
    const pointsElement: HTMLElement = this.createPointsElement(points);
    const accuracyElement: HTMLElement = this.createAccuracyElement(accuracy);
    const inARowElement: HTMLElement = this.createInARowElement(inARow);
    const repeatedWordsElement: HTMLElement = this.createRepeatedWordsElement(repeatedWords);
    const correctAnswersElement: HTMLElement = this.createCorrectAnswersElement(correctAnswers);
    const mistakesElement: HTMLElement = this.createMistakesElement(mistakes);
    const correctWordsWrapper: HTMLElement = this.createCorrectWords(wordsStatistics);
    const incorrectWordsWrapper: HTMLElement = this.createIncorrectWords(wordsStatistics);
    modalBody.append(
      pointsElement,
      accuracyElement,
      inARowElement,
      repeatedWordsElement,
      correctAnswersElement,
      correctWordsWrapper,
      mistakesElement,
      incorrectWordsWrapper,
      triggerModal
    );
    return modal;
  }
}
