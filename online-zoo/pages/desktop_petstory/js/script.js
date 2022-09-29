const humburger = document.querySelector(".humburger"),
    openBurMenu = document.querySelector(".open-bur-menu");
humburger.addEventListener("click",()=>{
    if(humburger.classList.contains("humburger_active")){
        humburger.classList.remove("humburger_active");
        openBurMenu.classList.remove("open-bur-menu_active");
    }else{
        humburger.classList.add("humburger_active");
        openBurMenu.classList.add("open-bur-menu_active");
    }
})