import Constants from '../../constants';
import { PageConfigResponce, TypeOfPagination } from '../../types/types';
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

  createNumberCurrentContainer(): HTMLElement {
    return this.createHtmlElement('li', ['page-item', 'active']);
  }

  createArrow(direction: string, pageConfig: PageConfigResponce, typeOfPagination: TypeOfPagination): HTMLElement {
    const classList: string[] = ['page-item', 'page-link'];

    if (typeOfPagination === 'page') {
      if (direction === Constants.LEFT_ARROW) {
        classList.push('left-page-number');
        if (pageConfig.pageNumber === 0) {
          classList.push('disabled');
        }
      }
      if (direction === Constants.RIGHT_ARROW) {
        classList.push('right-page-number');
        if (pageConfig.pageNumber === 29) {
          classList.push('disabled');
        }
      }
    }

    if (typeOfPagination === 'group') {
      if (direction === Constants.LEFT_ARROW) {
        classList.push('left-group-number');
        if (pageConfig.groupNumber === 0) {
          classList.push('disabled');
        }
      }
      if (direction === Constants.RIGHT_ARROW) {
        classList.push('right-group-number');
        if (pageConfig.groupNumber === 6) {
          classList.push('disabled');
        }
      }
    }

    return this.createHtmlElement('a', classList, undefined, [['href', '#']], `${direction}`);
  }

  createNumberCurrent(id: string, i: number): HTMLElement {
    const lastPage = id === 'page-number' ? 30 : 7;
    const pageName = id === 'page-number' ? 'Page' : 'Group';

    return this.createHtmlElement(
      'span',
      ['page-link', 'dropdown-toggle', `${id}-current`],
      undefined,
      [['data-bs-toggle', 'dropdown']],
      `${pageName} ${i + 1} / ${lastPage}`
    );
  }

  updateNumberCurrent(elements: NodeListOf<Element>, pageConfig: PageConfigResponce): void {
    let pageName: string;
    let lastPage: number;
    let value: number;

    if (elements[0].classList.contains('page-number-current')) {
      pageName = 'Page';
      lastPage = 30;
      value = pageConfig.pageNumber;
    } else {
      pageName = 'Group';
      lastPage = 7;
      value = pageConfig.groupNumber;
    }

    elements.forEach((item: Element): void => {
      const elem: Element = item;
      elem.innerHTML = `${pageName} ${String(value + 1)} / ${lastPage}`;
    });
  }

  disableArrows() {}

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
    const numberCurrentContainer: HTMLElement = this.createNumberCurrentContainer();
    const leftArrow: HTMLElement = this.createArrow(Constants.LEFT_ARROW, pageConfig, 'page');
    const rightArrow: HTMLElement = this.createArrow(Constants.RIGHT_ARROW, pageConfig, 'page');
    const pageNumberCurrent: HTMLElement = this.createNumberCurrent('page-number', pageConfig.pageNumber);
    const dropdownMenu: HTMLElement = this.createDropdownMenu();

    for (let i = 1; i <= 30; i += 1) {
      const dropdownItem: HTMLElement = this.createDropdownItem('page-number', i, position);
      dropdownMenu.append(dropdownItem);
    }

    numberCurrentContainer.append(pageNumberCurrent, dropdownMenu);
    pagination.append(leftArrow, numberCurrentContainer, rightArrow);
    nav.append(pagination);

    return nav;
  }

  generatePaginationGroupNumber(position: string, pageConfig: PageConfigResponce): HTMLElement {
    const nav: HTMLElement = this.createNav();
    const pagination: HTMLElement = this.createPagination();
    const numberCurrentContainer: HTMLElement = this.createNumberCurrentContainer();
    const leftArrow: HTMLElement = this.createArrow(Constants.LEFT_ARROW, pageConfig, 'group');
    const rightArrow: HTMLElement = this.createArrow(Constants.RIGHT_ARROW, pageConfig, 'group');
    const groupNumberCurrent: HTMLElement = this.createNumberCurrent('group-number', pageConfig.groupNumber);
    const dropdownMenu: HTMLElement = this.createDropdownMenu();
    const dropdownDivider: HTMLElement = this.createDropdownDivider();

    for (let i = 1; i <= 6; i += 1) {
      const dropdownItem: HTMLElement = this.createDropdownItem('group-number', i, position);
      dropdownMenu.append(dropdownItem);
    }

    const dropdownItemSeven: HTMLElement = this.createDropdownItem('group-number', 7, position);
    dropdownMenu.append(dropdownDivider, dropdownItemSeven);

    numberCurrentContainer.append(groupNumberCurrent, dropdownMenu);
    pagination.append(leftArrow, numberCurrentContainer, rightArrow);
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
