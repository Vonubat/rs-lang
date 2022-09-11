import Auth from './auth/auth';
import UsersAggregatedWords from './users-aggregated-words/users-aggregated-words';
import UserSettings from './users-settings/users-settings';
import UsersStatistics from './users-statistics/users-statistics';
import UsersWords from './users-words/users-words';
import Users from './users/users';
import Words from './words/words';

export class Api {
  private _words: Words;

  private _users: Users;

  private _usersWords: UsersWords;

  private _usersAggregateWords: UsersAggregatedWords;

  private _usersStatistics: UsersStatistics;

  private _usersSettings: UserSettings;

  private _auth: Auth;

  constructor(
    words: Words,
    users: Users,
    usersWords: UsersWords,
    usersAggregatedWords: UsersAggregatedWords,
    usersStatistics: UsersStatistics,
    usersSettings: UserSettings,
    auth: Auth
  ) {
    this._words = words;
    this._users = users;
    this._usersWords = usersWords;
    this._usersAggregateWords = usersAggregatedWords;
    this._usersStatistics = usersStatistics;
    this._usersSettings = usersSettings;
    this._auth = auth;
  }

  get users() {
    return this._users;
  }

  get words() {
    return this._words;
  }

  get usersWords() {
    return this._usersWords;
  }

  get usersAggregatedWords() {
    return this._usersAggregateWords;
  }

  get usersStatistics() {
    return this._usersStatistics;
  }

  get usersSettings() {
    return this._usersSettings;
  }

  get auth() {
    return this._auth;
  }
}

export const api: Api = new Api(
  new Words(),
  new Users(),
  new UsersWords(),
  new UsersAggregatedWords(),
  new UsersStatistics(),
  new UserSettings(),
  new Auth()
);
