import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm.querySelector("#card-add-form");
    this._handleFormSubmit = handleFormSubmit;
    this._closeButton = this._popupForm.querySelector(".modal__close");
  }

  close() {
    this._popupForm.reset();
    super._close();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  };

  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll("modal__input");
    const inputValues = {};
    inputs.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}