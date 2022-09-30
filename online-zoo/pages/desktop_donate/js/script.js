// Burger menu
const humburger = document.querySelector(".humburger"),
    openBurMenu = document.querySelector(".open-bur-menu");
humburger.addEventListener("click", () => {
    if (humburger.classList.contains("humburger_active")) {
        humburger.classList.remove("humburger_active");
        openBurMenu.classList.remove("open-bur-menu_active");
    } else {
        humburger.classList.add("humburger_active");
        openBurMenu.classList.add("open-bur-menu_active");
    }
})

// Change active element in amount 
const pickAndFeedDots = document.querySelectorAll(".pick-and-feed__amount__dot"),
    pickAndFeedPrices = document.querySelectorAll(".pick-and-feed__amount__price");

const mediaQuery1 = window.matchMedia('(min-width: 1200px)'),
      mediaQuery2 = window.matchMedia('(max-width: 1200px)'),
      mediaQuery3 = window.matchMedia('(max-width: 1000px)'),
      mediaQuery4 = window.matchMedia('(max-width: 800px)');

function add(num,el,cls){
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
        add(num,pickAndFeedDots,"pick-and-feed__amount__dot_active");
        add(num,pickAndFeedPrices,"pick-and-feed__amount__price_active")
    }
}
handleDesktop(mediaQuery1, 2);
handleDesktop(mediaQuery2, 2);
handleDesktop(mediaQuery3, 3);
handleDesktop(mediaQuery4, 5);

window.addEventListener("resize", () => {
    handleDesktop(mediaQuery1, 2);
    handleDesktop(mediaQuery2, 2);
    handleDesktop(mediaQuery3, 3);
    handleDesktop(mediaQuery4, 5);
})
// hover amount
pickAndFeedDots.forEach((item,i)=>{
    let amountEl = pickAndFeedPrices[i];
    item.addEventListener('mouseover',()=>{
        if(!(amountEl.classList.contains("pick-and-feed__amount__price_active"))){
            amountEl.classList.add("pick-and-feed__amount__price_active");
        }
    })
    item.addEventListener("mouseout",()=>{
        if(amountEl.classList.contains("pick-and-feed__amount__price_active") && !item.classList.contains("pick-and-feed__amount__dot_active") ){
            amountEl.classList.remove("pick-and-feed__amount__price_active");
        }
    })
})
