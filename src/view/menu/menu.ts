import Constants from '../../constants';
import HTMLConstructor from '../components/constructor';

export default class Menu {
  private sidebar: HTMLElement;

  private htmlConstructor: HTMLConstructor;

  private menu: HTMLElement;

  // private logout: HTMLDivElement;

  constructor() {
    this.htmlConstructor = new HTMLConstructor();
    this.sidebar = this.htmlConstructor.createHtmlElement('nav', ['sidebar', 'd-flex', 'flex-column', 'text-bg-dark']);
    const menuButton = this.htmlConstructor.button(['navbar-toggler'], 'button');
    const header = this.htmlConstructor.div(['sidebar__header']);
    menuButton.dataset.bsToggle = 'offcanvas';
    menuButton.dataset.bsTarget = '#offcanvasNavbar';
    menuButton.setAttribute('aria-controls', 'offcanvasNavbar');
    const buttonIcon = this.htmlConstructor.span(['navbar-toggler-icon']);
    menuButton.appendChild(buttonIcon);
    const brand = this.htmlConstructor.a('#', ['navbar-brand'], 'RSLang');
    header.append(menuButton, brand);
    this.sidebar.append(header, document.createElement('hr'));
    this.menu = this.htmlConstructor.createHtmlElement('ul', [
      'sidebar__nav-menu',
      'nav',
      'nav-pills',
      'flex-column',
      'mb-auto',
    ]);
    // this.logout = this.htmlConstructor.div(['sidebar__logout']);
    this.fillMenu();
    this.sidebar.append(this.menu /* , this.logout */);
  }

  fillMenu() {
    this.menu.innerHTML = '';
    Object.values(Constants.MENU).forEach((menuName) => {
      // TODO: set href
      const item = this.htmlConstructor.createHtmlElement('li', ['nav-item', 'sidebar__nav-menu_item']);
      const link = this.htmlConstructor.a('#', ['nav-link', 'active'], menuName);
      item.appendChild(link);
      this.menu.appendChild(item);
    });
  }

  getMenu() {
    return this.sidebar;
  }
}
