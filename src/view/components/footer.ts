import Constants from '../../constants';
import HTMLConstructor from './constructor';

export default class Footer {
  private htmlConstructor: HTMLConstructor;

  private footer: HTMLElement;

  private team: HTMLDivElement;

  constructor() {
    this.htmlConstructor = new HTMLConstructor();
    this.footer = this.htmlConstructor.createHtmlElement('footer', ['footer', 'text-bg-dark']);
    const link = this.htmlConstructor.a('https://rs.school/js/');
    const logo = this.htmlConstructor.svg('logo-rs', ['footer__logo']);
    link.append(logo);
    this.team = this.htmlConstructor.div(['footer__team']);
    this.fillTeam();
    const copyright = this.htmlConstructor.createHtmlElement('span', ['copyright'], '', [], '© 2022');
    this.footer.append(link, this.team, copyright);
  }

  public fillTeam(): void {
    Constants.TEAM.forEach((member) => {
      const a = this.htmlConstructor.a(`${member.github}`, ['footer__team_member'], `${member.name}`);
      this.team.appendChild(a);
    });
  }

  public view(): HTMLElement {
    return this.footer;
  }

  public hideFooter() {
    document.getElementsByClassName('footer')[0].classList.add('footer_hidden');
  }

  public showFooter() {
    document.getElementsByClassName('footer')[0].classList.remove('footer_hidden');
  }
}
