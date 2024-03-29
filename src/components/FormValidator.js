export default class FormValidator {
    constructor(config, formEl) {
      this._formEl = formEl;
      this._formSelector = config.formSelector;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
      this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
      this._submitButton = this._formEl.querySelector(
        this._submitButtonSelector
      );
    }
  
    _checkInputValidity(inputEl) {
      if (!inputEl.validity.valid) {
        return this._showInputError(inputEl);
      } else {
        this._hideInputError(inputEl);
      }
    };
  
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
  
    _setEventListeners() {
      this.toggleButtonState();
      this._inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", (e) => {
          this._checkInputValidity(inputEl);
          this.toggleButtonState();
        });
      });
    } 
  
    _hasInvalidInput(inputEl) {
      return !this._inputEls.every((inputEl) => inputEl.validity.valid);
    }
  
    toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
      } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
      }
    }

    enableValidation() {
      this._formEl.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
   };
  }
  