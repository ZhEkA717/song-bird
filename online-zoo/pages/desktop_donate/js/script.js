// Burger menu
const humburger = document.querySelector(".humburger"),
    closeBurger = document.querySelector(".close-burger"),
    openBurMenu = document.querySelector(".open-bur-menu"),
    popapFon = document.querySelector(".popap-fon");

humburger.addEventListener("click", () => {
    if (humburger.classList.contains("humburger_active")) {
        openBurMenu.classList.remove("open-bur-menu_active");
        popapFon.classList.remove("popap-fon_active");
    } else {
        openBurMenu.classList.add("open-bur-menu_active");
        popapFon.classList.add("popap-fon_active");
        document.body.style.overflow = "hidden";
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


// Change active element in amount (3 right)
const pickAndFeedDots = document.querySelectorAll(".pick-and-feed__amount__dot"),
    pickAndFeedPrices = document.querySelectorAll(".pick-and-feed__amount__price");

const mediaQuery1 = window.matchMedia('(min-width: 1200px)'),
    mediaQuery2 = window.matchMedia('(max-width: 1200px)'),
    mediaQuery3 = window.matchMedia('(max-width: 1000px)'),
    mediaQuery4 = window.matchMedia('(max-width: 800px)');

function add(num, el, cls) {
    el.forEach((item, i) => {
        if (i === num) {
            el.forEach(item => {
                if (item.classList.contains(cls)) {
                    item.classList.remove(cls);
                }
            })
            item.classList.add(cls);
        }
    });
}

function handleDesktop(e, num) {
    if (e.matches) {
        add(num, pickAndFeedDots, "pick-and-feed__amount__dot_active");
        add(num, pickAndFeedPrices, "pick-and-feed__amount__price_active")
    }
}
handleDesktop(mediaQuery1, 5);
handleDesktop(mediaQuery2, 5);
handleDesktop(mediaQuery3, 5);
handleDesktop(mediaQuery4, 5);

// window.addEventListener("resize", () => {
//     handleDesktop(mediaQuery1, 5);
//     handleDesktop(mediaQuery2, 5);
//     handleDesktop(mediaQuery3, 5);
//     handleDesktop(mediaQuery4, 5);
// });

const inputNumber = document.querySelector("input[type=number]");
[pickAndFeedDots, pickAndFeedPrices].forEach(item => {
    item.forEach((item, i) => {
        function deleteActiveAmount() {
            const actCircleElem = document.querySelector(".pick-and-feed__amount__dot_active"),
                actAmountElem = document.querySelector(".pick-and-feed__amount__price_active");
            if (!item.classList.contains("pick-and-feed__amount__dot_active") || !item.classList.contains("pick-and-feed__amount__price_active")) {
                actCircleElem.classList.remove("pick-and-feed__amount__dot_active");
                actAmountElem.classList.remove("pick-and-feed__amount__price_active");
            }
        }
        item.addEventListener('click', () => {
            deleteActiveAmount();
            pickAndFeedDots[i].classList.add("pick-and-feed__amount__dot_active");
            pickAndFeedPrices[i].classList.add("pick-and-feed__amount__price_active");

            let amount = pickAndFeedPrices[i].innerHTML;
            inputNumber.value = amount;

        });
    });
});

inputNumber.addEventListener("input", () => {

    function deleteElementActive() {
        const actCircleElem = document.querySelector(".pick-and-feed__amount__dot_active"),
            actAmountElem = document.querySelector(".pick-and-feed__amount__price_active");

        actCircleElem.classList.remove("pick-and-feed__amount__dot_active");
        actAmountElem.classList.remove("pick-and-feed__amount__price_active");
    }

    function addElementActive(num) {
        let i = num;
        [pickAndFeedDots, pickAndFeedPrices].forEach(item => {
            item.forEach((item) => {
                pickAndFeedDots[i].classList.add("pick-and-feed__amount__dot_active");
                pickAndFeedPrices[i].classList.add("pick-and-feed__amount__price_active");
            });
        });
    }
    const mediaQuery5 = window.matchMedia('(min-width: 1000px)'),
    mediaQuery6 = window.matchMedia('(min-width: 800px)');
    switch (inputNumber.value) {
        case "25":
            deleteElementActive();
            addElementActive(7);
            break;
        case "50":
            deleteElementActive();
            addElementActive(6);
            break;
        case "100":
            deleteElementActive();
            addElementActive(5);
            break;
        case "250":
            deleteElementActive();
            addElementActive(4);
            break;
        case "500":
            deleteElementActive();
            addElementActive(3);
            break;
        case "1000":
            if (mediaQuery6.matches) {
                deleteElementActive();
                addElementActive(2);
            }
            break;
        case "2000":
            if (mediaQuery5.matches) {
                deleteElementActive();
                addElementActive(1);
            }
            break;
        case "5000":
            if (mediaQuery1.matches) {
                deleteElementActive();
                addElementActive(0);
            }
            break;
        default:
            deleteElementActive();
            addElementActive(5);
    }
});
