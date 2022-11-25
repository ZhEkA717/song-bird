class ChangeLanguageStatic {
    constructor(startButton, arrOfLevels, score, backButton, nextButton, messgeForGame, titleGameOver, subtitleGameOver1,subtitleGameOver2, restartButton,startTitle) {
        this.startButton = startButton;
        this.arrOfLevels = arrOfLevels;
        this.score = score;
        this.backButton = backButton;
        this.nextButton = nextButton;
        this.messgeForGame = messgeForGame;
        this.titleGameOver = titleGameOver;
        this.subtitleGameOver1 = subtitleGameOver1;
        this.subtitleGameOver2 = subtitleGameOver2;
        this.restartButton = restartButton;
        this.startTitle = startTitle;
    }

    translate() {
        const startButton = document.querySelector(".start-game__btn"),
              questionsItem = document.querySelectorAll(".questions__item"),
              score = document.querySelector(".score b"),
              backButton = document.querySelector(".nav-btns__back"),
              nextButton = document.querySelector(".nav-btns__next"),
              messgeForGame = document.querySelector(".card__start"),
              titleGameOver = document.querySelector(".game-over__title"),
              subtitleGameOver1 = document.querySelector(".game-over__result .part1"),
              subtitleGameOver2 = document.querySelector(".game-over__result .part2"),
              restartButton = document.querySelector(".game-over__restart"),
              startTitle = document.querySelector(".start-game__video__title");

        startButton.innerHTML = this.startButton;
        score.innerHTML = this.score;
        backButton.innerHTML = this.backButton;
        nextButton.innerHTML = this.nextButton;
        messgeForGame.innerHTML = this.messgeForGame;
        titleGameOver.innerHTML = this.titleGameOver;
        subtitleGameOver1.innerHTML = this.subtitleGameOver1;
        subtitleGameOver2.innerHTML = this.subtitleGameOver2;
        restartButton.innerHTML = this.restartButton;
        startTitle.innerHTML = this.startTitle;

        questionsItem.forEach((item,i) => {
            item.innerHTML = this.arrOfLevels[i];
        });
    }
}

module.exports = ChangeLanguageStatic;