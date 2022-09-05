import { api, Api } from '../../api/api';
import Statistic from '../../view/statistics/statistics-view';
import Credentials from '../auth/credentials';

export default class StatisticsService {
  private api: Api = api;

  statistics: Statistic;

  constructor() {
    this.statistics = new Statistic();
  }

  setView() {
    this.statistics.drawPage();
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
