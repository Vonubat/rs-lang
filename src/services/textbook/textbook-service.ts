import PageConfig from './page-config';

export default class TextbookService {
  pageConfig: PageConfig;

  pageNumberItemsLeft!: NodeListOf<Element>;

  pageNumberItemsRight!: NodeListOf<Element>;

  groupNumberItemsLeft!: NodeListOf<Element>;

  groupNumberItemsRight!: NodeListOf<Element>;

  constructor() {
    this.pageConfig = new PageConfig();

    // this.pageNumberCurrentTop = document.querySelectorAll('.left-page-number');
    // this.pageNumberItemsRight = document.querySelectorAll('.right-page-number');
    // this.groupNumberItemsLeft = document.querySelectorAll('.left-group-number');
    // this.groupNumberItemsRight = document.querySelectorAll('.right-group-number');
  }

  setPaginationItems() {
    // this.pageNumberItemsLeft = this.textbook.querySelectorAll('.left-page-number');
    // this.pageNumberItemsRight = this.textbook.querySelectorAll('.right-page-number');
    // this.groupNumberItemsLeft = this.textbook.querySelectorAll('.left-group-number');
    // this.groupNumberItemsRight = this.textbook.querySelectorAll('.right-group-number');
  }

  listenPaginationPageNumber() {}
}

const newTest = new TextbookService();
newTest.setPaginationItems();
console.log(newTest.pageNumberItemsLeft);
