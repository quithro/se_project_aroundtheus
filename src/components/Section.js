export default class Section {

    constructor({ items, renderer }, container) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach(this._renderer)
        }

    addItem(data) {
        this._container.prepend(element);
    }
}