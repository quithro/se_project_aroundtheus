import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super({ popupSelector });
        this._popupForm.querySelector('#card-add-form');
        this._handleFormSubmit = handleFormSubmit;
        this._closeButton = this._popupForm.querySelector(".modal__close");
    }

    close() {
        this._popupForm.reset()
        super._close();
        this._popupForm.removeEventListener("submit", this._handleFormSubmit);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this._closeButton();
    }

    _getInputValues() {
        const inputs = this._popupForm.querySelectorAll("modal__input");
        const inputValues = {};
        inputs.forEach((input) => 
        (inputValues[input.name] = input.value));
        return inputValues;
    }

    setEventListeners() {
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
        super.setEventListeners();
    }

    getForm() {
        return this._popupForm
    }

    getCloseButton() {
        return this._closeButton;
    }

}
