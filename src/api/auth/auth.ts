import Constants from '../../constants';
import HttpClient from '../http-client';
import { AuthResponseSchema, CredentialsSchema } from '../../types/types';
import CheckApiParams from '../../utilities/check-api-params';
import Tokens from '../../services/auth/tokens';

export default class Auth {
  private httpClient: HttpClient;

  private checkApiParams: CheckApiParams;

  constructor(httpClient: HttpClient, checkApiParams: CheckApiParams) {
    this.httpClient = httpClient;
    this.checkApiParams = checkApiParams;
  }

  /**
   * Endpoint: /signin [POST method].
   * Logins a user and returns a JWT-token.
   * @param {Object} credentials - credentials of user. Object (request body) should contains: [Example] -> { "email": "string", "password": "string}
   * @return {Promise<AuthResponseSchema>} - object which contains: message, token, refreshToken, userId, name.
   */

  public async signIn(credentials: CredentialsSchema): Promise<AuthResponseSchema> {
    const { email, password } = credentials;
    this.checkApiParams.checkEmail(email);
    this.checkApiParams.checkPassword(password);

    const url: URL = new URL(`${Constants.BASE_URL}/signin`);
    const response: Response = await this.httpClient.post(
      url,
      JSON.stringify({
        email,
        password,
      }),
      Tokens.getToken()
    );
    const content: AuthResponseSchema = await response.json();
    const { token, refreshToken } = content;
    Tokens.setToken(token);
    Tokens.setRefreshToken(refreshToken);

    // console.log(content);
    return content;
  }
}

// const test = new Auth(new HttpClient());
// test.signIn({ email: 'test@test.com', password: '1234567890' });
