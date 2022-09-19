import Constants from '../../constants';
import { PageConfigResponce } from '../../types/types';

export default class TextbookColor {
  public switchColor(element: HTMLElement, pageConfig: PageConfigResponce): void {
    const currentElem: HTMLElement = element;
    switch (pageConfig.groupNumber) {
      case 0:
        currentElem.style.backgroundColor = Constants.CONTAINER_COLORS['$pink-100'];
        break;
      case 1:
        currentElem.style.backgroundColor = Constants.CONTAINER_COLORS['$orange-100'];
        break;
      case 2:
        currentElem.style.backgroundColor = Constants.CONTAINER_COLORS['$green-100'];
        break;
      case 3:
        currentElem.style.backgroundColor = Constants.CONTAINER_COLORS['$yellow-100'];
        break;
      case 4:
        currentElem.style.backgroundColor = Constants.CONTAINER_COLORS['$cyan-100'];
        break;
      case 5:
        currentElem.style.backgroundColor = Constants.CONTAINER_COLORS['$indigo-100'];
        break;

      default:
        currentElem.style.backgroundColor = 'white';

        break;
    }
  }
}
