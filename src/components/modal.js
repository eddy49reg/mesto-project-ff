export function openModal(popup) {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", closePressEscapeModal);
}

export function closeModal(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closePressEscapeModal);
}

export function handleModalClick(e) {
    if (e.target.classList.contains("popup_is-opened")) {
        return closeModal(e.target);
    }

    if (e.target.closest(".popup__close")) {
        return closeModal(e.target.closest(".popup"));
    }
}

function closePressEscapeModal(e) {
    if (e.key === "Escape") {
        closeModal(document.querySelector(".popup_is-opened"));
    }
}
