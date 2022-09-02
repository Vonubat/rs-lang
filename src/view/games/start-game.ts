import { services } from '../../services/services';
import DomHelper from '../../utilities/DOM-helpers';

export default class StartGameView {
  drawStartLocation(elem: HTMLElement, game: 'sprint' | 'audio-challenge'): HTMLElement {
    const element: HTMLElement = elem;
    const timer: HTMLElement = services.timer.createTimerElement(game, 'start');
    services.timer.createTimerConfig(timer, 3000, DomHelper.capitalizeFirstLetter);

    element.innerHTML = '';

    if (game === 'sprint') {
      element.style.backgroundImage = 'linear-gradient(to right, #ff512f, #f09819)';
    }

    if (game === 'audio-challenge') {
      element.style.backgroundImage = 'linear-gradient(to right, #8360c3, #2ebf91)';
    }

    element.append(timer);
    return element;
  }
}
