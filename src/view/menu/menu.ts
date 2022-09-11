import Constants from '../../constants';
import HTMLConstructor from '../components/constructor';

export default class Menu {
  private sidebar: HTMLElement;

  private htmlConstructor: HTMLConstructor;

  private menu: HTMLElement;

  // private logout: HTMLDivElement;

  private sidebarWrapper: HTMLDivElement;

  constructor() {
    this.htmlConstructor = new HTMLConstructor();
    this.sidebarWrapper = this.htmlConstructor.div([
      'col-md-3',
      'col-xl-2',
      'px-sm-2',
      'px-0',
      'text-bg-dark',
      'sidebarmenu',
    ]);
    this.sidebarWrapper.id = 'navmenu';
    this.sidebar = this.htmlConstructor.createHtmlElement('nav', [
      'sidebar',
      'd-flex',
      'flex-column',
      'flex-shrink-0',
      'px-3',
      'pt-2',
      'text-bg-dark',
    ]);
    // const menuButton = this.htmlConstructor.button(['navbar-toggler'], 'button'); menuButton.dataset.bsToggle = 'offcanvas';
    const header = this.htmlConstructor.div(['sidebar__header']);
    /* menuButton.dataset.bsTarget = '#offcanvasNavbar'; menuButton.setAttribute('aria-controls', 'offcanvasNavbar');
    const buttonIcon = this.htmlConstructor.span(['navbar-toggler-icon']); menuButton.appendChild(buttonIcon); */
    // const brand = this.htmlConstructor.a('#', ['navbar-brand'], 'RSLang');
    const brand = this.htmlConstructor.span(['navbar-brand'], 'RSLang');
    header.append(brand);
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
    this.sidebarWrapper.appendChild(this.sidebar);
  }

  private fillMenu() {
    this.menu.innerHTML = '';
    Object.values(Constants.MENU).forEach((menuInfo, index) => {
      // TODO: set href
      const href = menuInfo.NAME === 'Main' ? '#' : `#${menuInfo.NAME.toLowerCase()}`;
      const item = this.htmlConstructor.createHtmlElement('li', ['nav-item', 'sidebar__nav-menu_item']);
      const link = this.htmlConstructor.a(`${href}`, ['nav-link']);
      // link.setAttribute('onclick', 'route()');
      link.removeAttribute('target');
      link.id = `menu-${menuInfo.NAME.toLowerCase()}`;
      // link.dataset.bsToggle = 'collapse';
      const icon = this.htmlConstructor.svg(`${menuInfo.ICON}`, ['bi', 'px-0', 'me-2', 'nav-icon']);
      link.innerHTML = `${icon.outerHTML} ${menuInfo.NAME}`;
      if (index === 0) {
        link.classList.add('active');
      }
      item.appendChild(link);
      this.menu.appendChild(item);
    });
  }

  public getMenu() {
    return this.sidebarWrapper;
  }
}
