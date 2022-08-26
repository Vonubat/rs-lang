import HTMLConstructor from './components/constructor';
import TextbookView from './textbook/textbook-view';

export class View {
  textbookView: TextbookView;

  htmlConstructor: HTMLConstructor;

  constructor() {
    this.textbookView = new TextbookView();
    this.htmlConstructor = new HTMLConstructor();
  }
}

export const view: View = new View();
