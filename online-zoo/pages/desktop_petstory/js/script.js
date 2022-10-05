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

//testimonials carousel




const testimonialsItems = document.querySelector(".testimonials__items");

const userAndUsernameArray = [
    ['assets/icons/user-profile.png', "Amanda Black"],
    ['assets/icons/avatar.png', "Jorg Chember"],
    ['assets/icons/man.png', "Alex Bereza"],
    ['assets/icons/woman.png', "Sasha Grey"],
    ['assets/icons/man-man.png', 'Peter Parker'],
    ['assets/icons/account.png', "Mary Jayne"],
    ['assets/icons/user.png', "Orlando Blum"]
];

userAndUsernameArray.forEach(item => {
    const newItem = document.createElement("div");
    newItem.classList.add("testimonials__item");
    newItem.innerHTML = `
        <div class="testimonials__item__user">
            <img src=${item[0]} alt="user4">
            <div class="testimonials__item__user__descr">
                <span>${item[1]}</span><br>
                Local Austria<span>•</span>Yesterday
            </div>
        </div>
        <div class="testimonials__item__content">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae nam voluptatibus architecto
            laborum ipsam a labore possimus, dolor tempora, incidunt laboriosam obcaecati in nulla aliquam.
            Et exercitationem repellat fuga nisi, doloremque cupiditate facere, dolore laudantium illum esse
            dolor nostrum molestiae. Cum, sit iste eius ad voluptates nemo aut. Deleniti temporibus,
            explicabo esse fuga sint nemo ipsa error totam porro autem saepe qui quis aliquam commodi?
            Accusamus architecto porro ad aliquam in voluptate ex vero sed illo unde, hic inventore
            voluptatem itaque molestiae facilis error quam. Atque quaerat corrupti id illo.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae nam voluptatibus architecto
            laborum ipsam a labore possimus, dolor tempora, incidunt laboriosam obcaecati in nulla aliquam.
            Et exercitationem repellat fuga nisi, doloremque cupiditate facere, dolore laudantium illum esse
            dolor nostrum molestiae. Cum, sit iste eius ad voluptates nemo aut. Deleniti temporibus,
            explicabo esse fuga sint nemo ipsa error totam porro autem saepe qui quis aliquam commodi?
            Accusamus architecto porro ad aliquam in voluptate ex vero sed illo unde, hic inventore
            voluptatem itaque molestiae facilis error quam. Atque quaerat corrupti id illo.
        </div>
    `;

    testimonialsItems.append(newItem);
})


const inputRange = document.querySelector('input[type="range"]');

const mediaQuery1 = window.matchMedia('(min-width: 1000px)');
const mediaQuery2 = window.matchMedia('(min-width: 1200px)');

let amountCard;
if (mediaQuery1.matches) {
    amountCard = 10;
} else if (mediaQuery2.matches) {
    amountCard = 11;
}
if (amountCard) {
    let scrollingWidth = testimonialsItems.scrollWidth;
    let step = (scrollingWidth / amountCard) + 3;

    inputRange.addEventListener("input", () => {
        let inputRangeValue = inputRange.value / 10;
        testimonialsItems.scrollTo(step * inputRangeValue, scrollingWidth);
    });
    testimonialsItems.addEventListener("scroll", () => {
        const leftScroll = Math.ceil((testimonialsItems.scrollLeft * 100) / scrollingWidth);
        inputRange.value = leftScroll;
    });
}



//testimonials popap

const mediaQuery3 = window.matchMedia('(max-width: 1000px)');

function handleDesktop(e) {
    if (e.matches) {
        const testimonialsItem = document.querySelectorAll(".testimonials__item"),
            backgroundPopap = document.createElement("div");

        testimonialsItem.forEach(item => {
            item.addEventListener('click', (e) => {
                const userImgSrc = item.querySelector("img").src,
                    userDescrInner = item.querySelector(".testimonials__item__user__descr").innerHTML,
                    cardContent = item.querySelector(".testimonials__item__content").innerHTML;

                backgroundPopap.classList.add("background-popap");
                backgroundPopap.innerHTML = `
        <div class="testimonials__item">
            <div class="testimonials__item__user">
                <img src=${userImgSrc} alt="userPopap">
                <div class="testimonials__item__user__descr">
                    ${userDescrInner}
                </div>
            </div>
            <div class="testimonials__item__content">
                ${cardContent}
            </div>
            <div class="testimonials__item__close">&#10006;</div>
        </div>
        `;

                document.body.append(backgroundPopap);
                const createdItem = backgroundPopap.firstElementChild;

                createdItem.style.cursor = "auto";
                createdItem.style.width = "267px";
                createdItem.style.height = "391px";
                createdItem.style.position = "absolute";
                createdItem.style.top = "50%";
                createdItem.style.left = "50%";
                createdItem.style.transform = "translate(-50%,-50%)";
                createdItem.style.overflowY = "scroll";
                createdItem.querySelector(".testimonials__item__content").style.overflow = "visible"


                document.body.style.height = "100vh";
                document.body.style.overflow = "hidden";

                const closeItem = document.querySelector(".testimonials__item__close");
                [backgroundPopap, closeItem].forEach(item => {
                    item.addEventListener("click", (e) => {
                        if (e.target.classList.contains("background-popap") || e.target.classList.contains("testimonials__item__close")) {
                            document.body.style.height = "";
                            document.body.style.overflow = "";
                            backgroundPopap.remove();
                        }
                    });
                });
            });
        });

    }
}
handleDesktop(mediaQuery3);
