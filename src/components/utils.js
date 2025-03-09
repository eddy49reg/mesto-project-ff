export function loadImage(imageUrl) {
    return new Promise((resolve, reject) => {
        const image = document.createElement("img");
        image.src = imageUrl;
        image.onload = resolve;
        image.onerror = reject;
    });
}

export function checkImageLink(url) {
    return loadImage(url)
        .then(() => url)
        .catch(() => "https://placehold.co/600x400/232323/FFF?text=No+Poster");
}
