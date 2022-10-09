//burger menu
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

const inputRange = document.querySelector('input[type="range"]');

const mediaQuery1 = window.matchMedia('(min-width: 1000px)');
const mediaQuery2 = window.matchMedia('(min-width: 1200px)');

// if (mediaQuery1.matches) {
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
            </div>
        `;
    testimonialsItems.append(newItem);
});
// }

inputRange.addEventListener("input", () => {
    let scrollingWidth = testimonialsItems.scrollWidth;
    let lastLeftScroll = scrollingWidth - testimonialsItems.offsetWidth;
    testimonialsItems.scroll({
        left: inputRange.value * lastLeftScroll / inputRange.max,
        behavior: "smooth"
    })
});

inputRange.addEventListener("touchstart", () => {
    testimonialsItems.removeEventListener("scroll", fingerScroll);
});
inputRange.addEventListener("mouseover", () => {
    testimonialsItems.removeEventListener("scroll", fingerScroll);
});


testimonialsItems.addEventListener("touchstart", (EO) => {
    EO.currentTarget.addEventListener("scroll", fingerScroll);
})
testimonialsItems.addEventListener("mouseover", (EO) => {
    EO.currentTarget.addEventListener("scroll", fingerScroll);
})

testimonialsItems.addEventListener("scroll", fingerScroll);

function fingerScroll() {
    let scrollingWidth = testimonialsItems.scrollWidth;
    let raz = testimonialsItems.scrollLeft + testimonialsItems.offsetWidth;
    let lastLeftScroll = scrollingWidth - testimonialsItems.offsetWidth;
    const leftScroll = Math.floor((testimonialsItems.scrollLeft * 70) / lastLeftScroll) / 10;
    if (Number.isInteger(leftScroll)) {
        if (raz == scrollingWidth) {
            inputRange.value = inputRange.max;
        } else {
            inputRange.value = leftScroll;
        }
    }
}
fingerScroll();

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
                    </div>
                    <div class="testimonials__item__close">&#10006;</div>
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
//Slider
document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("resize", resizeSlider);
    const mediaQuerySlider = window.matchMedia("(min-width: 320px)")

    let index = 1,
        widthSlides = 0;
    const container = document.querySelector(".slider"),
        slidesBox = document.querySelector(".slider-inner"),
        slides = document.querySelectorAll(".animals__items"),
        buttons = document.querySelectorAll(".buttons_circle");


    function resizeSlider() {
        if (mediaQuerySlider.matches) {
            widthSlides = container.offsetWidth;
            slidesBox.style.transform = "translateX(" + (-index * widthSlides) + "px)";
        }
    }

    resizeSlider();

    function slider() {
        slidesBox.style.transform = "translateX(" + (-index * widthSlides) + "px)";
        slidesBox.style.transition = "transform 1s ease-out";
    }
    let arr = [0];
    const obj = {
        1: ["Giant Pandas", "Native to Southwest China", "banana"],
        2: ["Eagles", "Native to South America", "meet"],
        3: ["Gorillas", "Native to Congo", "banana"],
        4: ["Cheetahs", "Native to Africa", "meet"],
        5: ["Two-Toed Sloth", "Mesomerica, South America", "banana"],
        6: ["Penguins", "Native to Antarctica", "meet"],
        7: ["Polar Bear", "Native to Antarctica", "meet"],
        8: ["Wolf", "Native to Europe and Asia", "meet"],
        9: ["Headgehog", "Native to Europe", "cherui"],
        10: ["Raccoon", "Native to Europe", "cherui"],
        11: ["Kangaroo", "Native to Australia", "grass"],
        12: ["Lion", "Native to Africa", "meet"],
        13: ["Leopard", "Native to Africa", "meet"],
        14: ["Fox", "Native to Europe and Asia", "meet"],
        15: ["Brown Bear", "Native to Europe and Asia", "berries"],
        16: ["Deer", "Native to Europe and Asia", "grass"],
        17: ["Panther", "Native to Australia", "meet"],
        18: ["Elephant", "Native to Africa", 'grass'],
        19: ["Giraffe", "Native to Africa", 'grass'],
        20: ["Hippo", "Native to Africa", 'grass'],
        21: ["Ostrich", "Native to Africa", "grass"],
        22: ["Alligator", "Native to Southeastern U. S.", "meet"],
        23: ["Goat", "Native to North Africa", "grass"],
        24: ["Peacock", "Native to India", "cherui"],
        25: ["Wild boar", "Native to Belarus", "acorn"]
    }
    function debounceSerie(func, interval, immediate) {
        let timer;
        return function () {
            let context = this,
                args = arguments;
            let later = function () {
                timer = null;
                if (!immediate)
                    func.apply(context, args);
            };
            let callNow = immediate && !timer;
            clearTimeout(timer);
            timer = setTimeout(later, interval);
            if (callNow)
                func.apply(context, args);
        };
    };
    function generateCard(num) {
        slides[num].innerHTML = "";
        for (let i = 1; i <= 6; i++) {
            slides[num].innerHTML += `
            <div class="animals__item">
                <div class="animals__item__img">
                    <img src="assets/images/slider/image${arr[i]}.png" alt="animal${i}">
                    <div></div>
                </div>
                <div class="animals__item__content">
                    <div class="animals__item__content__title">
                        <span>${obj[`${arr[i]}`][0]}</span><br>
                        ${obj[`${arr[i]}`][1]}
                    </div>
                    <div class="animals__item__content__img animals__item__content__img_banana">
                        <img src="assets/images/slider/${obj[`${arr[i]}`][2]}.png" alt="banana-bamboo">
                    </div>
                </div>
            </div>
        `;
        }
    }

    buttons.forEach(item => {
        item.addEventListener("click", debounceSerie(startSlider, 1000, true));

        function startSlider(EO) {
            arr = [0]
            while (arr.length < 26) {
                let r = Math.floor(Math.random() * 25) + 1;
                if (arr.indexOf(r) === -1) {
                    arr.push(r);
                }
            }

            if (EO.target.classList.contains("buttons_circle_left") ||
                EO.target.parentNode.classList.contains("buttons_circle_left")) {
                index <= 0 ? false : index--;
                setTimeout(() => {generateCard(0)}, 10);
                slider();
            } else if (EO.target.classList.contains("buttons_circle_right") ||
                EO.target.parentNode.classList.contains("buttons_circle_right")) {
                index >= slides.length - 1 ? false : index++;
                setTimeout(() => {generateCard(2)}, 10);
                slider();
            }
            setTimeout(() => {generateCard(1)}, 1000);
        }
    });

    const mediaQueryTouches = window.matchMedia("(max-width: 635px)")

    if(mediaQueryTouches.matches){
        const animalsBlock = document.querySelector('.animals');
        animalsBlock.addEventListener('touchstart', funTouchStart, false);
        let move = "stop";
    
        function funTouchStart(EO) {
            EO = EO || window.event;
            EO.preventDefault();
            var touchInfoStart = EO.targetTouches[0];
            var touchXs = touchInfoStart.pageX;
            var touchYs = touchInfoStart.pageY;
    
            animalsBlock.addEventListener('touchmove', funTouchMove);
    
            function funTouchMove(EO) {
                EO = EO || window.event;
                EO.preventDefault();
                var touchInfoMove = EO.targetTouches[0];
                var touchX1 = touchInfoMove.pageX;
                var touchY1 = touchInfoMove.pageY;
                var touchXm = touchX1;
                var touchYm = touchY1;
    
                var minSwipe = 40;
    
                if (touchXs > touchXm && touchXs - touchXm >= minSwipe) {
                    if (Math.abs(touchXs - touchXm) > Math.abs(touchYs - touchYm)) {
                        move = 'left';
                    }
                } else if (touchXs < touchXm && touchXm - touchXs >= minSwipe) {
                    if (Math.abs(touchXs - touchXm) > Math.abs(touchYs - touchYm)) {
                        move = 'right';
                    }
                }
            }
            setTimeout(() => {
                animalsBlock.removeEventListener('touchmove', funTouchMove, false);
            }, 500);
        }
        animalsBlock.addEventListener('touchend', funTouchEnd, false);
    
        function funTouchEnd(EO) {
            EO = EO || window.event;
            if (move == "left") {
                index >= slides.length - 1 ? false : index++;
                slider();
            } else if (move == "right") {
                index <= 0 ? false : index--;
                slider();
            }
            move = "stop";
        }
    }
  
    slidesBox.addEventListener('transitionend', () => {
        setTimeout(() => {
            if (index == slides.length - 1) {
                index = 1;
                slidesBox.style.transition = "none";
                slidesBox.style.transform = "translateX(" + (-index * widthSlides) + "px)";
            } else if (index == 0) {
                index = slides.length - 2;
                slidesBox.style.transition = "none";
                slidesBox.style.transform = "translateX(" + (-index * widthSlides) + "px)";
            }
        }, 0);
    });
});
