import HTMLConstructor from './constructor';
import { WordsResponseSchema } from '../../types/types';

export class PartConstructor {
  HTMLConstructor: HTMLConstructor;

  constructor() {
    this.HTMLConstructor = new HTMLConstructor();
  }

  paginator() {
    const fragment = document.createDocumentFragment();

    const nav = this.HTMLConstructor.createHtmlElement('nav', [], undefined, [['aria-label', 'pagination']]);

    const ul = this.HTMLConstructor.createHtmlElement('ul', ['pagination', 'justify-content-center']);
    for (let i = 0; i < 22; i += 1) {
      const li = this.HTMLConstructor.createHtmlElement('li', ['page-item']);
      const a = this.HTMLConstructor.createHtmlElement('a', ['page-link'], undefined, [['href', '#']]);
      if (i === 0) {
        a.innerText = 'Предыдущая страница';
        a.classList.add('disabled');
      } else if (i === 21) {
        a.innerText = 'Следующая страница';
      } else {
        a.innerText = `${i}`;
        if (i === 1) li.classList.add('active');
      }

      li.appendChild(a);
      ul.appendChild(li);
    }

    nav.appendChild(ul);
    fragment.appendChild(nav);
    (document.getElementById('body') as HTMLElement).appendChild(fragment);
  }

  card(word: WordsResponseSchema) {
    const fragment = document.createDocumentFragment();

    const wrapper = this.HTMLConstructor.div(['card']);
    wrapper.id = word.id;
    wrapper.setAttribute('style', 'width: 18rem');

    const img = this.HTMLConstructor.createHtmlElement(
      'img',

      ['card-img-up'],
      undefined,
      [
        ['src', `https://my-learnwords-app.herokuapp.com/${word.image}`],
        ['alt', word.word],
      ]
    );
    wrapper.appendChild(img);

    const cardBody = this.HTMLConstructor.div(['card-body']);
    const cardTitle = this.HTMLConstructor.createHtmlElement('h5', ['card-title']);
    cardTitle.innerText = word.word;
    cardBody.appendChild(cardTitle);

    const cardSubTitle1 = this.HTMLConstructor.createHtmlElement('h6', ['card-subtitle', 'text-muted']);
    cardSubTitle1.innerText = word.transcription;
    cardBody.appendChild(cardSubTitle1);

    const cardSubTitle2 = this.HTMLConstructor.createHtmlElement('h6', ['card-subtitle', 'text-muted']);
    cardSubTitle2.innerText = word.wordTranslate;
    cardBody.appendChild(cardSubTitle2);

    // ToDo audio

    const cardTextMeaning = this.HTMLConstructor.createHtmlElement('p', ['card-text']);
    cardTextMeaning.innerHTML = word.textMeaning;
    cardBody.appendChild(cardTextMeaning);

    const cardTranslateMeaning = this.HTMLConstructor.createHtmlElement('p', ['card-text', 'text-muted']);
    cardTranslateMeaning.innerText = word.textMeaningTranslate;
    cardBody.appendChild(cardTranslateMeaning);

    const cardTextExample = this.HTMLConstructor.createHtmlElement('p', ['card-text']);
    cardTextExample.innerHTML = word.textExample;
    cardBody.appendChild(cardTextExample);

    const cardTranslateExample = this.HTMLConstructor.createHtmlElement('p', ['card-text', 'text-muted']);
    cardTranslateExample.innerText = word.textExampleTranslate;
    cardBody.appendChild(cardTranslateExample);

    wrapper.appendChild(cardBody);
    fragment.appendChild(wrapper);

    return fragment;
  }
}
