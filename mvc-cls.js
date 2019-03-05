// -----------------------------------------------------------------------------
// model

class Model {
  constructor(data) {
    if (typeof data != "object") return;
    if (!data) data = {};
    this.data = data;
  }

  set add(data) {
    const props = Object.getOwnPropertyNames(data);
    const vals = Object.values(data);
    for (let item in props) this.data[props[item]] = vals[item];
  }
  set update(data) {
    for (let item in props(data)) {
    }
  }
  get get() {
    return this.data;
  }
}

// -----------------------------------------------------------------------------
// view

class View {
  constructor() {
    this.elements = [];
  }

  DOM(selector) {
    try {
      if (document) {
        const hasHash = selector.contains("#");
        const hasDot = selector.contains(".");
        let element;
        if (hasHash || hasDot) {
          element = hasDot
            ? document.querySelectorAll(selector)
            : document.querySelector(selector);
        } else {
          element = document.getElementsByClassName(element);
          if (!element) element = document.getElementById(element);
          if (!element) element = document.createElement(element);
        }
      }
    } catch (e) {
      element = {
        innerHTML: undefined,
        className: undefined,
        id: undefined,
        appendChild: element => {
          this.elements.push({ id: element.id, element: element });
        },
        createTextNode: txt => {}
      };
    } finally {
      return element;
    }
  }

  get(id) {
    for (let item of this.elements) {
      if (item.id === id) {
        return item.element;
      }
    }
  }

  element(element) {
    if (get(element)) return get(element);
    if (typeof element === "string") element = DOM(element);
    if (!element["id"]) element["id"] = `el_${this.elements.length + 1}`;
    this.elements.push({ id: element.id, element: element });
    return element;
  }
  set(_element, content) {
    if (typeof content === "object") content = content.innerHTML;
    get(_element) ? (_element = get(_element)) : (_element = element(_element));
    _element.innerHTML = content;
  }
  txt(_element, txt) {
    get(_element) ? (_element = get(_element)) : (_element = element(_element));
    txt = document.createTextNode(txt);
    _element.appendChild(txt);
  }
  attr(element, attributes) {
    for (let attribute in Object.getOwnPropertyNames(attributes)) {
      element.setAttribute(
        Object.getOwnPropertyNames(attributes)[attribute],
        Object.values(attributes)[attribute]
      );
    }
    return element;
  }
  add(parent, _element, attrs, cont) {
    if (typeof parent === "string")
      get(parent) ? (parent = get(parent)) : (parent = element(parent));
    if (typeof _element === "string") elmt = element(_element);
    if (typeof attrs === "object") _element = attr(_element, attrs);
    if (typeof attrs === "string") cont = attrs;
    if (content) set(_element, cont);
    parent.appendChild(_element);
    return _element;
  }
}

// -----------------------------------------------------------------------------
// controller

class Controller {
  constructor(view, model) {
    this.actions = [];
    this.view = view;
    this.model = model;
  }
  receptor(event) {
    const component = event.target.id; // id of element added to controller acts as trigger to component to receptor
    for (let action of this.actions) {
      if (action.component === component) action.do();
    }
  }
  component(element, action) {
    this.actions.push({ component: element.id, do: action });
  }
  add(element, action, callback) {
    if (typeof element === "string") element = this.view.element(element);
    element.addEventListener(action, event => {
      event.preventDefault();
      receptor(event);
      callback(event);
    });
  }
}
