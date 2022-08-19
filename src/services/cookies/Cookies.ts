import { CookiesOptions } from '../../types/types';

export default class Cookies {
  public static getCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`)
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

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
      // TODO: solve any problem
      const optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += `=${optionValue}`;
      }
    });
    document.cookie = updatedCookie;
  }

  public static deleteCookie(name: string) {
    Cookies.setCookie(name, '', {
      'max-age': -1,
    });
  }
}
