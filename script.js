const cards = document.querySelectorAll(".grid-image-card");
const mainMenu = document.querySelector(".main-menu");
const startButton = document.getElementById("startButton");
const clock = document.getElementById("clock");
const container = document.getElementById("container");

let seconds = 0;
let minutes = 0;
let timerInterval;

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

	startButton.removeEventListener("click", mainMainStartGameEvent);
}

mainMenuStartGame();
