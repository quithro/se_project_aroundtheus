export default class FormValidator {

    constructor(config, formEl) {
        this._formEl = formEl;
        this._formSelector = config.formSelector
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._inputEls = this._formEl.querySelectorAll(this._inputSelector);
        this._buttonElement = this._formEl.querySelector(this._submitButtonSelector);
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

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    }

    _disableButton() {
        if(this._submitButton) {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }

    _enableButton() {
        if (this._submitButton) {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }

    _hasInvalidInput = () => {
        return !this._inputList.every((inputEl) => inputEl.validity.valid);
    }

    _checkInputValidity() {
        if (!inputEl.validity.valid) {
            return this._showInputError(inputEl);
        } else {
            return this._hideInputError(inputEl);
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

    disableSubmitButton() {
        this._disableButton();
    }

    enableValidation() {
        this._formEls.forEach((formEl) => {
        this._formEl.addEventListener('submit', (e) => {
            e.preventDefault();
        });
        setEventListeners(formEl, options);
    });
    }
}
