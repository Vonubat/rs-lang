import Constants from '../constants';
import HTMLConstructor from './components/constructor';
import Header from './components/header';
import Main from './main/main';
import Menu from './menu/menu';
import TextbookView from './textbook/textbook-view';

export class View {
  textbookView: TextbookView;

  htmlConstructor: HTMLConstructor;

  menu: Menu;

  header: Header;

  main: Main;

  constructor() {
    this.textbookView = new TextbookView();
    this.htmlConstructor = new HTMLConstructor();
    this.menu = new Menu();
    this.header = new Header();
    this.main = new Main();
  }

  drawPage() {
    const body = document.getElementById(Constants.BODY_INDEX);
    const appWrapper = this.htmlConstructor.div(['app-wrapper', 'd-flex', 'flex-nowrap']);
    const menuElement = this.menu.getMenu();
    const appElement = this.htmlConstructor.div(['app']);
    // const headerElement = this.header.view();
    const mainElement = this.main.view();
    appElement.append(/* headerElement, */ mainElement);
    appWrapper.append(menuElement, appElement);
    if (body) {
      body.appendChild(appWrapper);
    }
  }
}

export const view: View = new View();
