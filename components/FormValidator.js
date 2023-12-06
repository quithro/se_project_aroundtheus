export default class FormValidator {

    constructor(config, formEl) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._formEl = formEl;

        this._inputEls = this._formEl.querySelectorAll(this._inputSelector);
        this._button = this._formEl.querySelector(this._submitButtonSelector);
    }

    _showInputError(inputEl) {
        const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.add(this._inputErrorClass);
        errorMessageEl.textContent = inputEl.validationMessage;
        errorMessageEl.classList.add(this._errorClass);
    }

    _hideInputError(inputEl) {
        const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.remove(this._inputErrorClass);
        errorMessageEl.textContent = "";
        errorMessageEl.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputEl) {
         if (!inputEl.validity.valid) {
            this._showInputError(inputEl);
        } else {
           this._hideInputError(inputEl);
        }
    }

    _hasInvalidInput = () => {
            return Array.from(this._inputEls).some((inputEl) => !inputEl.validity.valid);
        }

    _disableButton() {
        if (this._button) {
            this._button.classList.add(this._inactiveButtonClass);
            this._button.disabled = true;
    }
}

    _enableButton() {
        if (this._button) {
            this._button.classList.remove(this._inactiveButtonClass);
            this._button.disabled = false;
    }
}

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    }

    disableSubmitButton() {
        this._disableButton();
    }

    _setEventListeners() {
        this._inputEls.forEach((inputEl) => {
            inputEl.addEventListener('input', () => {
                this._checkInputValidity(inputEl);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._formEl.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
    }

    resetValidation() {
        this._inputEls.forEach((inputEl) => {
            this._checkInputValidity(inputEl);
        });
    }
}
