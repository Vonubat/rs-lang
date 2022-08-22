import Constants from '../../constants';

export default class Tokens {
  public static getToken(): string {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token') as string;
    }
    return Constants.EMPTY_STRING;
  }

  public static setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public static getRefreshToken(): string {
    if (localStorage.getItem('refreshToken')) {
      return localStorage.getItem('refreshToken') as string;
    }
    return Constants.EMPTY_STRING;
  }

  public static setRefreshToken(refreshToken: string): void {
    localStorage.setItem('refreshToken', refreshToken);
  }

  public static delTokens(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}
