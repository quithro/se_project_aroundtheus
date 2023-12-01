export default class FormValidator {

    constructor(config, formEl) {
        this._formEl = formEl; 
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
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
        errorMessageEl.textContent = '';
        errorMessageEl.classList.remove(this._errorClass);
    }

    _hasInvalidInput = () => {
        return Array.from(this._inputEls).some((inputEl) => !inputEl.validity.valid);
    }

    _disableButton() {
            this._button.classList.add(this._inactiveButtonClass);
            this._button.disabled = true;
    }

    _enableButton() {
            this._button.classList.remove(this._inactiveButtonClass);
            this._button.disabled = false;
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    }

    _checkInputValidity(inputEl) {
        if (!inputEl.validity.valid) {
            return this._showInputError(inputEl);
        } else {
            this._hideInputError(inputEl);
        }
    }

    _setEventListeners() {
        this._toggleButtonState();
        this._inputEls.forEach(inputEl => {
            inputEl.addEventListener('input', (e) => {
                this._checkInputValidity(inputEl);
                this._toggleButtonState();
            });
        });
    }

    resetValidation() {
        this._inputEls.forEach((inputEl) => {
            this._hideInputError(inputEl);
        });
        this._toggleButtonState();
    }

    enableValidation() {
        this._formEl.addEventListener('submit', (e) => {
            e.preventDefault();
        });
        this._setEventListeners();
    }
}
