import { Action } from '../../types/types';

export default class PageConfig {
  public getPageNumber(): number {
    if (localStorage.getItem('pageNumber')) {
      return Number(localStorage.getItem('pageNumber'));
    }
    return 0;
  }

  public getGroupNumber(): number {
    if (localStorage.getItem('groupNumber')) {
      return Number(localStorage.getItem('groupNumber'));
    }
    return 0;
  }

  public getPageConfig(): PageConfig {
    const pageNumber: number = this.getPageNumber();
    const groupNumber: number = this.getGroupNumber();

    return {
      pageNumber,
      groupNumber,
    };
  }

  public setPageNumber(value: number, action?: Action): void {
    if (action) {
      const currentValue: number = this.getPageNumber();
      const newValue: number = action === '+' ? currentValue + 1 : currentValue - 1;
      this.setPageNumber(newValue);
    } else {
      localStorage.setItem('pageNumber', String(value));
    }
  }

  public setGroupNumber(value: number, action?: Action): void {
    if (action) {
      const currentValue: number = this.getGroupNumber();
      const newValue: number = action === '+' ? currentValue + 1 : currentValue - 1;
      this.setGroupNumber(newValue);
    } else {
      localStorage.setItem('groupNumber', String(value));
      localStorage.setItem('pageNumber', '0');
    }
  }
}
