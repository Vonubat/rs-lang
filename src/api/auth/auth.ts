import Constants from '../../constants';
import HttpClient from '../http-client';
import { AuthResponseSchema, CredentialsSchema } from '../../types/types';
import Tokens from '../../services/auth/tokens';

export default class Auth extends HttpClient {
  /**
   * Endpoint: /signin [POST method].
   * Logins a user and returns a JWT-token.
   * @param {Object} credentials - credentials of user. Object (request body) should contains: [Example] -> { "email": "string", "password": "string"}.
   * @return {Promise<AuthResponseSchema>} - object which contains: message, token, refreshToken, userId, name.
   */

  public async signIn(credentials: CredentialsSchema): Promise<AuthResponseSchema> {
    const { email, password } = credentials;
    this.checkEmail(email);
    this.checkPassword(password);

    const url: URL = new URL(`${Constants.BASE_URL}/signin`);
    const response: Response = await this.post(
      url,
      JSON.stringify({
        email,
        password,
      })
    );
    const content: AuthResponseSchema = await response.json();
    const { token, refreshToken } = content;
    Tokens.setToken(token);
    Tokens.setRefreshToken(refreshToken);

    // console.log(content);
    return content;
  }
}
