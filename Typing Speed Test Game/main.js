const arrWords = [
    "Computer",
    "Software",
    "Hardware",
    "Internet",
    "Network",
    "Data",
    "Code",
    "Programming",
    "Algorithm",
    "Cybersecurity",
    "Database",
    "Cloud",
    "Server",
    "Website",
    "Gadget",
    "Robot",
    "Laptop",
    "Smartphone",
    "Technology",
];
const lvls = {
    Easy: 5,
    Normal: 4,
    Hard: 2,
};

let defaultLevelName = "Normal";
let levelSeconds = lvls[defaultLevelName];
let difficultiesContainer = document.querySelector(".choose-level");
let chosenDifficulty = document.querySelectorAll("input[type='radio']");

let gameName = document.querySelector(".game .name");
let container = document.querySelector(".container");
let startBtn = document.querySelector(".start");
let lvlSpan = document.querySelector(".msg .lvl");
let secondsSpan = document.querySelector(".msg .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time-left span");
let score = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMsg = document.querySelector(".finish");
let tryAgainBtn = document.querySelector(".finish button");

tryAgainBtn.onclick = function () {
    location.reload();
};

lvlSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = levelSeconds;
timeLeftSpan.innerHTML = levelSeconds;
scoreTotal.innerHTML = arrWords.length;

//Prevent Pasting:
input.onpaste = () => false;

// Start Game:
startBtn.onclick = function () {
    difficultiesContainer.classList.add("disabled-container");
    this.remove();
    input.focus();
    // Generate Word Function:
    genWord();
};

function genWord() {
    let randomWord = arrWords[Math.floor(Math.random() * arrWords.length)];
    let wordIndex = arrWords.indexOf(randomWord);
    theWord.innerHTML = randomWord;
    arrWords.splice(wordIndex, 1);
    upcomingWords.innerHTML = "";
    for (let i = 0; i < arrWords.length; i++) {
        let div = document.createElement("div");
        let txt = document.createTextNode(arrWords[i]);
        div.appendChild(txt);
        upcomingWords.append(div);
    }
    startPlay();
}

function startPlay() {
    timeLeftSpan.innerHTML = levelSeconds;
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            clearInterval(start);
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                score.innerHTML++;
                input.value = "";
                genWord();
                if (score.innerHTML == scoreTotal.innerHTML) {
                    let res = document.createElement("span");
                    res.classList.add("good");
                    res.append(document.createTextNode("You Won!"));
                    finishMsg.classList.remove("disabled-msg");
                    finishMsg.append(res);
                    container.classList.add("disabled-container");
                    gameName.classList.add("disabled-container");
                    tryAgainBtn.classList.add("bg-green");
                }
            } else {
                let res = document.createElement("span");
                res.classList.add("bad");
                res.append(document.createTextNode("Game Over!"));
                finishMsg.classList.remove("disabled-msg");
                finishMsg.append(res);
                container.classList.add("disabled-container");
                gameName.classList.add("disabled-container");
                tryAgainBtn.classList.add("bg-red");
            }
        }
    }, 1000);
}

chosenDifficulty.forEach((el) => {
    el.addEventListener("click", function (el) {
        levelSeconds = lvls[el.target.className];
        lvlSpan.innerHTML = el.target.className;
        secondsSpan.innerHTML = levelSeconds;
        timeLeftSpan.innerHTML = levelSeconds;
    });
});
