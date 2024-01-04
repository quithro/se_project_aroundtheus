import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "../pages/index.css";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

import {
  initialCards,
  config,
  imageAddModal,
  cardListEl,
  profileEditButton,
  profileEditModal,
  imageAddButton,
  profileTitleInput,
  profileDescriptionInput,
} from "../utils/constants.js";

const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const sectionCard = createCard(cardData);
      section.addItem(sectionCard);
    },
  },
  ".cards__list",
);
section.renderItems();

const cardFormValidator = new FormValidator(config, imageAddModal);
cardFormValidator.enableValidation();

const profileEditForm = profileEditModal.querySelector(".modal__form");
const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();

const popupWithImage = new PopupWithImage("#image-preview-modal");
popupWithImage.setEventListeners();

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
);
profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm(
  "#add-image-modal",
  handleAddImageSubmit,
);
addCardPopup.setEventListeners();

const userInfo = new UserInfo(".profile__title", ".profile__description");

document.querySelector(".profile__add-button").addEventListener("click", () => {
  cardFormValidator.toggleButtonState();
  addCardPopup.open();
});

/* ------------------------------------------------------------------- */
function createCard(cardData) {
  return new Card(cardData, "#card-template", () => {
    popupWithImage.open(cardData.link, cardData.name);
  }).getView();
}

function handleProfileEditSubmit(formData) {
  userInfo.setUserInfo(formData.title, formData.description);
  profileEditPopup.close();
}

function handleAddImageSubmit(formData) {
  const card = createCard({ name: formData.name, link: formData });
  section.addItem(card);
  addCardPopup.close();
}

profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  profileEditPopup.open();
});


