import Constants from '../../constants';
import { WordsResponseSchema } from '../../types/types';
import HTMLConstructor from '../components/constructor';

export default class CardGenerator extends HTMLConstructor {
  createCard(word: WordsResponseSchema): HTMLElement {
    return this.createHtmlElement('div', ['card', 'd-flex', 'align-items-center', 'm-2', 'p-2'], `card-${word.id}`);
  }

  createImg(word: WordsResponseSchema): HTMLElement {
    return this.createHtmlElement('img', ['img-fluid', 'rounded', 'image'], `image-${word.id}`, [
      ['alt', `image-${word.word}`],
      ['src', `${Constants.BASE_URL}/${word.image}`],
    ]);
  }

  createCardBody(word: WordsResponseSchema): HTMLElement {
    return this.createHtmlElement('div', ['card-body'], `card-body-${word.id}`);
  }

  createWordContainer(word: WordsResponseSchema): HTMLElement {
    return this.createHtmlElement('h5', ['card-title', 'mb-3', 'word-container'], `word-container-${word.id}`);
  }

  createWord(word: WordsResponseSchema): HTMLElement {
    return this.createHtmlElement('span', ['word'], `word-${word.id}`, undefined, `${word.word} `);
  }

  createTranscription(word: WordsResponseSchema): HTMLElement {
    return this.createHtmlElement(
      'span',
      ['transcription'],
      `transcription-${word.id}`,
      undefined,
      `${word.transcription} `
    );
  }

  createSoundIcon(word: WordsResponseSchema): HTMLElement {
    return this.createHtmlElement('img', ['sound-icon'], `sound-icon-${word.id}`, [
      ['alt', `sound-icon`],
      ['src', `./assets/sound-icon.png`],
    ]);
  }

  createWordTranslate(word: WordsResponseSchema): HTMLElement {
    return this.createHtmlElement(
      'small',
      ['text-muted', 'word-translate'],
      `word-translate-${word.id}`,
      undefined,
      `${word.wordTranslate} `
    );
  }

  createTextMeaning(word: WordsResponseSchema): HTMLElement {
    return this.createHtmlElement(
      'p',
      ['card-text', 'mb-3', 'rounded', 'text-meaning'],
      `text-meaning-${word.id}`,
      undefined,
      `${word.textMeaning} `
    );
  }

  createTextMeaningTranslate(word: WordsResponseSchema): HTMLElement {
    return this.createHtmlElement(
      'small',
      ['text-muted', 'text-meaning-translate'],
      `text-meaning-translate-${word.id}`,
      undefined,
      `${word.textMeaningTranslate} `
    );
  }

  createTextExample(word: WordsResponseSchema): HTMLElement {
    return this.createHtmlElement(
      'p',
      ['card-text', 'mb-3', 'rounded', 'text-example'],
      `text-example-${word.id}`,
      undefined,
      `${word.textExample} `
    );
  }

  createTextExampleTranslate(word: WordsResponseSchema): HTMLElement {
    return this.createHtmlElement(
      'small',
      ['text-muted', 'text-example-translate'],
      `text-example-translate-${word.id}`,
      undefined,
      `${word.textExampleTranslate} `
    );
  }

  generateCard(word: WordsResponseSchema): HTMLElement {
    const card: HTMLElement = this.createCard(word);
    const img: HTMLElement = this.createImg(word);
    const cardBody: HTMLElement = this.createCardBody(word);
    const wordContainer: HTMLElement = this.createWordContainer(word);
    const newWord: HTMLElement = this.createWord(word);
    const transcription: HTMLElement = this.createTranscription(word);
    const soundIcon: HTMLElement = this.createSoundIcon(word);
    const wordTranslate: HTMLElement = this.createWordTranslate(word);
    const textMeaning: HTMLElement = this.createTextMeaning(word);
    const textMeaningTranslate: HTMLElement = this.createTextMeaningTranslate(word);
    const textExample: HTMLElement = this.createTextExample(word);
    const textExampleTranslate: HTMLElement = this.createTextExampleTranslate(word);

    wordContainer.append(newWord, transcription, soundIcon, wordTranslate);
    textMeaning.append(textMeaningTranslate);
    textExample.append(textExampleTranslate);
    cardBody.append(wordContainer, textMeaning, textExample);
    card.append(img, cardBody);

    return card;
  }
}
