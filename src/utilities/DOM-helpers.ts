/* eslint-disable no-param-reassign */
/* eslint-disable no-cond-assign */
export default class DomHelper {
  // find closeset Ancestor which class contains ${cls}
  static findAncestor(el: HTMLElement, cls: string): HTMLElement {
    while (el.parentElement !== null && (el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }
}