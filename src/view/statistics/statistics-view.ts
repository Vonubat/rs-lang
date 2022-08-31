import Constants from '../../constants';
import HTMLConstructor from '../components/constructor';

export default class Statistics {
  private main: HTMLDivElement = document.getElementById(Constants.MAIN_ID);

  private htmlConstructor: HTMLConstructor = new HTMLConstructor();

  constructor() {
    const statistics = this.htmlConstructor.div(['statistics']);
    const words = this.htmlConstructor.div(['statistics__words']);
    const accuracy = this.htmlConstructor.div(['statistics__accuracy']);
  }
}
