function getDataOfLocalStorage(){
    const ChangeLanguageStatic = require ("./changeLanguageStatic"); 
    const getResource = require ("./services"); 
    const currentLanguage = document.querySelector(".language .active");
    const engLanguage = document.querySelector(".language .eng");
    const getLocalStorageisTrued = !!localStorage.getItem("currentLanguageJSON");
    if(getLocalStorageisTrued){
        const getData = localStorage.getItem("currentLanguageJSON");
        const getDataParsed = JSON.parse(getData);
        if(currentLanguage.innerHTML !== getDataParsed){
            currentLanguage.classList.remove("active");
            engLanguage.classList.add("active");
            getResource(`https://rolling-scopes-school.github.io/zheka717-JSFE2022Q3/songbird/src/js/data/eng.json`)
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
    }
}

module.exports = getDataOfLocalStorage;