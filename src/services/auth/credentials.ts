import Constants from '../../constants';

export default class Credentials {
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

  public static getUserId(): string {
    if (localStorage.getItem('userId')) {
      return localStorage.getItem('userId') as string;
    }
    return Constants.EMPTY_STRING;
  }

  public static setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  public static getName(): string {
    if (localStorage.getItem('userName')) {
      return localStorage.getItem('userName') as string;
    }
    return Constants.EMPTY_STRING;
  }

  public static setName(name: string): void {
    localStorage.setItem('userName', name);
  }

  public static getEmail(): string {
    if (localStorage.getItem('email')) {
      return localStorage.getItem('email') as string;
    }
    return Constants.EMPTY_STRING;
  }

  public static setEmail(email: string): void {
    localStorage.setItem('email', email);
  }

  public static delCredentials(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
  }
}
