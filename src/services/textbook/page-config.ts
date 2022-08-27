import { Action, PageConfigResponce } from '../../types/types';

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

  public getPageConfigResponse(): PageConfigResponce {
    const pageNumber: number = this.getPageNumber();
    const groupNumber: number = this.getGroupNumber();
    return {
      pageNumber,
      groupNumber,
    };
  }

  public shiftPageNumber(action: Action): void {
    const currentValue: number = this.getPageNumber();
    const newValue: number = action === '+' ? currentValue + 1 : currentValue - 1;
    this.setPageNumber(newValue);
  }

  public setPageNumber(value: number): void {
    localStorage.setItem('pageNumber', String(value));
  }

  public shiftGroupNumber(action: Action): void {
    const currentValue: number = this.getGroupNumber();
    const newValue: number = action === '+' ? currentValue + 1 : currentValue - 1;
    this.setGroupNumber(newValue);
  }

  public setGroupNumber(value: number): void {
    localStorage.setItem('groupNumber', String(value));
  }
}
