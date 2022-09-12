import HTMLConstructor from './constructor';

export default class NotFound extends HTMLConstructor {
  public notFound(): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const divWrapper: HTMLDivElement = this.div(['notfound-wrapper']);
    const svg: SVGSVGElement = this.svg('emoji-frown', ['notfound-svg']);
    const title: HTMLElement = this.createHtmlElement('h2', ['notfound-title']);
    title.innerText = '404';
    const subtitle: HTMLElement = this.createHtmlElement('h4', ['notfound-subtitle']);
    subtitle.innerText = 'Page not found';
    const text: HTMLElement = this.createHtmlElement('p', ['notfound-text']);
    text.innerText =
      'The page you are looking for does not exist. How you got here is a mystery. But you can click the button below to go back to the homepage.';
    const button: HTMLAnchorElement = this.a('#', ['btn', 'btn-info']);
    button.removeAttribute('target');
    button.innerText = "Let's start again";
    divWrapper.append(svg, title, subtitle, text, button);
    fragment.append(divWrapper);
    return fragment;
  }
}
