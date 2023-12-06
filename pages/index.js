import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"

const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
    },
];


/*----------------------------- Elements -------------------------------------*/
const config = {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error",
};

const profileEditModal = document.querySelector("#profile-edit-modal");
const addImageModal = document.querySelector('#add-image-modal');
const profileEditButton = document.querySelector("#profile-edit-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileEditForm = document.forms["profile-edit-form"];
const cardAddForm = document.forms["add-card-form"]


const cardListEl = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;

const imageAddButton = document.querySelector('#profile__add-button');
const imageAddModal = document.querySelector('#add-image-modal');
const imageAddCardForm = imageAddModal.querySelector(".modal__form");
const imageAddCloseButton = imageAddModal.querySelector(".modal__close");

const editFormValidator = new FormValidator(config, profileEditForm);
const cardFormValidator = new FormValidator(config, cardAddForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

const cardTitleInput = cardAddForm.querySelector('#add-image-title-input');
const cardUrlInput = cardAddForm.querySelector('#add-image-url-input');

const imagePreviewModal = document.querySelector("#image-preview-modal");
const imagePreview = imagePreviewModal.querySelector(".modal__preview-image");
const imagePreviewCaption = imagePreviewModal.querySelector(".modal__preview-text");
const imagePreviewClose = imagePreviewModal.querySelector('#image-preview-closed');

const modals = document.querySelectorAll(".modal");

/*-------------------------------- Functions -----------------------------------*/
function openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", handleEsc);
}

function closeModal(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleEsc);
}

function handleImageClick( {name, link} ) {
    imagePreview.src = link;
    imagePreview.alt = name;
    imagePreviewCaption.textContent = name;
    openModal(imagePreviewModal);
}

function handleEsc(evt) {
    if(evt.key === "Escape") {
        const modal = document.querySelector(".modal_opened");
        closeModal(modal);
    }
}

function handleProfileEditSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    editFormValidator.disableSubmitButton();
    closeModal(profileEditModal);
}

function handleAddImageSubmit(evt) {
    evt.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCard( {name, link} , cardListEl);
    cardFormValidator.disableSubmitButton();
    evt.target.reset();

    closeModal(imageAddModal);
}

function createCard (cardData, cardSelector, handleImageClick) {
    const cardEl = new Card(cardData, cardSelector, handleImageClick);
    return cardEl.getView();
}

function renderCard(cardData, wrapper) {
    const card = createCard(cardData, "#card-template", handleImageClick);
    wrapper.prepend(card);
}

/*--------------------------------- Event Listeners --------------------------------*/
profileEditButton.addEventListener("click", () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent.trim();
    editFormValidator.resetValidation();
    editFormValidator.disableSubmitButton();
    openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit); 

imageAddButton.addEventListener("click", () => {
    cardFormValidator.disableSubmitButton();
    openModal(addImageModal);
});

cardAddForm.addEventListener('submit', handleAddImageSubmit);

modals.forEach((modal => {
    modal.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("modal_opened")) {
            closeModal(modal);
        }
        if (evt.target.classList.contains("modal__close")) {
            closeModal(modal);
        }
    });
}));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));