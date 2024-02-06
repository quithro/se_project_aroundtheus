export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderItems() {
    this._items.forEach(this._renderer);
  }

  addItem(cardEl) {
    this._container.prepend(cardEl);
  }
}
