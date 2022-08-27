import 'normalize.css';
import './sass/main.scss';
import 'bootstrap';
import './app/app';
import './services/services';

import Header from './view/components/header';

const part = new Header();

const body = document.getElementById('body') as HTMLElement;
const header = part.view();

body.appendChild(header);
