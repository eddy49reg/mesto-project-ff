import { checkImageLink } from "@/components/utils";
import { MestoAPI } from "@/components/api";

let currentCardId;
let currentDeleteButton;

export async function createCard(data, openDeletePopup, handleCardImageClick) {
    const cardTemplate = document.querySelector("#card-template").content;
    const card = cardTemplate.querySelector(".card").cloneNode(true);

    const link = await checkImageLink(data.link);
    const deleteButton = card.querySelector(".card__delete-button");
    const likeButton = card.querySelector(".card__like-button");
    const likeCounter = card.querySelector(".card__like-counter");

    const cardImage = card.querySelector(".card__image");

    cardImage.src = link;
    cardImage.alt = data.name;
    card.querySelector(".card__title").textContent = data.name;

    cardImage.addEventListener("click", () => {
        handleCardImageClick({
            name: data.name,
            link: link,
        });
    });

    if (data.owner_id === data.owner["_id"]) {
        deleteButton.classList.add("card__delete-button_is-active");
        deleteButton.addEventListener("click", () => {
            currentCardId = data["_id"];
            currentDeleteButton = deleteButton;
            openDeletePopup();
        });
    }

    if (data.likes.find((like) => like["_id"] === data.owner_id)) {
        likeButton.classList.add("card__like-button_is-active");
    }

    likeCounter.textContent = data.likes.length;

    card.querySelector(".card__like-button").addEventListener("click", () => {
        handleCardLike(data["_id"], likeButton, likeCounter);
    });

    return card;
}

function handleCardLike(cardId, buttonEl, counterEl) {
    buttonEl.disabled = true;

    if (buttonEl.classList.contains("card__like-button_is-active")) {
        MestoAPI.unLikeCard(cardId)
            .then((data) => {
                const likes = data["likes"];

                buttonEl.classList.remove("card__like-button_is-active");

                if (likes.length) {
                    counterEl.classList.add("card__like-counter_is-active");
                } else {
                    counterEl.classList.remove("card__like-counter_is-active");
                }

                counterEl.textContent = likes.length;
            })
            .catch((e) => {
                console.error(e.message);
            })
            .finally(() => {
                buttonEl.disabled = false;
            });
    } else {
        MestoAPI.likeCard(cardId)
            .then((data) => {
                const likes = data["likes"];

                buttonEl.classList.add("card__like-button_is-active");

                counterEl.classList.add("card__like-counter_is-active");
                counterEl.textContent = likes.length;
            })
            .catch((e) => {
                console.error(e.message);
            })
            .finally(() => {
                buttonEl.disabled = false;
            });
    }
}

export function getCardForDeletion() {
    return {
        cardId: currentCardId,
        deleteButton: currentDeleteButton,
    };
}
