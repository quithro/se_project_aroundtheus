export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._items = items;
    this._containerSelector = document.querySelector(`${containerSelector}`);
  }
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(data) {
    this._containerSelector.prepend(data);
  }
}
  