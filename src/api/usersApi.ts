import Constants from '../constants';
import { User } from '../types/types';
import HttpClient from './http-client';

export default class Users {
  public static createUser(user: User) {
    const url = Constants.BASE_URL ? new URL(Constants.BASE_URL) : '';
    HttpClient.post(url, JSON.stringify(user));
  }
}
