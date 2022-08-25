import Constants from '../../constants';
import { PageConfigResponce } from '../../types/types';
import HTMLConstructor from '../components/constructor';

export default class Pagination extends HTMLConstructor {
  createPaginationContainer(): HTMLElement {
    return this.createHtmlElement('div', [
      'd-flex',
      'flex-row',
      'justify-content-center',
      'flex-wrap',
      'pagination-container',
    ]);
  }

  createNav(): HTMLElement {
    return this.createHtmlElement('nav', ['m-2']);
  }

  createPagination(): HTMLElement {
    return this.createHtmlElement('ul', ['pagination', 'pagination-md', 'mb-0']);
  }

  createPageItem(classList: string[]): HTMLElement {
    return this.createHtmlElement('li', classList);
  }

  createArrow(direction: string): HTMLElement {
    return this.createHtmlElement('a', ['page-link'], undefined, [['href', '#']], `${direction}`);
  }

  createNumberCurrent(id: string, i: number, position: string): HTMLElement {
    const lastPage = id === 'page-number' ? 30 : 7;
    const pageName = id === 'page-number' ? 'Page' : 'Group';

    return this.createHtmlElement(
      'span',
      ['page-link', 'dropdown-toggle', `${id}-current-${position}`],
      `${id}-current-${position}`,
      [['data-bs-toggle', 'dropdown']],
      `${pageName} ${i} / ${lastPage}`
    );
  }

  createDropdownMenu(): HTMLElement {
    return this.createHtmlElement('ul', ['dropdown-menu', 'scrollable-menu']);
  }

  createDropdownItem(id: string, i: number, position: string): HTMLElement {
    return this.createHtmlElement(
      'a',
      ['dropdown-item', `${id}-${position}`],
      `${id}-${i}-${position}`,
      [['href', '#']],
      `${i}`
    );
  }

  createDropdownDivider(): HTMLElement {
    return this.createHtmlElement('hr', ['dropdown-divider']);
  }

  generatePaginationPageNumber(position: string, pageConfig: PageConfigResponce): HTMLElement {
    const nav: HTMLElement = this.createNav();
    const pagination: HTMLElement = this.createPagination();
    const pageItemLeft: HTMLElement = this.createPageItem(['page-item', 'left-page-number']);
    const pageItemRight: HTMLElement = this.createPageItem(['page-item', 'right-page-number']);
    const pageItemActive: HTMLElement = this.createPageItem(['page-item', 'active']);
    const leftArrow: HTMLElement = this.createArrow(Constants.LEFT_ARROW);
    const rightArrow: HTMLElement = this.createArrow(Constants.RIGHT_ARROW);
    const pageNumberCurrent: HTMLElement = this.createNumberCurrent('page-number', pageConfig.pageNumber, position);
    const dropdownMenu: HTMLElement = this.createDropdownMenu();

    for (let i = 1; i <= 30; i += 1) {
      const dropdownItem: HTMLElement = this.createDropdownItem('page-number', i, position);
      dropdownMenu.append(dropdownItem);
    }

    pageItemActive.append(pageNumberCurrent, dropdownMenu);
    pageItemLeft.append(leftArrow);
    pageItemRight.append(rightArrow);
    pagination.append(pageItemLeft, pageItemActive, pageItemRight);
    nav.append(pagination);

    return nav;
  }

  generatePaginationGroupNumber(position: string, pageConfig: PageConfigResponce): HTMLElement {
    const nav: HTMLElement = this.createNav();
    const pagination: HTMLElement = this.createPagination();
    const pageItemLeft: HTMLElement = this.createPageItem(['page-item', 'left-group-number']);
    const pageItemRight: HTMLElement = this.createPageItem(['page-item', 'right-group-number']);
    const pageItemActive: HTMLElement = this.createPageItem(['page-item', 'active']);
    const leftArrow: HTMLElement = this.createArrow(Constants.LEFT_ARROW);
    const rightArrow: HTMLElement = this.createArrow(Constants.RIGHT_ARROW);
    const groupNumberCurrent: HTMLElement = this.createNumberCurrent('group-number', pageConfig.groupNumber, position);
    const dropdownMenu: HTMLElement = this.createDropdownMenu();
    const dropdownDivider: HTMLElement = this.createDropdownDivider();

    for (let i = 1; i <= 6; i += 1) {
      const dropdownItem: HTMLElement = this.createDropdownItem('group-number', i, position);
      dropdownMenu.append(dropdownItem);
    }

    const dropdownItemSeven: HTMLElement = this.createDropdownItem('group-number', 7, position);
    dropdownMenu.append(dropdownDivider, dropdownItemSeven);

    pageItemActive.append(groupNumberCurrent, dropdownMenu);
    pageItemLeft.append(leftArrow);
    pageItemRight.append(rightArrow);
    pagination.append(pageItemLeft, pageItemActive, pageItemRight);
    nav.append(pagination);

    return nav;
  }

  generatePaginationContainer(position: string, pageConfig: PageConfigResponce): HTMLElement {
    const paginationContainer: HTMLElement = this.createPaginationContainer();
    const paginationPageNumber: HTMLElement = this.generatePaginationPageNumber(position, pageConfig);
    const paginationGroupNumber: HTMLElement = this.generatePaginationGroupNumber(position, pageConfig);

    paginationContainer.append(paginationPageNumber, paginationGroupNumber);

    return paginationContainer;
  }
}
