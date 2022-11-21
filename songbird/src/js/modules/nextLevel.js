function nextLevel(arr) {
    const answers = require("./answers"),
        randomWhatBird = require("./whatBird");


    const nextButton = document.querySelector(".nav-btns__next");
    const cardStart = document.querySelector(".card__start");
    const cardPlayer = document.querySelector(".card__player");
    const cardDescription = document.querySelector(".card__descr");
    const answerItemBtn = document.querySelectorAll(".answers__item__btn");
    const questionsItem = document.querySelectorAll(".questions__item");
    const whatBirdAudio = document.querySelector(`.what-bird audio`);
    const audioPlayer = document.querySelector(".what-bird .audio-player");
    const loadingEl = document.querySelector(".what-bird__loading");
    const inputRangeTime = document.querySelector(`.what-bird .audio-player__time-range input`);
    const volumeImage = document.querySelector(`.audio-player img`);
    const gameOver = document.querySelector(".game-over");
    const gameOverResult = document.querySelector(".game-over__result span");
    const mainBlock = document.querySelector("main");
    const backToHomeButton = document.querySelector(".nav-btns__back");
    let index = 0;

    nextButton.onclick = endLevel;
    backToHomeButton.onclick = endLevelAndResetGame;

    function endLevel() {
        if (nextButton.classList.contains("istrue")) {
            if (index < 5) {
                index++;
            } else {
                createGameOver();
            }
            callAllFunctions();
        }
    };



    function endLevelAndResetGame() {
        createGameOver();
        callAllFunctions();
        restart();
    }

    function callAllFunctions() {
        defaultButton();
        loadAudio();
        defaultWhatBirdAudio();
        startCardValue();
        answers(arr, index);
        randomWhatBird(arr, index);
        newQuestion();
    }

    function restart() {
        const score = document.querySelector(".score span");
        score.innerHTML = 0;
        gameOverResult.innerHTML = score.innerHTML;
        mainBlock.style.display = 'block';
        gameOver.style.display = "none";
    }

    function createGameOver() {
        const score = document.querySelector(".score span");
        gameOverResult.innerHTML = score.innerHTML;
        mainBlock.style.display = 'none';
        gameOver.style.display = "flex";
        index = 0;
    }

    function loadAudio() {
        audioPlayer.style.display = "none";
        loadingEl.style.display = "flex";
        whatBirdAudio.oncanplay = () => {
            audioPlayer.style.display = "flex";
            loadingEl.style.display = "none";
            whatBirdAudio.oncanplay = "";
        }
    }

    function defaultWhatBirdAudio() {
        inputRangeTime.style.backgroundImage =
            `linear-gradient(to right, #008966 ${0}%, rgba(255, 255, 255, 0) ${0}%)`;
        volumeImage.src = "./src/assets/icons/play.svg";
        volumeImage.className = "play";
    }

    function defaultButton() {
        nextButton.classList.remove("istrue");
        nextButton.style.backgroundColor = "#303030";
    }

    function newQuestion() {
        questionsItem.forEach(item => {
            if (item.classList.contains("questions__item_active")) {
                item.classList.remove("questions__item_active");
            };
        });
        questionsItem.forEach((item, i) => {
            if (i === index) {
                item.classList.add("questions__item_active");
            }
        });
    }

    function startCardValue() {
        const cardAudio = document.querySelector(".answer-and-player audio");
        cardAudio.pause();
        cardStart.style.display = "flex";
        cardStart.innerHTML = `Послушайте плеер.<br>
        Выберите птицу из списка.`;
        cardPlayer.style.display = "none";
        cardDescription.style.display = "none";
        answerItemBtn.forEach(item => {
            item.style.backgroundColor = "#555";
            item.id = "";
            item.className = "answers__item__btn";
        });
    }
}

module.exports = nextLevel;