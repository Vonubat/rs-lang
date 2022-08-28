import Constants from '../../constants';
import HTMLConstructor from '../components/constructor';

export default class Footer {
  private htmlConstructor: HTMLConstructor;

  private footer: HTMLElement;

  private team: HTMLDivElement;

  constructor() {
    this.htmlConstructor = new HTMLConstructor();
    this.footer = this.htmlConstructor.createHtmlElement('footer', ['footer', 'text-bg-dark']);
    const logo = this.htmlConstructor.img('./assets/img/logo-rs.svg', 'rs-logo', ['footer__logo']);
    this.team = this.htmlConstructor.div(['footer__team']);
    this.fillTeam();
    const copyright = this.htmlConstructor.createHtmlElement('p', ['copyright'], '', [], '© 2022');
    this.footer.append(logo, this.team, copyright);
  }

  fillTeam() {
    Constants.TEAM.forEach((member) => {
      const a = this.htmlConstructor.a(`${member.github}`, ['footer__team_member'], `${member.name}`);
      this.team.appendChild(a);
    });
  }

  view() {
    return this.footer;
  }
}
