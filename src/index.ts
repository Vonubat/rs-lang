import 'normalize.css';
import './sass/styles.scss';
import 'bootstrap';
import './app/app';
import { view } from './view/view';
import { routing } from './services/routing/routing';
// import './services/services';


view.drawPage();
(document.querySelector('.sidebar') as HTMLElement).addEventListener('click', (event) => {
  routing.routing(event);
});
