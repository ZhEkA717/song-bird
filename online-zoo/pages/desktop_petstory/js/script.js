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

if (mediaQuery1.matches) {
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
}

inputRange.addEventListener("input", () => {
    let scrollingWidth = testimonialsItems.scrollWidth;
    let lastLeftScroll = scrollingWidth - testimonialsItems.offsetWidth,
        inputRangeMax = Math.ceil((lastLeftScroll * 100) / scrollingWidth);
    inputRange.max = inputRangeMax;
    testimonialsItems.scrollLeft = inputRange.value * lastLeftScroll / inputRangeMax;
});

testimonialsItems.addEventListener("scroll", fingerScroll);

function fingerScroll() {
    let scrollingWidth = testimonialsItems.scrollWidth;
    let raz = testimonialsItems.scrollLeft + testimonialsItems.offsetWidth,
        lastLeftScroll = scrollingWidth - testimonialsItems.offsetWidth,
        inputRangeMax = Math.ceil((lastLeftScroll * 100) / scrollingWidth);
    inputRange.max = inputRangeMax;

    const leftScroll = Math.ceil((testimonialsItems.scrollLeft * 100) / scrollingWidth);

    if (raz == scrollingWidth) {
        inputRange.value = inputRangeMax;
    } else {
        inputRange.value = leftScroll;
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
    const mediaQuerySlider = window.matchMedia("(min-width: 640px)")

    let index = 1,
        widthSlides = 0;
    const container = document.querySelector(".slider"),
        slidesBox = document.querySelector(".slider-inner"),
        slides = document.querySelectorAll(".animals__items"),
        buttons = document.querySelectorAll(".buttons_circle");
        

    function resizeSlider() {
        if (mediaQuerySlider.matches) {
            widthSlides = container.offsetWidth;
            slidesBox.style.transform = "translateX(" + (-index*widthSlides) + "px)";
        }
    }

    resizeSlider();

    buttons.forEach(item => {    
        function slider() {
            slidesBox.style.transform = "translateX(" + (-index * widthSlides) + "px)";
            slidesBox.style.transition = "transform 1s ease-in-out";
        }
        item.addEventListener("click", (EO) => {
            var arr = [];
            while(arr.length < 6){
                var r = Math.floor(Math.random() * 6) + 1;
                if(arr.indexOf(r) === -1){
                    arr.push(r);
                }
            }
            function generateCard(num){
                slides[num].innerHTML="";
                for(let i = 0; i<6; i++){
                    slides[num].innerHTML += `
                    <div class="animals__item">
                        <div class="animals__item__img">
                            <img src="assets/images/image${arr[i]}.png" alt="pandas">
                            <div></div>
                        </div>
                        <div class="animals__item__content">
                            <div class="animals__item__content__title">
                                <span>Giant Pandas</span><br>
                                Native to Southwest China
                            </div>
                            <div class="animals__item__content__img animals__item__content__img_banana">
                                <img src="assets/icons/banana-bamboo_icon.png" alt="banana-bamboo">
                            </div>
                        </div>
                    </div>
                `;
                }
            }
    
            if (EO.target.classList.contains("buttons_circle_left") ||
                EO.target.parentNode.classList.contains("buttons_circle_left")) {
                index <= 0 ? false : index--;
                generateCard(0);
                slider();
            } else if (EO.target.classList.contains("buttons_circle_right") ||
                EO.target.parentNode.classList.contains("buttons_circle_right")) {
                index >= slides.length - 1 ? false : index++;
                generateCard(2);
                slider();
            }
            setTimeout(()=>{generateCard(1)},1000); 
        });
    });


    slidesBox.addEventListener('transitionend', () => {
      setTimeout(()=>{
        if (index == slides.length - 1) {
            index = 1;
            slidesBox.style.transition = "none";
            slidesBox.style.transform = "translateX(" + (-index * widthSlides) + "px)";
        } else if (index == 0) {
            index = slides.length - 2;
            slidesBox.style.transition = "none";
            slidesBox.style.transform = "translateX(" + (-index * widthSlides) + "px)";

        }
      },100);
    });

});


var arr = [];
while(arr.length < 6){
    var r = Math.floor(Math.random() * 6) + 1;
    if(arr.indexOf(r) === -1) arr.push(r);
}
