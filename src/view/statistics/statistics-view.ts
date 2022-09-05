import d3, { range } from 'd3';
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

  async drawDiagrams() {
    const statistics = await services.statisticsService.getStatisticsData();
    const width = 800;
    const height = 400;
    if (statistics) {
      // const { learnedWords } = statistics;
      const learnedWordsPerDay: Array<DailyStatistics> | undefined = statistics?.optional?.learnedWordsPerDay;
      if (learnedWordsPerDay) {
        const svg = d3.select('#statistics-words-id').append('svg').attr('width', width).attr('height', height);
        const x = d3.scaleTyme();
        DOMImplementation(
          d3.extent(learnedWordsPerDay, function (d) {
            return d.date;
          })
        );
        range([0, width]);
        svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(x));
        const y = d3
          .scaleLinear()
          .domain([
            0,
            d3.max(data, function (d) {
              return +d.learnedWords;
            }),
          ])
          .range([height, 0]);

        svg.append('g').call(d3.axisLeft(y));

        svg
          .append('path')
          .datum(learnedWordsPerDay)
          .attr('stroke', 'black')
          .attr('fill', 'none')
          .attr(
            'd',
            d3
              .line()
              .x(function (d) {
                return x(d.date);
              })
              .y(function (d) {
                return y(d.learnedWords);
              })
          );
      }
    }
  }
}
