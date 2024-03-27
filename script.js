const cards = document.querySelectorAll(".grid-image-card");
const mainMenu = document.querySelector(".main-menu");
const startButton = document.getElementById("startButton");
const clock = document.getElementById("clock");
const container = document.getElementById("container");
const cardsImageBack = document.querySelectorAll(".back");

let seconds = 0;
let minutes = 0;
let timerInterval;

const imagesFileName = [
	"images/beerus.png",
	"images/universe7_squad.jpg",
	"images/broly.jpg",
	"images/goku_black.jpg",
	"images/kid_buu.jpg",
	"images/cooler.avif",
	"images/mui-goku.jpg",
	"images/Dbs_broly_movie.jpg",
];


function shuffleImages(images) {
    for (let card = images.length - 1; card > 0; card--) {
        const cardPick = Math.floor(Math.random() * (card + 1));
        [images[card], images[cardPick]] = [images[cardPick], images[card]];
    }
    return images;
}


function setGridImagesRandomly() {
	const imagesGrid = [];

	imagesFileName.forEach((fileName) => {
		imagesGrid.push(fileName);
		imagesGrid.push(fileName);
	});

	shuffleImages(imagesGrid);
	cardsImageBack.forEach((card, index) => {
		card.src = imagesGrid[index];
	});
	console.log(imagesGrid)
}

function startClock() {
	timerInterval = setInterval(updateClock, 1000);
}

function stopClock() {
	clearInterval(timerInterval);
}

function updateClock() {
	seconds++;
	if (seconds === 60) {
		seconds = 0;
		minutes++;
	}
	clockTimer();
}

// starts the clocks and formats it
function clockTimer() {
	const formattedTime = formatTime(minutes) + ":" + formatTime(seconds);
	clock.textContent = formattedTime;
}

function formatTime(time) {
	return time < 10 ? "0" + time : time;
}
function flipCards() {
	cards.forEach((card) => {
		card.addEventListener("click", () => {
			card.classList.toggle("card-is-flipped");
		});
	});
}

function mainMenuStartGame() {
	startButton.addEventListener("click", mainMainStartGameEvent);
}

function mainMainStartGameEvent() {
	mainMenu.style.display = "none";
	container.style.display = "grid";
	flipCards();
	startClock();
	setGridImagesRandomly()

	startButton.removeEventListener("click", mainMainStartGameEvent);
}

mainMenuStartGame();
