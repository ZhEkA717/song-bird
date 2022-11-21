window.addEventListener("DOMContentLoaded", () => {
    const {
        birdsDataRu,
        birdsDataEn
    } = require("./data/choiceLanguage");
    const audioPlayerInteractive = require("./modules/audioPlayerInteractive"),
        audioPlayer = require("./modules/audioPlayer"),
        answers = require("./modules/answers"),
        randomWhatBird = require("./modules/whatBird"),
        trueBird = require("./modules/trueBird"),
        nextLevel = require("./modules/nextLevel"),
        restartGame = require("./modules/restartGame"),
        changeLanguage = require("./modules/changeLanguage"),
        startGame = require("./modules/startGame"),
        gallery = require("./modules/gallery"),
        galleryPopap = require("./modules/galleryPopap"),
        saveDataInLocalStorage = require("./modules/saveDataInLocalStorage"),
        getDataOfLocalStorage = require("./modules/getDataOfLocalStorage");

        getDataOfLocalStorage();

    audioPlayerInteractive(".audio-player");
    audioPlayer("https://www.xeno-canto.org/sounds/uploaded/XIQVMQVUPP/XC518684-Grands%20corbeaux%2009012020%20Suzon.mp3", ".audio-player");
    audioPlayerInteractive(".audio-player_answer");
    audioPlayer("https://www.xeno-canto.org/sounds/uploaded/XIQVMQVUPP/XC518684-Grands%20corbeaux%2009012020%20Suzon.mp3", ".audio-player_answer");

    const language = document.querySelector(".language");
    let currLang = changeLanguage(birdsDataRu, birdsDataEn);
    language.addEventListener("click", () => {
        const currentLang = language.querySelector(".active");
        const lng = currentLang.innerHTML;
        if (lng == "RU") {
            answers(birdsDataRu);
            nextLevel(birdsDataRu);
            randomWhatBird(birdsDataRu);
        } else {
            answers(birdsDataEn);
            nextLevel(birdsDataEn);
            randomWhatBird(birdsDataEn);
        }
        saveDataInLocalStorage();
    });
    
    startGame();
    answers(currLang);
    randomWhatBird(currLang);
    nextLevel(currLang);
    trueBird();
    restartGame();
    galleryPopap();

    const matchMediaGallery = window.matchMedia('(max-width: 520px)');
    function changeRowsGallery(e){
        if(e.matches){
            gallery(2);
        }else{
            gallery(3);
        }
    }
    window.onresize = ()=>{changeRowsGallery(matchMediaGallery);}
    changeRowsGallery(matchMediaGallery);
});

