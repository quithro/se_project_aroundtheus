import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputs = this._popupElement.querySelectorAll(".modal__input");
    this._submitButton = this._popupElement.querySelector(
      ".modal__button"
    );
    this._submitButtonText = this._submitButton.textContent;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  _getInputValues() {
    const _inputs = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
    this._inputValues = {};
      _inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setLoading(submit, loadingText = "Saving...") {
    if (submit) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    
  }
  
}