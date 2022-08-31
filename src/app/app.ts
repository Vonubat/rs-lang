import { routing } from '../services/routing/routing';
import { view } from '../view/view';
import { burger } from '../services/components/burger';

view.drawMainPage();
(document.querySelector('.sidebar') as HTMLElement).addEventListener('click', (event) => {
  routing.routing(event);
});
burger.listener();
