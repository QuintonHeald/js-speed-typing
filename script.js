const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random"
const quoteDisplayElement = document.getElementById("quoteDisplay")
const quoteInputElement = document.getElementById("quoteInput")
const timerElement = document.getElementById("timer")

/*
    1. Start timer once user begins typing --> DONE
    2. After successfull
    y typing a quote, add the results to a list at the bottom showing the quote, time taken, and calculated wpm.
    3. Add a hard mode where progress is reset on a mistake.
*/

// Make sure to review promise and async syntax

quoteInputElement.addEventListener("input", () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll("span")
    const arrayValue = quoteInputElement.value.split("")

    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove("correct")
            characterSpan.classList.remove("incorrect")
            correct = false
        }
        else if (character === characterSpan.innerText) {
            characterSpan.classList.add("correct")
            characterSpan.classList.remove("incorrect")
        } else {
            characterSpan.classList.remove("correct")
            characterSpan.classList.add("incorrect")
            correct = false
        }
    })
    if (correct) renderNewQuote()
})

async function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerText = ""
    quote.split("").forEach(character => {
        const characterSpan = document.createElement("span")
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    });
    quoteInputElement.value = null;
    if (timeStarted) {
        timeStarted = false;
    }
    resetTimer();
    typeToStart();
}

let startTime;
let timeStarted = false;
let interval;

function typeToStart () {
    quoteInputElement.addEventListener("keypress", () => {
        if (!timeStarted) {
            startTimer();
            timeStarted = true;
        }
    })
}

function startTimer() {
    timerElement.innerText = 0;
    startTime = new Date()
    interval = setInterval(() => {
        timer.innerText = getTimerTime()
        getTimerTime()
    }, 1000)
}

function resetTimer() {
    clearInterval(interval);
    timerElement.innerText = 0;
    timeStarted = false;
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()