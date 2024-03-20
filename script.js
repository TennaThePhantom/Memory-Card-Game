const cards = document.querySelectorAll(".grid-image-card");

cards.forEach((card) => {
    card.addEventListener("click", () => {
        card.classList.toggle("card-is-flipped");
    });
});
