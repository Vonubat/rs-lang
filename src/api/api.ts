import Auth from './auth/auth';
import UsersAggregatedWords from './users-aggregated-words/users-aggregated-words';
import UserSettings from './users-settings/users-settings';
import UsersStatistics from './users-statistics/users-statistics';
import UsersWords from './users-words/users-words';
import Users from './users/users';
import Words from './words/words';

export class ApiClass {
  public words: Words;

  public users: Users;

  public usersWords: UsersWords;

  public usersAggregatedWords: UsersAggregatedWords;

  public usersStatistics: UsersStatistics;

  public usersSettings: UserSettings;

  public auth: Auth;

  constructor(
    words: Words,
    users: Users,
    usersWords: UsersWords,
    usersAggregatedWords: UsersAggregatedWords,
    usersStatistics: UsersStatistics,
    usersSettings: UserSettings,
    auth: Auth
  ) {
    this.words = words;
    this.users = users;
    this.usersWords = usersWords;
    this.usersAggregatedWords = usersAggregatedWords;
    this.usersStatistics = usersStatistics;
    this.usersSettings = usersSettings;
    this.usersSettings = usersSettings;
    this.auth = auth;
  }
}

export const api: ApiClass = new ApiClass(
  new Words(),
  new Users(),
  new UsersWords(),
  new UsersAggregatedWords(),
  new UsersStatistics(),
  new UserSettings(),
  new Auth()
);
