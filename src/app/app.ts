import { routing } from '../services/routing/routing';
import { view } from '../view/view';
import { burger } from '../services/components/burger';

view.drawMainPage();
burger.listener();
routing.routingHash();
