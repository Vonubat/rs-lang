import Constants from '../../constants';
import HTMLConstructor from '../components/constructor';

export default class Menu {
  private sidebar: HTMLElement;

  private htmlConstructor: HTMLConstructor;

  private menu: HTMLElement;

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

    const header: HTMLDivElement = this.htmlConstructor.div(['sidebar__header']);
    const brand: HTMLSpanElement = this.htmlConstructor.span(['navbar-brand'], 'MENU');
    header.append(brand);
    this.sidebar.append(header, document.createElement('hr'));
    this.menu = this.htmlConstructor.createHtmlElement('ul', [
      'sidebar__nav-menu',
      'nav',
      'nav-pills',
      'flex-column',
      'mb-auto',
    ]);

    this.fillMenu();
    this.sidebar.append(this.menu);
    this.sidebarWrapper.appendChild(this.sidebar);
  }

  private fillMenu(): void {
    this.menu.innerHTML = '';
    Object.values(Constants.MENU).forEach(
      (
        menuInfo: {
          NAME: string;
          ICON: string;
        },
        index: number
      ): void => {
        const href: string = menuInfo.NAME === 'Main' ? '#' : `#${menuInfo.NAME.toLowerCase()}`;
        const item: HTMLElement = this.htmlConstructor.createHtmlElement('li', ['nav-item', 'sidebar__nav-menu_item']);
        const link: HTMLAnchorElement = this.htmlConstructor.a(`${href}`, ['nav-link']);

        link.removeAttribute('target');
        link.id = `menu-${menuInfo.NAME.toLowerCase()}`;

        const icon: SVGSVGElement = this.htmlConstructor.svg(`${menuInfo.ICON}`, ['bi', 'px-0', 'me-2', 'nav-icon']);
        link.innerHTML = `${icon.outerHTML} ${menuInfo.NAME}`;
        if (index === 0) {
          link.classList.add('active');
        }
        item.appendChild(link);
        this.menu.appendChild(item);
      }
    );
  }

  public getMenu(): HTMLDivElement {
    return this.sidebarWrapper;
  }
}
