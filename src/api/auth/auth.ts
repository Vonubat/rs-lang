import Constants from '../../constants';
import HttpClient from '../http-client';
import { AuthResponseSchema, CredentialsSchema } from '../../types/types';

export default class Auth extends HttpClient {
  /**
   * Endpoint: /signin [POST method].
   * Logins a user and returns a JWT-token.
   * @param {Object} credentials - credentials of user. Object (request body) should contains: [Example] -> { "email": "string", "password": "string"}.
   * @return {Promise<AuthResponseSchema>} - object which contains: message, token, refreshToken, userId, name.
   */

  public async signIn(credentials: CredentialsSchema): Promise<AuthResponseSchema | Response> {
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

    if (!response.ok) {
      // status 403 -> Incorrect e-mail or password
      return response;
    }

    const content: AuthResponseSchema = await response.json();

    // console.log(content);

    return content;
  }
}
