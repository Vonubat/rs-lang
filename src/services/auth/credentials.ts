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

  private static setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  private static getName(): string {
    if (localStorage.getItem('userName')) {
      return localStorage.getItem('userName') as string;
    }
    return Constants.EMPTY_STRING;
  }

  private static setName(name: string): void {
    localStorage.setItem('userName', name);
  }

  public static getEmail(): string {
    if (localStorage.getItem('email')) {
      return localStorage.getItem('email') as string;
    }
    return Constants.EMPTY_STRING;
  }

  private static setEmail(email: string): void {
    localStorage.setItem('email', email);
  }

  public static getTimeStamp(): number {
    return Number(localStorage.getItem('timestamp'));
  }

  private static setTimeStamp(): void {
    localStorage.setItem('timestamp', String(Date.now()));
  }

  public static setCredentials(
    token: string,
    refreshToken: string,
    userId: string,
    userName: string,
    email: string
  ): void {
    this.setTimeStamp();
    this.setToken(token);
    this.setRefreshToken(refreshToken);
    this.setUserId(userId);
    this.setName(userName);
    this.setEmail(email);
  }

  public static delCredentials(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('timestamp');
  }
}
