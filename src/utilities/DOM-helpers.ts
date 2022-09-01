/* eslint-disable no-param-reassign */

import { Color } from '../types/types';

/* eslint-disable no-cond-assign */
export default class DomHelper {
  // find closeset Ancestor which class contains ${cls}
  static findAncestor(el: HTMLElement, cls: string): HTMLElement {
    while (el.parentElement !== null && (el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }

  static resetBackground(el: HTMLElement, color: Color = '#FFFFFF'): HTMLElement {
    const element = el;
    element.style.backgroundColor = color;
    return element;
  }
}
