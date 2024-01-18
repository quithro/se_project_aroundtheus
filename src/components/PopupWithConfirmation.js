import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector(".modal__form");
        this._submitButton = this._popupForm.querySelector(".modal__button");
        this._submitButtonText = this._submitButton.textContent;
    }

    setSubmitAction(action) {
        this._handleFormSubmit = action;
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
            this._handleFormSubmit();
        });
        super.setEventListeners();
    }
}