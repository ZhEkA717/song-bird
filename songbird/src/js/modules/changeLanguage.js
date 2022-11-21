function changeLanguage(birdsDataRu,birdsDataEn){  
    const ChangeLanguageStatic = require ("./changeLanguageStatic"); 
    const getResource = require ("./services"); 
    const language = document.querySelector(".language");
    const currentLang = language.querySelector(".active");
    const lng = currentLang.innerHTML.toLowerCase();
    const changeLanguageAudio = new Audio();
    changeLanguageAudio.src = "src/assets/audio/changeLanguage.mp3"
    
    language.onclick = (e) => {
        const ru = language.querySelector(".ru"),
            eng = language.querySelector(".eng");
    
        if (e.target.classList.contains("ru") || e.target.classList.contains("eng")) {
            changeLanguageAudio.load();
            changeLanguageAudio.play();
            if (e.target == ru) {
                eng.classList.remove("active");
                ru.classList.add("active");
            } else {
                ru.classList.remove("active");
                eng.classList.add("active");
            }
            const lngClick = e.target.classList.contains("ru") ? "ru" : "eng";
            getResource(`https://rolling-scopes-school.github.io/zheka717-JSFE2022Q3/songbird/src/js/data/${lngClick}.json`)
            .then(data => {
                let {
                    startButton,
                    arrOfLevels,
                    score,
                    backButton,
                    nextButton,
                    messgeForGame,
                    titleGameOver,
                    subtitleGameOver1,
                    subtitleGameOver2,
                    restartButton
                } = data;
                new ChangeLanguageStatic(startButton, arrOfLevels, score, backButton, nextButton, messgeForGame, titleGameOver, subtitleGameOver1,subtitleGameOver2, restartButton).translate();
            });
        }
    };
    return lng=="ru"?birdsDataRu:birdsDataEn;
}

module.exports = changeLanguage;