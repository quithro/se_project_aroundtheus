export default class Card {
    constructor({ name, link }, cardSelector, handleImageClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick
    } 

    _setEventListeners() {
            this._trashButton.addEventListener('click', () => {
                    this._handleTrashCard();
                });

            this._likeButton.addEventListener("click", () => {
                this._handleLikeButton();
            });

            this._cardImageEl.addEventListener("click", () => {
                this._handleImageClick({ name: this._name, link: this._link});
            });
        }

    _handleLikeButton() {
        this._likeButton.classList.toggle("card__like-button_active");
    }

    _handleTrashCard() {
            this._cardElement.remove();
            this._cardElement = null;
    }

    _handleImageClick = () => {
        this._handleImageClick({ name: this._name, link: this._link});
    }

    _getTemplate() {
        return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
    }

    getView() {
        this._cardElement = this._getTemplate();

        this._cardImageEl = this._cardElement.querySelector('.card__image');
        this._cardTitleEl = this._cardElement.querySelector('.card__title');
        this._likeButton = this._cardElement.querySelector(".card__like-button");
        this._trashButton = this._cardElement.querySelector(".card__trash-button");

        this._cardImageEl.src = this._link;
        this._cardImageEl.alt = this._name;
        this._cardTitleEl.textContent = this._name;
        
        this._setEventListeners();
        return this._cardElement;
    }
}