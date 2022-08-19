import { CookiesOptions } from '../../types/types';

export default class Cookies {
  /**
   * getCookie.
   * @param {string} name - the name of cookie.
   * @return {string | undefined} - cookie's value or undefined
   */
  public static getCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`)
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  /**
   * setCookie.
   * @param {string} name - the name of cookie.
   * @param {string} value - the value of cookie.
   * @param {CookiesOptions} options - cookie's options.
   * @return {void}
   */
  public static setCookie(name: string, value: string, options: CookiesOptions = {}) {
    const props: CookiesOptions = {
      path: '/',
      // при необходимости добавьте другие значения по умолчанию
      ...options,
    };

    if (props.expires instanceof Date) {
      props.expires = props.expires.toUTCString();
    }

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    // for (const optionKey in options) {
    Object.keys(options).forEach((optionKey) => {
      updatedCookie += `; ${optionKey}`;
      const optionValue = options[optionKey as keyof CookiesOptions];
      if (optionValue !== true) {
        updatedCookie += `=${optionValue}`;
      }
    });
    document.cookie = updatedCookie;
  }

  /**
   * deleteCookie.
   * @param {string} name - the name of cookie.
   * @return {void}
   */
  public static deleteCookie(name: string) {
    Cookies.setCookie(name, '', {
      'max-age': -1,
    });
  }
}
