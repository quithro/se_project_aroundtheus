export default class Card {
    constructor(initialCards, cardSelector, handleImageClick) {
        this._name = initialCards.name;
        this._link = initialCards.link;
        this._cardSelector = cardSelector;
        this._cardImageEl = initialCards.imagePreview;
        this._cardElement = this._getTemplate();
    } 

    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardSelector);
        const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._trashButton.addEventListener('click', () => {
                this._handleTrashCard();
            });

        this._likeButton.addEventListener("click", () => {
            this._handleLikeIcon();
        });


        this._cardImageEl.addEventListener("click", () => {
            this._handleImageClick(this.name, this._link);
        }
        )
    }

    _handleTrashCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }


    getView() {
        this._cardImageEl = this._cardElement.querySelector('.card__image');
        this._cardTitleEl = this._cardElement.querySelector('.card__title');
        this._likeButton = this._cardElement.querySelector(".card__like-button");
        this._trashButton = this._cardElement.querySelector(".card__trash-button");

        this._cardImageEl.src = this._link;
        this._cardElement.alt = this._name;
        this._cardTitleEl.textContent = this._name;
        
        this._setEventListeners();
    }
}