import Constants from '../../constants';
import { PaginatedResult, TypeOfWordIsPaginatedResult, WordsResponseSchema } from '../../types/types';
import HTMLConstructor from '../components/constructor';

export default class CardGenerator extends HTMLConstructor {
  createCard(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement('div', ['card', 'd-flex', 'align-items-center', 'm-2', 'p-2'], `card-${wordId}`);
  }

  createImg(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement('img', ['img-fluid', 'rounded', 'image'], `image-${wordId}`, [
      ['alt', `image-${word.word}`],
      ['src', `${Constants.BASE_URL}/${word.image}`],
    ]);
  }

  createCardBody(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement(
      'div',
      ['d-flex', 'flex-column', 'justify-content-between', 'card-body'],
      `card-body-${wordId}`
    );
  }

  createWordContainer(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement('h5', ['card-title', 'mb-3', 'word-container'], `word-container-${wordId}`);
  }

  createWord(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement('span', ['word'], `word-${wordId}`, undefined, `${word.word} `);
  }

  createTranscription(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement(
      'span',
      ['transcription'],
      `transcription-${wordId}`,
      undefined,
      `${word.transcription} `
    );
  }

  createSoundIcon(word: WordsResponseSchema | PaginatedResult): SVGSVGElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.svg('volume-up-fill', ['sound-icon'], `sound-icon-${wordId}`, [
      ['data-audio', `${word.audio}`],
      ['data-audio-meaning', `${word.audioMeaning}`],
      ['data-audio-example', `${word.audioExample}`],
    ]);
  }

  createWordTranslate(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement(
      'small',
      ['text-muted', 'word-translate'],
      `word-translate-${wordId}`,
      undefined,
      `${word.wordTranslate} `
    );
  }

  createTextMeaning(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement(
      'p',
      ['card-text', 'mb-3', 'rounded', 'shadow', 'text-meaning'],
      `text-meaning-${wordId}`,
      undefined,
      `${word.textMeaning} `
    );
  }

  createTextMeaningTranslate(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement(
      'small',
      ['text-muted', 'text-meaning-translate'],
      `text-meaning-translate-${wordId}`,
      undefined,
      `${word.textMeaningTranslate} `
    );
  }

  createTextExample(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement(
      'p',
      ['card-text', 'mb-3', 'rounded', 'shadow', 'text-example'],
      `text-example-${wordId}`,
      undefined,
      `${word.textExample} `
    );
  }

  createTextExampleTranslate(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    return this.createHtmlElement(
      'small',
      ['text-muted', 'text-example-translate'],
      `text-example-translate-${wordId}`,
      undefined,
      `${word.textExampleTranslate} `
    );
  }

  generateCard(word: WordsResponseSchema | PaginatedResult, authorized: boolean): HTMLElement {
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

    if (authorized) {
      cardBody.append(this.createControls(word));
    }
    card.append(img, cardBody);

    return card;
  }

  createControls(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    const controlsWrapper: HTMLElement = this.createHtmlElement('div', [
      'd-flex',
      'justify-content-center',
      'align-items-center',
      'controls-btns-wrapper',
    ]);
    const difficultBtn: HTMLElement = this.createHtmlElement(
      'button',
      ['btn', 'btn-outline-danger'],
      `word-difficult-${wordId}`,
      undefined,
      'Difficult'
    );
    const learnedtBtn: HTMLElement = this.createHtmlElement(
      'button',
      ['btn', 'btn-outline-success'],
      `word-learned-${wordId}`,
      undefined,
      'Learned'
    );
    const divider: HTMLElement = this.createHtmlElement('div', ['vr']);
    const badgesWrapper: HTMLElement = this.createBadges(word);

    controlsWrapper.append(difficultBtn, learnedtBtn, divider, badgesWrapper);
    return controlsWrapper;
  }

  createBadges(word: WordsResponseSchema | PaginatedResult): HTMLElement {
    const wordId: string = TypeOfWordIsPaginatedResult(word) ? word._id : word.id;
    const badgesWrapper: HTMLElement = this.createHtmlElement('div', [
      'd-flex',
      'justify-content-center',
      'align-items-center',
      'flex-column',
      'badges-wrapper',
    ]);
    const correctAttempts: HTMLElement = this.createHtmlElement(
      'span',
      ['badge', 'bg-primary'],
      `badge-correct-${wordId}`,
      [
        ['data-bs-toggle', 'custom-tooltip'],
        ['title', 'Correct attempts'],
      ],
      '0'
    );
    const incorrectAttempts: HTMLElement = this.createHtmlElement(
      'span',
      ['badge', 'bg-secondary'],
      `badge-incorrect-${wordId}`,
      [
        ['data-bs-toggle', 'custom-tooltip'],
        ['title', 'Incorrect attempts'],
      ],
      '0'
    );
    badgesWrapper.append(correctAttempts, incorrectAttempts);
    return badgesWrapper;
  }
}
