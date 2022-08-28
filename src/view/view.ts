import Constants from '../constants';
import HTMLConstructor from './components/constructor';
import Header from './components/header';
import Footer from './footer/footer';
import Main from './main/main';
import Menu from './menu/menu';
import TextbookView from './textbook/textbook-view';

export class View {
<<<<<<< HEAD
  textbookView: TextbookView;

  htmlConstructor: HTMLConstructor;
=======
  htmlConstructor: HTMLConstructor;

  textbookView: TextbookView;

  header: Header;
>>>>>>> aa89f8c3a72730f119cd6c5dd7c1d486a1ee40a3

  private menu: Menu;

  private header: Header;

  private main: Main;

  private footer: Footer;

  constructor() {
    this.textbookView = new TextbookView();
    this.htmlConstructor = new HTMLConstructor();
    this.menu = new Menu();
    this.header = new Header();
    this.main = new Main();
    this.footer = new Footer();
  }

  drawPage() {
    const body = document.getElementById(Constants.BODY_INDEX);
    const appWrapper = this.htmlConstructor.div(['app-wrapper', 'd-flex', 'flex-nowrap']);
    const menuElement = this.menu.getMenu();
    const appElement = this.htmlConstructor.div(['app']);
    const headerElement = this.header.view();
    const mainElement = this.main.view();
    const footerElement = this.footer.view();
    appElement.append(headerElement, mainElement, footerElement);
    appWrapper.append(menuElement, appElement);
    if (body) {
      body.appendChild(appWrapper);
    }
  }
}

export const view: View = new View();
