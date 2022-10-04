// Burger menu
const humburger = document.querySelector(".humburger"),
    closeBurger = document.querySelector(".close-burger"),
    openBurMenu = document.querySelector(".open-bur-menu"),
    popapFon = document.querySelector(".popap-fon");

humburger.addEventListener("click",()=>{
    if(humburger.classList.contains("humburger_active")){
        openBurMenu.classList.remove("open-bur-menu_active");
        popapFon.classList.remove("popap-fon_active");
    }else{
        openBurMenu.classList.add("open-bur-menu_active");
        popapFon.classList.add("popap-fon_active");
        document.body.style.overflow = "hidden";
    }
});

[closeBurger,popapFon].forEach(item=>{
    item.addEventListener("click",(e)=>{
        if(e.target.classList.contains('popap-fon') || e.target.classList.contains('close-burger')){
            openBurMenu.classList.remove("open-bur-menu_active");
            popapFon.classList.remove("popap-fon_active");
            document.body.style.overflow = "scroll";
        }
    });
});


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
});
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
    });
});
