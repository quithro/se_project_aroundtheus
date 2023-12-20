export default class Section {

    constructor({ items, renderer }, cardSelector) {
        this._items = items;
        this._renderer = renderer;
        this._cardSelector = document.querySelector(cardSelector);
    }

    renderItems() {
        this._items.forEach((data) => {
            this._renderer(data);
        });
}

    addItem(data) {
        this._cardSelector.prepend(element);
    }
}