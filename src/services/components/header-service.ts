import { view } from '../../view/view';

export default class HeaderService {
  draw(): void {
    const body: HTMLElement = document.getElementById('body') as HTMLElement;
    const header: DocumentFragment = view.header.view();
    body.append(header);
  }
}
