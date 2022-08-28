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

  static readonly MENU = {
    MAIN: {
      NAME: 'Main',
      ICON: 'house',
    },
    TEXTBOOK: {
      NAME: 'Textbook',
      ICON: 'book',
    },

    MINIGAMES: {
      NAME: 'Minigames',
      ICON: 'controller',
    },
    STATISTICS: {
      NAME: 'Statistics',
      ICON: 'graph-up',
    },
  };

  static readonly BODY_INDEX = 'body';


  static readonly BOOTSTRAP_COLORS = [
    'text-primary',
    'text-secondary',
    'text-success',
    'text-danger',
    'text-warning',
    'text-info',
    'text-dark'
  ];

  static readonly TEAM = [
    {
      name: 'Vonubat',
      github: 'https://github.com/vonubat',
    },
    {
      name: 'SlavikusVOG',
      github: 'https://github.com/slavikusvog',
    },
    {
      name: 'Der_Thun',
      github: 'https://github.com/der-thun',
    },

  ];

  static readonly BOOTSTRAP_COLORS = [
    'text-primary',
    'text-secondary',
    'text-success',
    'text-danger',
    'text-warning',
    'text-info',
    'text-dark',
  ];
}
