import Constants from '../../constants';
import { PaginatedResult, TypeOfWordIsPaginatedResult, WordsResponseSchema } from '../../types/types';
import HTMLConstructor from '../components/constructor';

export default class TextbookCardGenerator extends HTMLConstructor {
  private createCard(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const classList: string[] = ['card', 'd-flex', 'align-items-center', 'm-2', 'p-2'];
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;

    if (TypeOfWordIsPaginatedResult(word)) {
      if (word.userWord?.difficulty === 'hard') {
        classList.push('hard-word');
      }
      if (word.userWord?.difficulty === 'learned') {
        classList.push('learned-word');
      }
    }

    const card: HTMLElement = this.createHtmlElement('div', classList, `card-${wordId}`);

    return card;
  }

  private createImg(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement('img', ['img-fluid', 'rounded', 'image'], `image-${wordId}`, [
      ['alt', `image-${word.word}`],
      ['src', `${Constants.BASE_URL}/${word.image}`],
    ]);
  }

  private createCardBody(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement(
      'div',
      ['d-flex', 'flex-column', 'justify-content-between', 'card-body'],
      `card-body-${wordId}`
    );
  }

  private createWordContainer(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement('h5', ['card-title', 'mb-3', 'word-container'], `word-container-${wordId}`);
  }

  private createWord(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement('span', ['word'], `word-${wordId}`, undefined, `${word.word} `);
  }

  private createTranscription(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement(
      'span',
      ['transcription'],
      `transcription-${wordId}`,
      undefined,
      `${word.transcription} `
    );
  }

  private createSoundIcon(word: WordsResponseSchema | PaginatedResult): SVGSVGElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.svg('volume-up-fill', ['sound-icon'], `sound-icon-${wordId}`, [
      ['data-audio', `${word.audio}`],
      ['data-audio-meaning', `${word.audioMeaning}`],
      ['data-audio-example', `${word.audioExample}`],
    ]);
  }

  private createWordTranslate(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement(
      'small',
      ['text-muted', 'word-translate'],
      `word-translate-${wordId}`,
      undefined,
      `${word.wordTranslate} `
    );
  }

  private createTextMeaning(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement(
      'p',
      ['card-text', 'mb-3', 'rounded', 'shadow', 'text-meaning'],
      `text-meaning-${wordId}`,
      undefined,
      `${word.textMeaning} `
    );
  }

  private createTextMeaningTranslate(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement(
      'small',
      ['text-muted', 'text-meaning-translate'],
      `text-meaning-translate-${wordId}`,
      undefined,
      `${word.textMeaningTranslate} `
    );
  }

  private createTextExample(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement(
      'p',
      ['card-text', 'mb-3', 'rounded', 'shadow', 'text-example'],
      `text-example-${wordId}`,
      undefined,
      `${word.textExample} `
    );
  }

  private createTextExampleTranslate(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement(
      'small',
      ['text-muted', 'text-example-translate'],
      `text-example-translate-${wordId}`,
      undefined,
      `${word.textExampleTranslate} `
    );
  }

  public generateCard(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const card: HTMLElement = this.createCard(word);
    const img: HTMLElement = this.createImg(word);
    const cardBody: HTMLElement = this.createCardBody(word);
    const wordContainer: HTMLElement = this.createWordContainer(word);
    const newWord: HTMLElement = this.createWord(word);
    const transcription: HTMLElement = this.createTranscription(word);
    const soundIcon: SVGSVGElement = this.createSoundIcon(word);
    const wordTranslate: HTMLElement = this.createWordTranslate(word);
    const textMeaning: HTMLElement = this.createTextMeaning(word);
    const textMeaningTranslate: HTMLElement = this.createTextMeaningTranslate(word);
    const textExample: HTMLElement = this.createTextExample(word);
    const textExampleTranslate: HTMLElement = this.createTextExampleTranslate(word);

    wordContainer.append(newWord, transcription, soundIcon, wordTranslate);
    textMeaning.append(textMeaningTranslate);
    textExample.append(textExampleTranslate);
    cardBody.append(wordContainer, textMeaning, textExample);

    if (TypeOfWordIsPaginatedResult(word)) {
      cardBody.append(this.createControls(word));
    }
    card.append(img, cardBody);

    return card;
  }

  private createControls(word: PaginatedResult): HTMLElement {
    const wordId: string = word._id;
    const controlsWrapper: HTMLElement = this.createHtmlElement('div', [
      'd-flex',
      'justify-content-center',
      'align-items-center',
      'controls-btns-wrapper',
    ]);
    const difficultBtn: HTMLElement = this.createHtmlElement(
      'button',
      ['btn', 'btn-outline-danger', 'word-difficult-btn'],
      `word-difficult-btn-${wordId}`,
      undefined,
      'Difficult'
    );
    const learnedtBtn: HTMLElement = this.createHtmlElement(
      'button',
      ['btn', 'btn-outline-success', 'word-learned-btn'],
      `word-learned-btn-${wordId}`,
      undefined,
      'Learned'
    );
    const divider: HTMLElement = this.createHtmlElement('div', ['vr']);
    const badgesWrapper: HTMLElement = this.createBadges(word);

    controlsWrapper.append(difficultBtn, learnedtBtn, divider, badgesWrapper);
    return controlsWrapper;
  }

  private createBadges(word: PaginatedResult): HTMLElement {
    const wordId: string = word._id;
    const badgesWrapper: HTMLElement = this.createHtmlElement('div', [
      'd-flex',
      'justify-content-center',
      'align-items-center',
      'flex-column',
      'badges-wrapper',
    ]);
    const correctAttempts: HTMLElement = this.createHtmlElement(
      'span',
      ['badge', 'bg-primary', 'badge-correct'],
      `badge-correct-${wordId}`,
      [
        ['data-bs-toggle', 'custom-tooltip'],
        ['title', 'Correct attempts'],
      ],
      `${word.userWord?.optional?.correctAttempts || 0}`
    );
    const incorrectAttempts: HTMLElement = this.createHtmlElement(
      'span',
      ['badge', 'bg-secondary', 'badge-incorrect'],
      `badge-incorrect-${wordId}`,
      [
        ['data-bs-toggle', 'custom-tooltip'],
        ['title', 'Incorrect attempts'],
      ],
      `${word.userWord?.optional?.incorrectAttempts || 0}`
    );
    badgesWrapper.append(correctAttempts, incorrectAttempts);
    return badgesWrapper;
  }
}
