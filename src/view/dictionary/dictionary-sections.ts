import HTMLConstructor from '../components/constructor';

export default class DictionarySections extends HTMLConstructor {
  createSectionsWordsWrapper(): HTMLElement {
    const sectionWrapper: HTMLElement = this.createHtmlElement('div', [
      'd-flex',
      'justify-content-center',
      'align-items-center',
      'flex-row',
      'flex-wrap',
      'mt-2',
      'sections-wrapper',
    ]);

    sectionWrapper.append(this.createSectionDifficultWords(), this.createSectionLearnedWords());
    return sectionWrapper;
  }

  createSectionDifficultWords(): HTMLElement {
    return this.createHtmlElement(
      'button',
      ['btn', 'btn-danger', 'btn-lg', 'shadow', 'section-difficult-words'],
      'section-difficult-words',
      undefined,
      'Difficult words'
    );
  }

  createSectionLearnedWords(): HTMLElement {
    return this.createHtmlElement(
      'button',
      ['btn', 'btn-success', 'btn-lg', 'shadow', 'section-learned-words'],
      'section-learned-words',
      undefined,
      'Learned words'
    );
  }
}
