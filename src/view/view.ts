import TextbookView from './textbook/textbook-view';

export class View {
  textbookView: TextbookView;

  constructor() {
    this.textbookView = new TextbookView();
  }
}

export const view: View = new View();
