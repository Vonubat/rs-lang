import Constants from '../constants';

export default class CheckApiParams {
  checkGroupsPagesOfWords(groupNumber: number, pageNumber: number): void {
    if (groupNumber > 5 || groupNumber < 0) {
      throw new Error('groupNumber value should be from 0 to 5');
    }
    if (pageNumber > 29 || pageNumber < 0) {
      throw new Error('pageNumber value should be from 0 to 5');
    }
  }

  checkEmail(email: string): void {
    if (!email.includes('@')) {
      throw new Error('email is not correct');
    }
  }

  checkPassword(password: string): void {
    if (password.length < Constants.PASSWORD_MIN_LENGTH) {
      throw new Error('password should contsins at least 8 chars');
    }
  }

  checkId(id: string): void {
    if (id.length !== Constants.ID_LENGTH) {
      throw new Error('id is not correct');
    }
  }

  checkTokens(token: string): void {
    if (
      token.length !== Constants.TOKEN_LENGTH &&
      token.length !== Constants.REFRESH_TOKEN_LENGTH &&
      token.length !== 0
    ) {
      throw new Error('token is not correct');
    }
  }
}
