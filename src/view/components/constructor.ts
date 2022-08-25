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
}
