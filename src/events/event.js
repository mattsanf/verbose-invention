export class RegisteredListeners {
  _listeners = {};

  add(eventName, callback) {
    document.addEventListener(eventName, callback, false);

    if (!(eventName in this._listeners)) {
      this._listeners[eventName] = [];
    }
    this._listeners[eventName].push(callback);
  }

  removeAll() {
    Object.keys(this._listeners).forEach((eventName) => {
      this._listeners[eventName].forEach((callback) =>
        document.removeEventListener(eventName, callback, false)
      );
    });
    this._listeners = {};
  }
}

export const registeredListeners = new RegisteredListeners();

export default class BaseEvent {
  /**
   * @param {string} name
   */
  constructor(name) {
    // Using namespaced internal name as a protection mechanism
    const PREFIX = 'rebilly-instruments-';
    this.internalName = PREFIX+ name;
  }

  addEventListener(callback) {
    const innerCallback = ({ detail }) => callback(detail);
    registeredListeners.add(this.internalName, innerCallback);
  }

  dispatch(detail) {
    const event = new CustomEvent(this.internalName, {
      bubbles: true,
      detail
    });
    document.dispatchEvent(event);
  }
}
