export default class Tokens {
  public static getToken() {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token') as string;
    }
    return null;
  }
}
