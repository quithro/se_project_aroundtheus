export default class Card {
    constructor({name, link}, cardSelector, cardImageEl) {
        this.name = name;
        this.link = link;
        this._cardSelector = cardSelector;
        this._cardImageEl = cardImageEl;
    } 

    _setEventListeners() {
        //".card__like-button"

        this._cardElement
        .querySelector(".card__like-button")
        .addEventListener('click', () => {
            this._handleLikeIcon();
        });

        //".card__trash-button"
        const deleteButton = this._cardElement.querySelector(
            ".card__trash-button"
            ).addEventListener('click', () => {
                this._handleTrashCard
            });
        
        this._cardImageEl.addEventListener("click", () => {
            (this.name, this._link)
            }); 

    }

    _handleTrashCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _handleLikeIcon() {
        this._cardElement
        .querySelector('card__like-button')
        .classList.toggle('.card__like-button_active');
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