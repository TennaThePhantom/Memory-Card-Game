const cards = document.querySelectorAll(".grid-image-card");
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
	window.onload = startClock;
	const formattedTime = formatTime(minutes) + ":" + formatTime(seconds);
	document.getElementById("clock").textContent = formattedTime;
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

flipCards();
clockTimer();
