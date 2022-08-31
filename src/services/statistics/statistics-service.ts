import { api, Api } from '../../api/api';
import Statistics from '../../view/statistics/statistics-view';

export default class StatisticsService {
  private api: Api = api;

  private statistics: Statistics;

  constructor(statistics: Statistics) {
    this.statistics = statistics;
  }
}
