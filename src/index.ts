import 'normalize.css';
import './sass/styles.scss';
import 'bootstrap';
import './app/app';
import './services/services';
import { view } from './view/view';
import { routing } from './services/routing/routing';
import { burger } from './services/components/burger';
// import './services/services';

view.drawPage();
(document.querySelector('.sidebar') as HTMLElement).addEventListener('click', (event) => {
  routing.routing(event);
});

burger.lisener();
