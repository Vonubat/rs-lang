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

  static readonly CONTAINER_COLORS = {
    '$pink-100': 'rgb(247, 214, 230)',
    '$orange-100': 'rgb(255, 229, 208)',
    '$green-100': 'rgb(209, 231, 221)',
    '$yellow-100': 'rgb(255, 243, 205)',
    '$cyan-100': 'rgb(207, 244, 252)',
    '$indigo-100': 'rgb(224, 207, 252)',
  };

  static readonly TOKEN_LIFE_TIME = 1.44e7;

  static readonly MENU = {
    MAIN: 'Main',
    TEXTBOOK: 'Textbook',
    MINIGAMES: 'Minigames',
    STATISTICS: 'Statistics',
  };

  static readonly BODY_INDEX = 'body';

}
