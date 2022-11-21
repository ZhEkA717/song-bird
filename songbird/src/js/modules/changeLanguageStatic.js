class ChangeLanguageStatic {
    constructor(startButton, arrOfLevels, score, backButton, nextButton, messgeForGame, titleGameOver, subtitleGameOver, restartButton) {
        this.startButton = startButton;
        this.arrOfLevels = arrOfLevels;
        this.score = score;
        this.backButton = backButton;
        this.nextButton = nextButton;
        this.messgeForGame = messgeForGame;
        this.titleGameOver = titleGameOver;
        this.subtitleGameOver = subtitleGameOver;
        this.restartButton = restartButton;
    }

    translate() {
        const startButton = document.querySelector(".start-game__btn"),
              questionsItem = document.querySelectorAll(".questions__item"),
              score = document.querySelector(".score b"),
              backButton = document.querySelector(".nav-btns__back"),
              nextButton = document.querySelector(".nav-btns__next"),
              messgeForGame = document.querySelector(".card__start"),
              titleGameOver = document.querySelector(".game-over__title"),
              subtitleGameOver = document.querySelector(".game-over__result"),
              restartButton = document.querySelector(".game-over__restart");

        startButton.innerHTML = this.startButton;
        score.innerHTML = this.score;
        backButton.innerHTML = this.backButton;
        nextButton.innerHTML = this.nextButton;
        messgeForGame.innerHTML = this.messgeForGame;
        titleGameOver.innerHTML = this.titleGameOver;
        subtitleGameOver.innerHTML = this.subtitleGameOver;
        restartButton.innerHTML = this.restartButton;

        questionsItem.forEach((item,i) => {
            item.innerHTML = this.arrOfLevels[i];
        });
    }
}

module.exports = ChangeLanguageStatic;