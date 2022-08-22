import 'normalize.css';
import './app/app';
import './api/words/words';
import './api/auth/auth';
import './sass/main.scss';

import { PartConstructor } from './view/components/parts';

const paginator = new PartConstructor();
paginator.paginator();
const tutu = paginator.card({
  id: '5e9f5ee35eb9e72bc21af4b7',
  group: 0,
  page: 1,
  word: 'carefully',
  image: 'files/02_0023.jpg',
  audio: 'files/02_0023.mp3',
  audioMeaning: 'files/02_0023_meaning.mp3',
  audioExample: 'files/02_0023_example.mp3',
  textMeaning: '<i>Carefully</i> means with great attention, especially to detail or safety.',
  textExample: 'The baby <b>carefully</b> climbed down the stairs.',
  transcription: '[kɛ́ərfəli]',
  textExampleTranslate: 'Малыш осторожно спускался по лестнице',
  textMeaningTranslate: 'Осторожно означает с большим вниманием, особенно к деталям или безопасности',
  wordTranslate: 'внимательно',
});

(document.getElementById('body') as HTMLElement).appendChild(tutu);
