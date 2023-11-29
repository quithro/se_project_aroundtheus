export default class FormValidator {

    constructor(options, formEl) {
        this._formEl = formEl;
        this._inputSelector = options.inputSelector;
        this._submitButtonSelector = options.submitButtonSelector;
        this._inactiveButtonClass = options.inactiveButtonClass;
        this._inputErrorClass = options.inputErrorClass;
        this._errorClass = options.errorClass;

        this.inputEls = this._formEl.querySelectorAll(this._inputSelector);
        this._buttonElement = this._formEl.querySelector(this._submitButtonSelector);
    }

    _showInputError(inputElement, errorMessageEl) {
        const ErrorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
        inputEl.classList.add(this._inputErrorClass);
        ErrorMessageEl.textContent = inputEl.validationMessage;
        ErrorMessageEl.classList.add(this._errorClass);
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    }

    _hadInvalidInput() {
        return !this._inputList.every((inputEl) => inputEl.validity.valid);
    }

    _checkInputValidity() {
        if (!inputEl.validity.valid) {
            this._showInputError(formEl, inputEl, options);
        } else {
            this._hideInputError(formEl, inputEl, options);
        }
    }

    _setEventListeners() {
        this._toggleButtonState(inputEls, submitButton, options);
        this._inputEls.forEach(inputEl => {
            inputEl.addEventListener('input', (e) => {
                this._checkInputValidity(formEl, inputEl, options);
                this._toggleButtonState(inputEls, submitButton, options);
            });
        });
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
