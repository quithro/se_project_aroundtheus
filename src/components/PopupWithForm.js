import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popupElement.querySelectorAll(".modal__input");
    this._submitButton = this._popupElement.querySelector(
      ".modal__submit-button"
    );
    this._submitButtonText = this._submitButton.textContent;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const _inputs = Array.from(
      this.popupForm.querySelectorAll(".modal__input")
    );
    this._inputValues = {};
      _inputs.forEach((input) => {
      this._inputs[input.name] = input.value;
    });
    return inputValues;
  }

  setLoading(submit, loadingText = "Saving...") {
    if (submit) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  /* getForm() {
    return this._popupForm;
  }*/

}