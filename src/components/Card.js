export default class Card {
    constructor({ name, link, _id, isLiked, likeCount }, 
      cardSelector, 
      { handleImageClick, handleTrashCard, handleCardLike } 
    ) {
      this._name = name;
      this._link = link;
      this._id = _id;
      this.isLiked = isLiked;
      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
      this._handleTrashCard = handleTrashCard;
      this._handleCardLike = handleCardLike;
      this._cardElement = this._getTemplate();
    }
  
    _getTemplate() {
      const cardTemplate = document.querySelector(this._cardSelector);
      const cardElement = cardTemplate.content
      .querySelector(".card")
      .cloneNode(true);
    }

    _setEventListeners() {
      /*this._cardElement
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
        }); */

        this._trashButton.addEventListener("click", () => {
          this._handleTrashCard(this);
        });

        this._likeButton.addEventListener("click", () => {
          this._handleCardLike(this);
        });

        this._cardImage.addEventListener("click", () => {
          this._handleImageClick(this._name, this._link);
        });
    }
  
   updateLikeStatus(isLiked) {
      this.isLiked = isLiked;
      this._renderLikes();
    } 

   _renderLikes() {
      if (this.isLiked) {
        this._handleLikeButton.classList.add("card__like-button_active");
      } else {
        this._handleLikeButton.classList.remove("card__like-button_active");
      }
    } 

   removeCard() {
      this._cardElement.remove();
      this._cardElement = null;
    } 

   getId() {
      return this._id;
    }

    /*_handleLikeButton() {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.toggle("card__like-button_active");
    }
  
    _handleTrashCard() {
      this._cardElement.remove();
      this._cardElement = null;
    } */

    getView() {
      this._likeButton = this._cardElement.querySelector(".card__like-button");
      this._trashButton = this._cardElement.querySelector(
        ".card__delete-button"
      );
      this._cardImage = this._cardElement.querySelector(".card__image");
      this._cardTitle = this._cardElement.querySelector(".card__title");
      this._cardImage.src = this._link;
      this._cardTitle.textContent = this._name;
      this._cardImage.alt = `photo of ${this._name}`;

      this._setEventListeners();
      this._renderLikes();

      return this._cardElement;
    }
    
  }