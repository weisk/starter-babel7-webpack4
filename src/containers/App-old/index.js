import * as dom from 'lib/DOM';
import './index.scss';

export default class App {
  constructor() {
  }

  init() {
    const first = dom.create('div', { className: 'first' });
    dom.appendChild(first);


    first.appendChild(dom.create('h1', { textContent: 'Title 1'}));
    first.appendChild(dom.create('h2', { textContent: 'Title 2'}));
    first.appendChild(dom.create('h3', { textContent: 'Title 3'}));
    first.appendChild(dom.create('h4', { textContent: 'Title 4'}));
  }
}
