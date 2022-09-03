import { api, Api } from '../../api/api';
import Statistics from '../../view/statistics/statistics-view';
import Credentials from '../auth/credentials';

export default class StatisticsService {
  private api: Api = api;

  private statistics: Statistics;

  setView(statistics: Statistics) {
    this.statistics = statistics;
  }

  async getStatisticsData() {
    const userId = Credentials.getUserId();
    if (userId) {
      const data = await this.api.usersStatistics.getStatistics(userId);
      return data;
    }
    return null;
  }
}
