const cards = document.querySelectorAll(".grid-image-card");
const mainMenu = document.querySelector(".main-menu");
const startButton = document.getElementById("startButton");
const clock = document.getElementById("clock");
const container = document.getElementById("container");
const cardsImageBack = document.querySelectorAll(".back");

let seconds = 0;
let minutes = 0;
let timerInterval;

let mouseCardClick = [];
let cardPairs = [];

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
	console.log(imagesGrid);
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

function handleCardClick(card) {
	if (mouseCardClick.length < 2 && card.classList.contains("card-is-flipped")) {
		mouseCardClick.push(card);
		card.style.pointerEvents = "none";
	}

	if (mouseCardClick.length === 2) {
		if (
			mouseCardClick[0].querySelector(".back").getAttribute("src") ===
			mouseCardClick[1].querySelector(".back").getAttribute("src")
		) {
			setTimeout(() => {
				mouseCardClick.forEach((cardClick) => {
					cardClick.style.opacity = "0";
					mouseCardClick = [];
					cardPairs.push(cardClick);
					console.log(cardPairs);
					if (cardPairs.length === 2) {
						console.log("GAMEEEEEEEEEEEEEEEE");
						gameOverScreen();
					}
				});
			}, 800);
		} else {
			setTimeout(() => {
				mouseCardClick.forEach((cardClick) => {
					if (cardClick.classList.contains("card-is-flipped")) {
						cardClick.classList.remove("card-is-flipped");
						cardClick.style.pointerEvents = "auto";
					}
				});
				mouseCardClick = [];
			}, 800);
		}
	}
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
			handleCardClick(card);
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
	setGridImagesRandomly();
	startButton.removeEventListener("click", mainMainStartGameEvent);
}

function gameOverScreen() {
	stopClock();
	const gameOverContainer = document.createElement("div");
	const text1 = document.createElement("p");
	const text2 = document.createElement("p");
	const text3 = document.createElement("p");
	const resetGameButton = document.createElement("button");
	resetGameButton.textContent = "Play Again";
	resetGameButton.classList.add("game-over-button");
	gameOverContainer.classList.add("game-over-screen");
	text1.classList.add("game-over-text1");
	text2.classList.add("game-over-text2");
	text3.classList.add("game-over-text3");

	text1.textContent = "GAME OVER";
	text3.textContent = "Do you want to play again?"

	if (seconds < 60) {
		text2.textContent = `It took you ${seconds} seconds to get all the pairs`;
	} else if ((minutes = 1)) {
		text2.textContent = `It took you ${minutes} min and ${seconds} seconds to get all the pairs`;
	} else if (minutes >= 1) {
		`It took you ${minutes} minutes and ${seconds} seconds to get all the pairs`;
	}
	const body = document.body;
	container.style.display = "none";
	body.append(gameOverContainer);
	gameOverContainer.append(text1, text2, text3, resetGameButton);
	resetGameButton.addEventListener("click", restGame);
}


function restGame(){
	stopClock();
	clearInterval(timerInterval);
	seconds = 0
	minutes = 0;
    mouseCardClick = [];
    cardPairs = [];
    clock.textContent = "00:00";
	cards.forEach(card => {
        card.classList.remove("card-is-flipped");
        card.style.pointerEvents = "auto";
        card.style.opacity = "1";
    });
	const gameOverContainer = document.querySelector(".game-over-screen");
    if (gameOverContainer) {
        gameOverContainer.remove();
    }
    mainMenu.style.display = "none";
    container.style.display = "grid";
	clockTimer();
	startClock();
	setGridImagesRandomly();
}



mainMenuStartGame();
