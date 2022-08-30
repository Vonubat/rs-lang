import { routing } from '../services/routing/routing';
import { view } from '../view/view';

view.drawMainPage();
(document.querySelector('.sidebar') as HTMLElement).addEventListener('click', (event) => {
  routing.routing(event);
});
