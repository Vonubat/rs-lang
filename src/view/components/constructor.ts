export default class HTMLConstructor {
  public div(className: string): HTMLDivElement {
    const element = document.createElement('div');
    element.classList.add(className);

    return element;
  }

  public span(className: string): HTMLSpanElement {
    const element = document.createElement('span');
    element.classList.add(className);

    return element;
  }

  public img(className: string, src: string, alt: string): HTMLImageElement {
    const element = document.createElement('img');
    element.src = src;
    element.alt = alt;
    element.classList.add(className);

    return element;
  }

  public button(className: string): HTMLButtonElement {
    const element = document.createElement('button');
    element.type = 'button';
    element.classList.add(className);

    return element;
  }

  /* public svg(): SVGElement {
        const element = document.create
    } */

  public audio(className: string, src: string): HTMLAudioElement {
    const element = document.createElement('audio');
    element.src = src;
    element.classList.add(className);

    return element;
  }

  public a(className: string, href: string): HTMLAnchorElement {
    const element = document.createElement('a');
    element.href = href;
    element.classList.add(className);

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