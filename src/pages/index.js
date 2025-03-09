import "@/assets/app.css";
import { initialCards } from "@/components/cards";
import {
    createCard,
    likeCard,
    removeCard,
    renderCard,
} from "@/components/card";
import { closeModal, openModal } from "@/components/modal";
import { checkImageLink } from "@/components/utils";

const cardForm = document.forms["new-place"];
const cardAddBtn = document.querySelector(".profile__add-button");

const profileForm = document.forms["edit-profile"];
const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__title").textContent;
const profileDescription = profileInfo.querySelector(
    ".profile__description"
).textContent;
const profileEditBtn = document.querySelector(".profile__edit-button");

const imagePopup = document.querySelector(".popup_type_image");

initialCards.forEach(async (item) => {
    const card = await createCard(
        item,
        removeCard,
        likeCard,
        handleCardImageClick
    );

    renderCard(card);
});

function handleCardImageClick({ name, link }) {
    const img = imagePopup.querySelector(".popup__image");
    const caption = imagePopup.querySelector(".popup__caption");

    img.src = link;
    img.alt = name;
    caption.textContent = name;

    openModal(imagePopup);
}

function handleFormProfileEditSubmit(e) {
    e.preventDefault();

    const nameInput = e.target.name.value;
    const jobInput = e.target.description.value;

    profileInfo.querySelector(".profile__title").textContent = nameInput;
    profileInfo.querySelector(".profile__description").textContent = jobInput;

    closeModal(e.target.closest(".popup"));
}

async function handleFormCardAddSubmit(e) {
    e.preventDefault();

    const name = e.target["place-name"].value;
    const link = await checkImageLink(e.target.link.value);

    const card = await createCard(
        { name, link },
        removeCard,
        likeCard,
        handleCardImageClick
    );
    renderCard(card, "prepend");

    closeModal(e.target.closest(".popup"));
    cardForm.reset();
}

cardAddBtn.addEventListener("click", () => {
    const popup = document.querySelector(".popup_type_new-card");

    openModal(popup);
});

profileEditBtn.addEventListener("click", () => {
    const popup = document.querySelector(".popup_type_edit");

    profileForm["name"].value = profileName;
    profileForm["description"].value = profileDescription;

    openModal(popup);
});

cardForm.addEventListener("submit", handleFormCardAddSubmit);
profileForm.addEventListener("submit", handleFormProfileEditSubmit);
