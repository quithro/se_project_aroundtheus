export default class Popup {
    constructor({ popupSelector }) {
      this._popupElement = document.querySelector(popupSelector);
      this._closeButton = this._popupElement.querySelector(".modal__close");
    }
  
    open() {
      // opens popup
      this._popupElement.classList.add("modal_opened");
      document.addEventListener("keydown", this._handleEscClose);
    }
  
    close() {
      // closes popup
      this._popupElement.classList.remove("modal_opened");
      document.removeEventListener("keydown", this._handleEscClose);
    }
  
    _handleEscClose() {
      // listens for esc button
      if (e.key === "Escape") {
        this._close();
      }
    }
  
    setEventListeners() {
      // sets event listeners
      this._popupElement.addEventListener("click", (evt) => {
        if (
          evt.target === this._popupElement ||
          evt.target.classList.contains("modal__close")
        ) {
          this.close();
        }
        this._closeButton.addEventListener("click", () => {
        });
      });
    }
  }