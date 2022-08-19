import Constants from '../../constants';
import HttpClient from '../http-client';
import { AuthResponseSchema } from '../../types/types';

class Auth {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Endpoint: /signin [POST method].
   * Logins a user and returns a JWT-token.
   * @param {Object} Body- contains email, password.
   * @param {number} Body.email - email of user.
   * @param {number} Body.password - password of user (PASSWORD_MIN_LENGTH === 8).
   * @return {Promise<AuthResponseSchema[]>} - object which contains message, token, refreshToken, userId, name.
   */

  public async signIn({ email, password }: { email: string; password: string }): Promise<AuthResponseSchema> {
    if (!email.includes('@')) {
      throw new Error('email is not correct');
    }
    if (password.length < Constants.PASSWORD_MIN_LENGTH) {
      throw new Error('password should contsins at least 8 chars');
    }

    const response: Response = await this.httpClient.post(
      `${Constants.BASE_URL}/signin`,
      JSON.stringify({
        email,
        password,
      })
    );

    const content: AuthResponseSchema = await response.json();
    console.log(content);
    return content;
  }
}

// const test = new Auth(new HttpClient());
// test.signIn({ email: 'test@test.com', password: '1234567890' });

export default Auth;
