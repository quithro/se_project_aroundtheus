export default class Card {
    constructor({ name, link }, cardSelector, handleImageClick) {
      this._name = name;
      this._link = link;
      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
    }
  
    _setEventListeners() {
      this._cardElement
        .querySelector(".card__trash-button")
        .addEventListener("click", () => {
          this._handleTrashCard();
        });
  
      this._cardElement
        .querySelector(".card__like-button")
        .addEventListener("click", () => {
          this._handleLikeButton();
        });
  
      this._cardElement
        .querySelector(".card__image")
        .addEventListener("click", () => {
          this._handleImageClick({ name: this._name, link: this._link });
        });
    }
  
    _handleLikeButton() {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.toggle("card__like-button_active");
    }
  
    _handleTrashCard() {
      this._cardElement.remove();
      this._cardElement = null;
    }
  
    getView() {
      const cardData = { link: this._link, name: this._name };
  
      this._cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector(".card")
        .cloneNode(true);
  
      const cardImageEl = this._cardElement.querySelector(".card__image");
      cardImageEl.src = this._link;
      cardImageEl.alt = this._name;
  
      const cardTitleEl = this._cardElement.querySelector(".card__title");
      cardTitleEl.textContent = cardData._name;
  
      this._setEventListeners();
  
      return this._cardElement;
    }
  }