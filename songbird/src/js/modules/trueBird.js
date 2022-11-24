function trueBird() {
    const whatBirdAudio = document.querySelector(".what-bird audio");
    const whatBirdImage = document.querySelector(".audio-player__button img");
    const answerAudio = document.querySelector(`.audio-player_answer audio`);
    const answerItem = document.querySelectorAll(".answers__item");
    const score = document.querySelector(".score span");
    const nextButton = document.querySelector(".nav-btns__next");
    const restartButton = document.querySelector(".game-over__restart");
    const errorSong = new Audio();
    const winSong = new Audio();
    count = 0;

    errorSong.src = "src/assets/audio/error-song.mp3";
    winSong.src = "src/assets/audio/win-song.mp3";

    restartButton.addEventListener("click",()=>{
        count = 0;
    })

    answerItem.forEach(item => {
        item.addEventListener("click", (e) => {
            if (answerAudio.src === whatBirdAudio.src) {
                trueAnswer(e.currentTarget);
            } else {
                falseAnswer(e.currentTarget);
            }
        });
    });

    function falseAnswer(clickedEl) {
        const pointClickedEl = clickedEl.querySelector(".answers__item__btn");

        if (!document.getElementById("istrue") &&
            !pointClickedEl.classList.contains('iserror')) {
            pointClickedEl.style.background = "#d62c1a";
            errorSong.load();
            errorSong.play();
            count -= 1;
        }

        pointClickedEl.className = 'answers__item__btn iserror';

    }

    function trueAnswer(clickedEl) {
        const pointClickedEl = clickedEl.querySelector(".answers__item__btn");
        const whatBirdImg = document.querySelector(".what-bird__img img");
        const whatBirdTitle = document.querySelector(".what-bird .title");
        const cardImage = document.querySelector(".card__player img");
        const cardTitle = document.querySelector(".card__player .title");

        if (!document.getElementById("istrue")) {
            count += 5;
            winSong.load();
            winSong.play();
            pauseAudio();
        }

        pointClickedEl.style.background = "#00bc8c";
        pointClickedEl.id = "istrue";

        whatBirdImg.src = cardImage.src;
        whatBirdTitle.innerHTML = cardTitle.innerHTML;
        score.innerHTML = count;
        nextButton.style.backgroundColor = "#00bc8c";
        nextButton.classList.add("istrue");
    }
    function pauseAudio() {
        whatBirdImage.src = "./src/assets/icons/play.svg";
        whatBirdImage.className = "play";
        whatBirdAudio.pause();
    }
}

module.exports = trueBird;