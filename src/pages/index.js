import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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
  profileAvatarEditButton,
} from "../utils/constants.js";

/* ------- Constants ------- */

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "54f5d6dd-9ada-4439-859d-f491b4ee05fc",
    "Content-Type": "application/json",
  }
});

/* -------- Form Validation ------- */

const profileEditForm = document.forms["profile-edit-form"];
const changeProfileAvatarForm = document.forms["avatar-form"];
const addCardForm = document.forms["add-card-form"];

/* ------ Promise ------- */

let cardSection;

  Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo({ name: userData.name, about: userData.about });
    userInfo.setAvatar(userData.avatar);
    cardSection = new Section(
      {
        items: initialCards,
        renderer: renderCard,
      },
      ".cards__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

/* ------- Validator Constants ----- */

const cardFormValidator = new FormValidator(config, addCardForm);
const editFormValidator = new FormValidator(config, profileEditForm);
const changeProfileAvatarFormValidator = new FormValidator(config, 
  changeProfileAvatarForm
  );
const changeProfileAvatarPopup = new PopupWithForm(
  '#avatar-change-modal',
  handleChangeProfileAvatarFormSubmit
);
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
);
const imagePopup = new PopupWithImage("#image-preview-modal");
const addCardPopup = new PopupWithForm(
  "#add-image-modal",
  handleAddImageSubmit,
);
const cardDeletePopup = new PopupWithConfirmation('#delete-card-modal');

/*--------- EnableValidation ---- */

cardFormValidator.enableValidation();
editFormValidator.enableValidation();
changeProfileAvatarFormValidator.enableValidation();


/* ------------------- Functions ------------------- */

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", {
    handleImageClick: () => imagePopup.open(cardData.name, cardData.link),
    handleTrashCard,
    handleCardLike: handleCardLike,
  });
  return card.getView();
}

function renderCard(cardData) {
  const cardEl = createCard(cardData);
  cardSection.addItem(cardEl);
}

function handleTrashCard(cardId) {
  cardDeletePopup.open();
  cardDeletePopup.setSubmitAction(() => {
    cardDeletePopup.setLoading(true, "Deleting...");
    api
      .deleteCard(cardId._id)
      .then(() => {
        cardDeletePopup.close();
        cardId.removeCard();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        cardDeletePopup.setLoading(false, "Yes");
      });
  });
} 

function handleChangeProfileAvatarFormSubmit(link) { 
  changeProfileAvatarPopup.setLoading(true, "Saving...");
  api
    .updateAvatar(link)
    .then((data) => {
     userInfo.setAvatar(data.avatar);
      changeProfileAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => changeProfileAvatarPopup.setLoading(false, "Save"));
}

function handleProfileEditSubmit(data) {
  profileEditPopup.setLoading(true, "Saving...");
  api
  .profileUpdate(data)
  .then((userData) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });
    profileEditPopup.close();
  })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => profileEditPopup.setLoading(false, "Save"));
} 

function handleAddImageSubmit(card) {
  addCardPopup.setLoading(true, "Saving...");
  api
  .addCard(card)
  .then((res) => {
    renderCard(res);
    addCardPopup.close();
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => addCardPopup.setLoading(false, "Create"));
} 

function handleCardLike(cardId) {
  if (!cardId.isLiked) {
    api
    .likeCard(cardId.getId())
    .then((res) => {
      cardId.updateLikeStatus(res.isLiked);
    })
    .catch((err) => {
      console.error(err);
    });
  } else {
    api
    .dislikeCard(cardId.getId())
    .then((res) => {
      cardId.updateLikeStatus(res.isLiked);
    })
    .catch((err) => {
      console.error(err);
    });
  }
}

/* -------- Event Listeners ------ */

profileEditButton.addEventListener("click", () => {
  const profileUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = profileUserInfo.name;
  profileDescriptionInput.value = profileUserInfo.description;
  editFormValidator.toggleButtonState();
  profileEditPopup.open();
});

profileAvatarEditButton.addEventListener("click", () => {
  changeProfileAvatarFormValidator.toggleButtonState();
  changeProfileAvatarPopup.open();
});

imageAddButton.addEventListener("click", () => {
  cardFormValidator.toggleButtonState();
  addCardPopup.open();
});

/* -------- setEventListeners ------ */

imagePopup.setEventListeners();
changeProfileAvatarPopup.setEventListeners();
profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
cardDeletePopup.setEventListeners();