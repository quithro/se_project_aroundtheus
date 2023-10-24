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

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const addImageModal = document.querySelector('#add-image-modal');

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addImageForm = addImageModal.querySelector('.modal__form');

const cardListEl = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;

const imageAddButton = document.querySelector('#profile__add-button');
const imageAddModal = document.querySelector('#add-image-modal');
const imageAddCloseButton = imageAddModal.querySelector(".modal__close");


const cardTitleInput = addImageForm.querySelector('#add-image-title-input');
const cardUrlInput = addImageForm.querySelector('#add-image-url-input');

const imagePreviewModal = document.querySelector("#image-preview-modal");
const imagePreview = imagePreviewModal.querySelector(".modal__preview-image");
const imagePreviewCaption = imagePreviewModal.querySelector(".modal__preview-text");
const imagePreviewClose = imagePreviewModal.querySelector('#image-preview-closed');


/*-------------------------------- Functions -----------------------------------*/
function openModal(modal) {
    modal.classList.add("modal_opened");
};

function closeModal(modal) {
    modal.classList.remove("modal_opened");
};

function closePopup() {
    profileEditModal.classList.remove("modal_opened");
};

function imageOpenPopup() {
    imagePreviewModal.classList.toggle("modal_opened");
};

function imageClosePopup() {
   imagePreviewModal.classList.remove("modal_opened");
};

function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector('.card__image');
    const cardTitleEl = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector(".card__like-button");
    const trashButton = cardElement.querySelector(".card__trash-button");

    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("card__like-button_active");
    });

    trashButton.addEventListener("click", () => {
        trashButton.classList.toggle("card__trash-button_active");
        cardElement.remove();
    });

    cardImageEl.addEventListener("click", () => {
        imagePreview.src = cardData.link;
        imagePreview.alt = cardData.name;
        imagePreviewCaption.textContent = cardData.name;
        imageOpenPopup(imagePreviewModal);
    }); 
   
    cardImageEl.alt = cardData.name;
    cardImageEl.src = cardData.link; 
    cardTitleEl.textContent = cardData.name;
    return cardElement;
};

function renderCard(cardData, card) {
    const cardElement = getCardElement(cardData);
    cardListEl.prepend(cardElement);
};

/*--------------------------------- Event Handlers --------------------------------*/

function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(profileEditModal);
};

function handleAddImageSubmit(e) {
    e.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCard({name, link}, cardListEl);
    imageClosePopup(imageAddModal);
};

/*--------------------------------- Event Listeners --------------------------------*/
profileEditCloseButton.addEventListener("click", closePopup);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addImageForm.addEventListener('submit', handleAddImageSubmit);

profileEditButton.addEventListener("click", () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    profileEditModal.classList.add("modal_opened");
});

imageAddButton.addEventListener("click", () => {
    imageAddModal.classList.add("modal_opened");
    imagePreview.src = cardData.link;
    imagePreview.alt = cardData.name;
    imagePreviewCaption.textContent = name;
});

imageAddCloseButton.addEventListener("click", () => {
    imageAddModal.classList.remove("modal_opened");
});

imagePreviewClose.addEventListener("click", () => {
    imageClosePopup();
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
