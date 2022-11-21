function answers(arr,num=0) {
    const createCard = require("./card");
    const answersItem = document.querySelectorAll(".answers__item");
    const cardStart = document.querySelector(".card__start");
    const cardPlayer = document.querySelector(".card__player");
    const cardDescription = document.querySelector(".card__descr");
    const answersItemName = document.querySelectorAll(".answers__item__name");

    const inputRangeTime = document.querySelector(`.audio-player_answer .audio-player__time-range input`);
    const volumeImage = document.querySelector(`.audio-player_answer img`);
    const loading = document.querySelector(".what-bird__loading");

    answersItemName.forEach((item, i) => {
        item.innerHTML = arr[num][i].name;
        item.id = i+1;
    });

    answersItem.forEach(item => {

        item.onclick = (e) => {
            startCardValue();
            let {
                image,
                name,
                species,
                description,
                audio
            } = findClickedEl(e.currentTarget.innerText.trim());

            createCard('.answer-and-player',image, name, species, description, audio);
            const audioLoad = document.querySelector(`.audio-player_answer audio`);
            audioLoad.oncanplay = ()=>{
                defaultCardValue();
                audioLoad.oncanplay = '';
            }
        };
    });

    function startCardValue(){
        cardStart.style.display = "flex";
        cardStart.innerHTML = loading.innerHTML;
        cardPlayer.style.display = "none";
        cardDescription.style.display = "none";
    }

    function defaultCardValue() {
        cardStart.style.display = "none";
        cardPlayer.style.display = "flex";
        cardDescription.style.display = "block";

        inputRangeTime.style.backgroundImage =
            `linear-gradient(to right, #008966 ${0}%, rgba(255, 255, 255, 0) ${0}%)`;
        volumeImage.src = "./src/assets/icons/play.svg";
        volumeImage.className = "play";
    }

    function findClickedEl(clickedEl) {
        let el;
        arr.forEach(item => {
            item.forEach(item => {
                if (clickedEl === item.name) {
                    el = item;
                }
            })
        })
        return el;
    }
}

module.exports = answers;