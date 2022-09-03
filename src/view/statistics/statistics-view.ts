import d3 from 'd3';
import Constants from '../../constants';
import HTMLConstructor from '../components/constructor';
import { services } from '../../services/services';
import { DailyStatistics } from '../../types/types';

export default class Statistics {
  private mainId: string = Constants.MAIN_ID;

  private htmlConstructor: HTMLConstructor = new HTMLConstructor();

  private statistics: HTMLDivElement;

  private words: HTMLDivElement;

  private accuracy: HTMLDivElement;

  private statisticsData: any;

  constructor() {
    this.statistics = this.htmlConstructor.div(['statistics']);
    this.words = this.htmlConstructor.div(['statistics__words']);
    this.accuracy = this.htmlConstructor.div(['statistics__accuracy']);
    this.statistics.append(this.words, this.accuracy);
    services.statisticsService.setView(this);
  }

  async drawPage() {
    const main = document.getElementById(this.mainId);
    if (main) {
      main.innerHTML = '';
      main.append(this.statistics);
    }
  }

  async drawDiagramm() {
    const statistics = await services.statisticsService.getStatisticsData();
    if (statistics) {
      const learnedWords = statistics.learnedWords;
      const optional = statistics.optional;
      const { learnedWordsPerDay: Array<DailyStatistics> } = optional.learnedWordsPerDay;

    }
  }
}
