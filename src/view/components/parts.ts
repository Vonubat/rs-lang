import HTMLConstructor from './constructor';
import { WordsResponseSchema } from '../../types/types';

export class PartConstructor {
  HTMLConstructor: HTMLConstructor;

  constructor() {
    this.HTMLConstructor = new HTMLConstructor();
  }

  paginator() {
    const fragment = document.createDocumentFragment();

    const nav = this.HTMLConstructor.basic('nav', undefined, [], [['aria-label', 'pagination']]);

    const ul = this.HTMLConstructor.basic('ul', undefined, ['pagination', 'justify-content-center']);
    for (let i = 0; i < 22; i += 1) {
      const li = this.HTMLConstructor.basic('li', undefined, ['page-item']);
      const a = this.HTMLConstructor.basic('a', undefined, ['page-link'], [['href', '#']]);
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

    const wrapper = this.HTMLConstructor.basic('div', undefined, ['card']);
    wrapper.id = word.id;
    wrapper.setAttribute('style', 'width: 18rem');

    const img = this.HTMLConstructor.basic(
      'img',
      undefined,
      ['card-img-up'],
      [
        ['src', `https://my-learnwords-app.herokuapp.com/${word.image}`],
        ['alt', word.word],
      ]
    );
    wrapper.appendChild(img);

    const cardBody = this.HTMLConstructor.basic('div', undefined, ['card-body']);
    const cardTitle = this.HTMLConstructor.basic('h5', undefined, ['card-title']);
    cardTitle.innerText = word.word;
    cardBody.appendChild(cardTitle);

    const cardSubTitle1 = this.HTMLConstructor.basic('h6', undefined, ['card-subtitle', 'text-muted']);
    cardSubTitle1.innerText = word.transcription;
    cardBody.appendChild(cardSubTitle1);

    const cardSubTitle2 = this.HTMLConstructor.basic('h6', undefined, ['card-subtitle', 'text-muted']);
    cardSubTitle2.innerText = word.wordTranslate;
    cardBody.appendChild(cardSubTitle2);

    // ToDo audio

    const cardTextMeaning = this.HTMLConstructor.basic('p', undefined, ['card-text']);
    cardTextMeaning.innerHTML = word.textMeaning;
    cardBody.appendChild(cardTextMeaning);

    const cardTranslateMeaning = this.HTMLConstructor.basic('p', undefined, ['card-text', 'text-muted']);
    cardTranslateMeaning.innerText = word.textMeaningTranslate;
    cardBody.appendChild(cardTranslateMeaning);

    const cardTextExample = this.HTMLConstructor.basic('p', undefined, ['card-text']);
    cardTextExample.innerHTML = word.textExample;
    cardBody.appendChild(cardTextExample);

    const cardTranslateExample = this.HTMLConstructor.basic('p', undefined, ['card-text', 'text-muted']);
    cardTranslateExample.innerText = word.textExampleTranslate;
    cardBody.appendChild(cardTranslateExample);

    wrapper.appendChild(cardBody);
    fragment.appendChild(wrapper);

    return fragment;
  }
}
