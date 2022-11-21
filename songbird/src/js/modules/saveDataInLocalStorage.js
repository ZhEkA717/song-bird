function saveLocalStorage(){
    const currentLanguage = document.querySelector(".language .active").innerHTML;
    const currentLanguageJSON = JSON.stringify(currentLanguage);
    localStorage.setItem("currentLanguageJSON",currentLanguageJSON);
    console.log("datas saving..");
}

module.exports = saveLocalStorage;

