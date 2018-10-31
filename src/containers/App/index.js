import $ from 'jquery';
import './index.scss';

const root = $('#root');

export default class App {
  constructor() {
  }

  init() {
    let app = $('<div></div>').attr('id','app');

    let pre = $('<pre><pre>');
    pre.text('Hi how are you');

    app.append(pre);

    root.append(app);
  }
}
