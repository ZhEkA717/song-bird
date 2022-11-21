function galleryPopap() {
    const {
        birdsDataRu,
        birdsDataEn
    } = require("../data/choiceLanguage");

    const createCard = require("./card"),
        audioPlayerInteractive = require("./audioPlayerInteractive"),
        audioPlayer = require("./audioPlayer"),
        changeLanguage = require("./changeLanguage");

    const wall = document.querySelector("#wall");
    const card0 = document.querySelectorAll(".card")[0];
    const card1 = document.querySelectorAll(".card")[1];
    const slider = document.querySelector(".slider");

    wall.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.className === "bird-image") {
            slider.style.display = "block";
            card1.innerHTML = card0.innerHTML + "<div class='card__close'>+</div>";
            let {
                image,
                name,
                species,
                description,
                audio
            } = findClickedEl(e.target);

            createCard(".slider", image, name, species, description, audio);

            audioPlayerInteractive(".slider");
            audioPlayer(audio, ".slider");
            
            document.onkeyup = (e) => {
                if(e.code === "Escape"){
                    closePopap();
                }
            }
        }
    });

    function findClickedEl(clickedEl) {
        let el;
        changeLanguage(birdsDataRu, birdsDataEn).forEach(item => {
            item.forEach(item => {
                if (clickedEl.src === item.image) {
                    el = item;
                }
            })
        })
        return el;
    }

    document.addEventListener("click",(e)=>{
        if(e.target.className === "container" ||
            e.target.className === "card__close"){
            closePopap();
        }
    });

    function closePopap(){
        const sliderAudio = document.querySelector(".slider audio");
        sliderAudio.pause();
        slider.style.display = "none";
    }
}

module.exports = galleryPopap;