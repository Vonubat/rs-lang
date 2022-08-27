import HTMLConstructor from './components/constructor';
import Header from './components/header';
import TextbookView from './textbook/textbook-view';

export class View {
  htmlConstructor: HTMLConstructor;

  textbookView: TextbookView;

  header: Header;

  constructor() {
    this.htmlConstructor = new HTMLConstructor();
    this.textbookView = new TextbookView();
    this.header = new Header();
  }
}

export const view: View = new View();
