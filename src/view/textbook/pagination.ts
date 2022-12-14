import Constants from '../../constants';
import { PageConfigResponce, TypeOfPagination } from '../../types/types';
import HTMLConstructor from '../components/constructor';

export default class Pagination extends HTMLConstructor {
  private createPaginationContainer(): HTMLElement {
    return this.createHtmlElement('div', [
      'd-flex',
      'flex-row',
      'justify-content-center',
      'flex-wrap',
      'pagination-container',
    ]);
  }

  private createNav(): HTMLElement {
    return this.createHtmlElement('nav', ['m-2']);
  }

  private createPagination(): HTMLElement {
    return this.createHtmlElement('ul', ['pagination', 'pagination-md', 'mb-0']);
  }

  private createNumberCurrentContainer(): HTMLElement {
    return this.createHtmlElement('li', ['page-item', 'active']);
  }

  private createArrow(direction: string, typeOfPagination: TypeOfPagination): HTMLElement {
    const classList: string[] = ['page-item', 'page-link'];

    if (typeOfPagination === 'Page') {
      if (direction === Constants.LEFT_ARROW) {
        classList.push('left-page-number');
      }
      if (direction === Constants.RIGHT_ARROW) {
        classList.push('right-page-number');
      }
    }

    if (typeOfPagination === 'Group') {
      if (direction === Constants.LEFT_ARROW) {
        classList.push('left-group-number');
      }
      if (direction === Constants.RIGHT_ARROW) {
        classList.push('right-group-number');
      }
    }

    return this.createHtmlElement('li', classList, undefined, [['href', '#']], `${direction}`);
  }

  private createNumberCurrent(id: string, i: number): HTMLElement {
    const lastPage = id === 'page-number' ? 30 : 6;
    const pageName: TypeOfPagination = id === 'page-number' ? 'Page' : 'Group';

    return this.createHtmlElement(
      'span',
      ['page-link', 'dropdown-toggle', `${id}-current`],
      undefined,
      [['data-bs-toggle', 'dropdown']],
      `${pageName} ${i + 1} / ${lastPage}`
    );
  }

  public updateNumberCurrent(elements: NodeListOf<HTMLElement>, pageConfig: PageConfigResponce): void {
    let pageName: TypeOfPagination;
    let lastPage: number;
    let value: number;

    if (elements[0].classList.contains('page-number-current')) {
      pageName = 'Page';
      lastPage = 30;
      value = pageConfig.pageNumber;
    } else {
      pageName = 'Group';
      lastPage = 6;
      value = pageConfig.groupNumber;
    }

    elements.forEach((item: Element): void => {
      const elem: Element = item;
      elem.innerHTML = `${pageName} ${String(value + 1)} / ${lastPage}`;
    });
  }

  public disableArrows(textbook: HTMLElement, pageConfig: PageConfigResponce): void {
    const leftPageArrows: NodeListOf<Element> = textbook.querySelectorAll('.left-page-number');
    const rightPageArrows: NodeListOf<Element> = textbook.querySelectorAll('.right-page-number');
    const leftGroupArrows: NodeListOf<Element> = textbook.querySelectorAll('.left-group-number');
    const rightGroupArrows: NodeListOf<Element> = textbook.querySelectorAll('.right-group-number');

    leftPageArrows.forEach((item: Element): void => {
      item.classList.remove('disabled');
    });
    rightPageArrows.forEach((item: Element): void => {
      item.classList.remove('disabled');
    });
    leftGroupArrows.forEach((item: Element): void => {
      item.classList.remove('disabled');
    });
    rightGroupArrows.forEach((item: Element): void => {
      item.classList.remove('disabled');
    });

    if (pageConfig.pageNumber === 0) {
      leftPageArrows.forEach((item: Element): void => {
        item.classList.add('disabled');
      });
    }
    if (pageConfig.pageNumber === 29) {
      rightPageArrows.forEach((item: Element): void => {
        item.classList.add('disabled');
      });
    }
    if (pageConfig.groupNumber === 0) {
      leftGroupArrows.forEach((item: Element): void => {
        item.classList.add('disabled');
      });
    }
    if (pageConfig.groupNumber === 5) {
      rightGroupArrows.forEach((item: Element): void => {
        item.classList.add('disabled');
      });
    }
  }

  private createDropdownMenu(): HTMLElement {
    return this.createHtmlElement('ul', ['dropdown-menu', 'scrollable-menu']);
  }

  private createDropdownItem(id: string, i: number, position: string): HTMLElement {
    return this.createHtmlElement('a', ['dropdown-item', `${id}`], `${id}-${i}-${position}`, undefined, `${i}`);
  }

  private createDropdownDivider(): HTMLElement {
    return this.createHtmlElement('hr', ['dropdown-divider']);
  }

  private generatePaginationPageNumber(position: string, pageConfig: PageConfigResponce): HTMLElement {
    const nav: HTMLElement = this.createNav();
    const pagination: HTMLElement = this.createPagination();
    const numberCurrentContainer: HTMLElement = this.createNumberCurrentContainer();
    const leftArrow: HTMLElement = this.createArrow(Constants.LEFT_ARROW, 'Page');
    const rightArrow: HTMLElement = this.createArrow(Constants.RIGHT_ARROW, 'Page');
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

  private generatePaginationGroupNumber(position: string, pageConfig: PageConfigResponce): HTMLElement {
    const nav: HTMLElement = this.createNav();
    const pagination: HTMLElement = this.createPagination();
    const numberCurrentContainer: HTMLElement = this.createNumberCurrentContainer();
    const leftArrow: HTMLElement = this.createArrow(Constants.LEFT_ARROW, 'Group');
    const rightArrow: HTMLElement = this.createArrow(Constants.RIGHT_ARROW, 'Group');
    const groupNumberCurrent: HTMLElement = this.createNumberCurrent('group-number', pageConfig.groupNumber);
    const dropdownMenu: HTMLElement = this.createDropdownMenu();

    for (let i = 1; i <= 6; i += 1) {
      const dropdownItem: HTMLElement = this.createDropdownItem('group-number', i, position);
      dropdownMenu.append(dropdownItem);
    }

    numberCurrentContainer.append(groupNumberCurrent, dropdownMenu);
    pagination.append(leftArrow, numberCurrentContainer, rightArrow);
    nav.append(pagination);

    return nav;
  }

  public generatePaginationContainer(position: string, pageConfig: PageConfigResponce): HTMLElement {
    const paginationContainer: HTMLElement = this.createPaginationContainer();
    const paginationPageNumber: HTMLElement = this.generatePaginationPageNumber(position, pageConfig);
    const paginationGroupNumber: HTMLElement = this.generatePaginationGroupNumber(position, pageConfig);

    paginationContainer.append(paginationPageNumber, paginationGroupNumber);

    return paginationContainer;
  }
}
