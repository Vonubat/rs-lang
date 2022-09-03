import Constants from '../../constants';
import { PaginatedResult } from '../../types/types';
import HTMLConstructor from '../components/constructor';

export default class DictionaryCardGenerator extends HTMLConstructor {
  createCard(word: PaginatedResult): HTMLElement {
    const classList: string[] = ['card', 'd-flex', 'align-items-center', 'm-2', 'p-2'];

    if (word.userWord?.difficulty === 'hard') {
      classList.push('hard-word');
    }
    if (word.userWord?.difficulty === 'learned') {
      classList.push('learned-word');
    }

    const card: HTMLElement = this.createHtmlElement('div', classList, `card-${word._id}`);

    return card;
  }

  createImg(word: PaginatedResult): HTMLElement {
    return this.createHtmlElement('img', ['img-fluid', 'rounded', 'image'], `image-${word._id}`, [
      ['alt', `image-${word.word}`],
      ['src', `${Constants.BASE_URL}/${word.image}`],
    ]);
  }

  createCardBody(word: PaginatedResult): HTMLElement {
    return this.createHtmlElement(
      'div',
      ['d-flex', 'flex-column', 'justify-content-between', 'card-body'],
      `card-body-${word._id}`
    );
  }

  createWordContainer(word: PaginatedResult): HTMLElement {
    return this.createHtmlElement('h5', ['card-title', 'mb-3', 'word-container'], `word-container-${word._id}`);
  }

  createWord(word: PaginatedResult): HTMLElement {
    return this.createHtmlElement('span', ['word'], `word-${word._id}`, undefined, `${word.word} `);
  }

  createTranscription(word: PaginatedResult): HTMLElement {
    return this.createHtmlElement(
      'span',
      ['transcription'],
      `transcription-${word._id}`,
      undefined,
      `${word.transcription} `
    );
  }

  createSoundIcon(word: PaginatedResult): SVGSVGElement {
    return this.svg('volume-up-fill', ['sound-icon'], `sound-icon-${word._id}`, [
      ['data-audio', `${word.audio}`],
      ['data-audio-meaning', `${word.audioMeaning}`],
      ['data-audio-example', `${word.audioExample}`],
    ]);
  }

  createWordTranslate(word: PaginatedResult): HTMLElement {
    return this.createHtmlElement(
      'small',
      ['text-muted', 'word-translate'],
      `word-translate-${word._id}`,
      undefined,
      `${word.wordTranslate} `
    );
  }

  createTextMeaning(word: PaginatedResult): HTMLElement {
    return this.createHtmlElement(
      'p',
      ['card-text', 'mb-3', 'rounded', 'shadow', 'text-meaning'],
      `text-meaning-${word._id}`,
      undefined,
      `${word.textMeaning} `
    );
  }

  createTextMeaningTranslate(word: PaginatedResult): HTMLElement {
    return this.createHtmlElement(
      'small',
      ['text-muted', 'text-meaning-translate'],
      `text-meaning-translate-${word._id}`,
      undefined,
      `${word.textMeaningTranslate} `
    );
  }

  createTextExample(word: PaginatedResult): HTMLElement {
    return this.createHtmlElement(
      'p',
      ['card-text', 'mb-3', 'rounded', 'shadow', 'text-example'],
      `text-example-${word._id}`,
      undefined,
      `${word.textExample} `
    );
  }

  createTextExampleTranslate(word: PaginatedResult): HTMLElement {
    return this.createHtmlElement(
      'small',
      ['text-muted', 'text-example-translate'],
      `text-example-translate-${word._id}`,
      undefined,
      `${word.textExampleTranslate} `
    );
  }

  generateCard(word: PaginatedResult): HTMLElement {
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
    cardBody.append(wordContainer, textMeaning, textExample, this.createControls(word));
    card.append(img, cardBody);

    return card;
  }

  createControls(word: PaginatedResult): HTMLElement {
    const controlsWrapper: HTMLElement = this.createHtmlElement('div', [
      'd-flex',
      'justify-content-center',
      'align-items-center',
      'controls-btns-wrapper',
    ]);
    const removeBtn: HTMLElement = this.createHtmlElement(
      'button',
      ['btn', 'btn-outline-secondary', 'remove-word-btn'],
      `word-difficult-btn-${word._id}`,
      undefined,
      'Remove word'
    );

    const divider: HTMLElement = this.createHtmlElement('div', ['vr']);
    const badgesWrapper: HTMLElement = this.createBadges(word);

    controlsWrapper.append(removeBtn, divider, badgesWrapper);
    return controlsWrapper;
  }

  createBadges(word: PaginatedResult): HTMLElement {
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
      `badge-correct-${word._id}`,
      [
        ['data-bs-toggle', 'custom-tooltip'],
        ['title', 'Correct attempts'],
      ],
      '0'
    );
    const incorrectAttempts: HTMLElement = this.createHtmlElement(
      'span',
      ['badge', 'bg-secondary', 'badge-incorrect'],
      `badge-incorrect-${word._id}`,
      [
        ['data-bs-toggle', 'custom-tooltip'],
        ['title', 'Incorrect attempts'],
      ],
      '0'
    );
    badgesWrapper.append(correctAttempts, incorrectAttempts);
    return badgesWrapper;
  }

  createNoCardWord(): HTMLElement {
    const card: HTMLElement = this.createHtmlElement(
      'div',
      ['card', 'd-flex', 'align-items-center', 'm-2', 'p-2'],
      `card-sorry}`
    );
    const img: HTMLElement = this.createHtmlElement('img', ['img-fluid', 'rounded', 'image'], undefined, [
      ['alt', `image-sorry`],
      ['src', `../../assets/img/sorry.jpg`],
    ]);
    const text: HTMLElement = this.createHtmlElement(
      'h5',
      ['card-title', 'mb-3', 'text-center', 'word-container'],
      undefined,
      undefined,
      'No words found to display on this page.'
    );
    card.append(img, text);
    return card;
  }
}
