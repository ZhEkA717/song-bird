function startGame() {
    const {birdsDataRu,birdsDataEn} = require("../data/choiceLanguage"),
    changeLanguage = require("./changeLanguage");

    const startGameBlock = document.querySelector(".start-game")
    const startGameButtton = document.querySelector(".start-game__btn");
    const score = document.querySelector(".score");
    const language = document.querySelector(".language");
    const whatBird = document.querySelector(".what-bird");
    const answerAndPlayer = document.querySelector(".answer-and-player");
    const navButtons = document.querySelector(".nav-btns");
    const questions = document.querySelector(".questions");
    const backToHomeButton = document.querySelector(".nav-btns__back");
    const gameOverResult = document.querySelector(".game-over__result span");
    const gameOver = document.querySelector(".game-over");
    const mainBlock = document.querySelector("main");


    startGameButtton.addEventListener("click", () => {
        startGameBlock.style.display = "none";
        language.style.display = "none";
        questions.style.display = "block";
        score.style.display = "block";
        whatBird.style.display = "flex";
        answerAndPlayer.style.display = "flex";
        navButtons.style.display = "flex";
    });

    backToHomeButton.addEventListener("click",()=>{
        startGameBlock.style.display = "block";
        language.style.display = "block";
        questions.style.display = "none";
        score.style.display = "none";
        whatBird.style.display = "none";
        answerAndPlayer.style.display = "none";
        navButtons.style.display = "none";
    });
}

module.exports = startGame;