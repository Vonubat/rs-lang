export default class HTMLConstructor {
  public createHtmlElement(
    type: string,
    classList?: string[],
    id?: string,
    attributes?: [string, string][],
    innerHtml?: string
  ): HTMLElement {
    const element: HTMLElement = document.createElement(type);
    if (classList) {
      classList.forEach((elem: string): void => {
        element.classList.add(elem);
      });
    }
    if (id) {
      element.id = id;
    }
    if (attributes) {
      attributes.forEach((elem: [string, string]): void => {
        element.setAttribute(elem[0], elem[1]);
      });
    }
    if (innerHtml) {
      element.innerHTML = innerHtml;
    }

    return element;
  }

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
      classList.forEach((elem: string): void => {
        element.classList.add(elem);
      });
    }
    return element;
  }

  public button(classList?: string[], type?: string): HTMLButtonElement {
    const element = document.createElement('button');
    if (type) element.type = type;
    if (classList) {
      classList.forEach((elem) => {
        element.classList.add(elem);
      });
    }

    return element;
  }

  public svg(type: string, classList?: string[], id?: string, attributes?: [string, string][]): SVGSVGElement {
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const XLINK_NS = 'http://www.w3.org/1999/xlink';
    const boxWidth = 32;
    const boxHeight = 32;
    const svg: SVGSVGElement = document.createElementNS(SVG_NS, 'svg');
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
    if (id) {
      svg.id = id;
    }
    if (attributes) {
      attributes.forEach((elem: [string, string]): void => {
        svg.setAttribute(elem[0], elem[1]);
      });
    }
    return svg;
  }

  changeSvg(elem: SVGUseElement, type: string) {
    elem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `./assets/bootstrap-icons.svg#${type}`);
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

  public a(href: string, classList?: string[], innerText?: string): HTMLAnchorElement {
    const element = document.createElement('a');
    element.setAttribute('target', '_blank');
    element.href = href;
    if (classList) {
      classList.forEach((elem) => {
        element.classList.add(elem);
      });
    }
    element.innerText = innerText ?? '';

    return element;
  }
}
