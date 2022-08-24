export default class HTMLConstructor {
  public div(classList?: string[]): HTMLDivElement {
    const element = document.createElement('div');
    if (classList) {
      classList.forEach((elem) => {
        element.classList.add(elem);
      });
    }

    return element;
  }

  public span(classList?: string[]): HTMLSpanElement {
    const element = document.createElement('span');
    if (classList) {
      classList.forEach((elem) => {
        element.classList.add(elem);
      });
    }

    return element;
  }

  public img(src: string, alt: string, classList?: string[]): HTMLImageElement {
    const element = document.createElement('img');
    element.src = src;
    element.alt = alt;
    if (classList) {
      classList.forEach((elem) => {
        element.classList.add(elem);
      });
    }
    return element;
  }

  public button(classList?: string[]): HTMLButtonElement {
    const element = document.createElement('button');
    element.type = 'button';
    if (classList) {
      classList.forEach((elem) => {
        element.classList.add(elem);
      });
    }

    return element;
  }

  public svg(type: string, classList?: string[]) {
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const XLINK_NS = 'http://www.w3.org/1999/xlink';
    const boxWidth = 32;
    const boxHeight = 32;
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttributeNS(null, 'width', `${boxWidth}`);
    svg.setAttributeNS(null, 'height', `${boxHeight}`);
    const use = document.createElementNS(SVG_NS, 'use');
    use.setAttributeNS(XLINK_NS, 'xlink:href', `./assets/bootstrap-icons.svg#${type}`);
    svg.appendChild(use);
    if (classList) {
      classList.forEach((elem) => {
        svg.classList.add(elem);
      });
    }
    return svg;
  }

  public audio(src: string, classList?: string[]): HTMLAudioElement {
    const element = document.createElement('audio');
    element.src = src;
    if (classList) {
      classList.forEach((elem) => {
        element.classList.add(elem);
      });
    }

    return element;
  }

  public a(href: string, classList?: string[]): HTMLAnchorElement {
    const element = document.createElement('a');
    element.setAttribute('target', '_blanc');
    element.href = href;
    if (classList) {
      classList.forEach((elem) => {
        element.classList.add(elem);
      });
    }

    return element;
  }

  public basic(type: string, id?: string, classList?: string[], atributes?: [string, string][]) {
    const element = document.createElement(type);
    if (classList) {
      classList.forEach((elem) => {
        element.classList.add(elem);
      });
    }
    if (id) {
      element.id = id;
    }
    if (atributes) {
      atributes.forEach((elem) => {
        element.setAttribute(elem[0], elem[1]);
      });
    }

    return element;
  }
}
