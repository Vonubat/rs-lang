import { Color, PaginatedResult, WordsResponseSchema } from '../types/types';
/* eslint-disable no-param-reassign */
/* eslint-disable no-cond-assign */
export default class Utils {
  // find closeset Ancestor which class contains ${cls}
  public static findAncestor(el: HTMLElement, cls: string): HTMLElement {
    while (el.parentElement !== null && (el = el.parentElement) && !el.classList.contains(cls));
    return el;
  }

  // change bg-color of input element
  public static resetBackground(el: HTMLElement, color: Color = '#FFFFFF'): HTMLElement {
    const element: HTMLElement = el;
    element.style.backgroundImage = '';
    element.style.backgroundColor = color;
    return element;
  }

  // makes the first letter of a string uppercase in JavaScript?
  public static capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // get random chance and change the number
  public static getChance(num: number, totalCount: number): number {
    const chance: number = Math.random();
    if (Math.random() > 0.5) {
      return num;
    }
    return Math.floor(totalCount * chance);
  }

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  public static shuffleWords(
    words: WordsResponseSchema[] | PaginatedResult[] | [string, WordsResponseSchema | PaginatedResult][]
  ): WordsResponseSchema[] | PaginatedResult[] | [string, WordsResponseSchema | PaginatedResult][] {
    for (let i = words.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    return words;
  }
}
