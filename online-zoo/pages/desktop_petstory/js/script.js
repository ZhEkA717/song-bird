const humburger = document.querySelector(".humburger"),
    closeBurger = document.querySelector(".close-burger"),
    openBurMenu = document.querySelector(".open-bur-menu"),
    popapFon = document.querySelector(".popap-fon");

humburger.addEventListener("click", () => {
    if (!humburger.classList.contains("humburger_active")) {
        openBurMenu.classList.add("open-bur-menu_active");
        popapFon.classList.add("popap-fon_active");
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
    }
});

[closeBurger, popapFon].forEach(item => {
    item.addEventListener("click", (e) => {
        if (e.target.classList.contains('popap-fon') || e.target.classList.contains('close-burger')) {
            openBurMenu.classList.remove("open-bur-menu_active");
            popapFon.classList.remove("popap-fon_active");
            document.body.style.overflow = "scroll";
        }
    });
});
