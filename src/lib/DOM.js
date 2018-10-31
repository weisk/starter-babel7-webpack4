const ALLOWED_KEYS = Object.keys(HTMLElement.prototype);
const INITIAL_HTML = '<div>Hello world</div>';
const INITIAL_MOUNT = '#root';
const EMPTY_EL = () => document.createElement('div');


function query(string) {
  return document.querySelector(string);
}

function queryAll(string) {
  return Array.from(document.querySelectorAll(string));
}

function insertHTML(el, html) {
  el.innerHTML = html;
  return el;
}

function getNodeOrSelector(el) {
  if (typeof el === 'string') {
    return query(el);
  } else if (el instanceof HTMLElement) {
    return el;
  } else {
    throw new Error('wrong element type');
  }
}

function appendChild(child = EMPTY_EL(), parent = INITIAL_MOUNT) {
  const childEl = getNodeOrSelector(child);
  const parentEl = getNodeOrSelector(parent);
  parentEl.appendChild(childEl);
  return childEl;
};


function create(tag, attributes = {}) {
  const el = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key in el) {
      el[key] = value;
    } else {
      throw new Error(`invalid attribute ${key} for element ${tag}`);
    }
  });

  return el;
}

export {
  query,
  queryAll,
  create,
  insertHTML,
  getNodeOrSelector,
  appendChild
};
