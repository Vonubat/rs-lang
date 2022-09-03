import d3 from 'd3';
import Constants from '../../constants';
import HTMLConstructor from '../components/constructor';
import { services } from '../../services/services';
import { DailyStatistics, Optional } from '../../types/types';

export default class Statistics {
  private mainId: string = Constants.MAIN_ID;

  private htmlConstructor: HTMLConstructor = new HTMLConstructor();

  private statistics: HTMLDivElement;

  private words: HTMLDivElement;

  private statsPerDay: HTMLDivElement;

  private statisticsData: Optional;

  constructor() {
    this.statistics = this.htmlConstructor.div(['statistics']);
    this.words = this.htmlConstructor.div(['statistics__words']);
    this.words.id = 'statistics-words-id';
    this.statsPerDay = this.htmlConstructor.div(['statistics__stats-per-day']);
    this.statistics.append(this.words, this.statsPerDay);
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
      const { learnedWords } = statistics;
      const learnedWordsPerDay: DailyStatistics | undefined = statistics?.optional?.learnedWordsPerDay;
      if (learnedWordsPerDay) {
        const svg = d3.select('#statistics-words-id').append('svg').attr('width', 800).attr('height', 400);
        const lineFunc = d3
          .line()
          .x(function (d) {
            return d.x;
          })
          .y(function (d) {
            return d.y;
          });
      }
    }
  }
}
