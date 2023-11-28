export default class card {
    constructor({name, link}, cardSelector) {
        this.name = name;
        this.link = link;
        this._cardSelector = cardSelector;
    } 

    _setEventListeners() {
        //".card__like-button"

        this._cardElement.querySelector(".card__like-button").addEventListener('click', () => {

        });

        //".card__trash-button"
        const deleteButton = this._cardElement.querySelector(".card__trash-button");

    }

    getView() {
        this._cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector(".card")
        .cloneNode(true);

        // get the card view set event listeners and return the card

        this._setEventListeners();
    }
}