export const initialCards = [
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

export const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error",
};

export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector("#profile-description-input");
export const imageAddModal = document.querySelector('#add-image-modal');
export const imageAddButton = document.querySelector('#profile__add-button');
export const cardListEl = document.querySelector('.cards__list');

export const cardsWrap = document.querySelector(".cards__list");
export const cardTemplate = document.querySelector("#card-template").textContent.firstElementChild;

export const editProfileModal = document.querySelector("#profile-edit-modal");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
export const profileAvatarEditButton = document.querySelector(".profile__avatar-edit-button");
export const profileForm = document.forms["profile-form"];
export const profileNameInput = profileForm.querySelector("#profile-description-input");

export const addCardModal = document.querySelector("#add-card-modal");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const cardForm = document.forms["card-form"];
export const addCardTitleInput = cardForm.querySelector("#add-image-title-input");
export const addCardUrlInput = cardForm.querySelector("#add-image-url-input");

export const previewImageModal = document.querySelector("#preview-image-modal");
export const previewImage = previewImageModal.querySelector(".modal__preview-image");
export const previewImageCaption = previewImageModal.querySelector(".modal__preview-text");