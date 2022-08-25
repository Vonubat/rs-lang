export default class Constants {
  //  static readonly CONSTANT_NAME = VALUE;

  static readonly BASE_URL = process.env.BASE_URL;

  static readonly JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;

  static readonly JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

  static readonly MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

  // common constants

  static readonly ID_LENGTH = 24;

  static readonly PASSWORD_MIN_LENGTH = 8;

  static readonly TOKEN_LENGTH = 171;

  static readonly REFRESH_TOKEN_LENGTH = 236;

  static readonly EMPTY_STRING = '';

  static readonly LEFT_ARROW = '&laquo;';

  static readonly RIGHT_ARROW = '&raquo;';
}
