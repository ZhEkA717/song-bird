function gallery(num = 3) {
  const {
    birdsDataRu,
    birdsDataEn
} = require("../data/choiceLanguage");

const changeLanguage = require("./changeLanguage");
const images = [];
changeLanguage(birdsDataRu,birdsDataEn).forEach(item=>{
    item.forEach(item=>{
      images.push(item.image);
    })
});

  const wallWrapper = document.querySelector(".wall-wrapper");
  const inputRange = document.querySelector('.start-game input[type="range"]');
  const numRows = num;

  const rows = [];
  for (let i = 0; i < numRows; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    rows.push(row);
  }

  const wall = document.getElementById('wall');
  wall.innerHTML="";
  for (let i = 0; i < images.length; i++) {
    let index = i % rows.length;
    let row = rows[index];
    const img = document.createElement('img');
    img.src = images[i];
    row.append(img);
    img.className = "bird-image";
  }

  rows.forEach(function (row) {
    wall.append(row);
  });

  inputRange.addEventListener("mousemove", moveInputRange);
  inputRange.addEventListener("click", clickInputRange);
  inputRange.addEventListener("touchmove", moveInputRange);
  inputRange.addEventListener("touchend", clickInputRange);
  
  wallWrapper.scroll({
    left: 5,
    behavior: "smooth"
  });

  function moveInputRange(){
    let scrollingWidth = wallWrapper.scrollWidth;
    let lastLeftScroll = scrollingWidth - wallWrapper.offsetWidth;
    wallWrapper.scrollLeft = inputRange.value * lastLeftScroll / inputRange.max;
  }
  function clickInputRange(){
    let scrollingWidth = wallWrapper.scrollWidth;
    let lastLeftScroll = scrollingWidth - wallWrapper.offsetWidth;
    wallWrapper.scroll({
      left: inputRange.value * lastLeftScroll / inputRange.max,
      behavior: "smooth"
    });
  }
  

  inputRange.addEventListener("touchstart", () => {
    wallWrapper.removeEventListener("scroll", fingerScroll);
  });
  inputRange.addEventListener("mouseover", () => {
    wallWrapper.removeEventListener("scroll", fingerScroll);
  });


  wallWrapper.addEventListener("touchstart", (EO) => {
    EO.currentTarget.addEventListener("scroll", fingerScroll);
  })
  wallWrapper.addEventListener("mouseover", (EO) => {
    EO.currentTarget.addEventListener("scroll", fingerScroll);
  })

  wallWrapper.addEventListener("scroll", fingerScroll);

  function fingerScroll() {
    let scrollingWidth = wallWrapper.scrollWidth;
    let raz = wallWrapper.scrollLeft + wallWrapper.offsetWidth;
    let lastLeftScroll = scrollingWidth - wallWrapper.offsetWidth;
    const leftScroll = Math.floor((wallWrapper.scrollLeft * 100) / lastLeftScroll);
    if (Number.isInteger(leftScroll)) {
      if (raz == scrollingWidth) {
        inputRange.value = inputRange.max;
      } else {
        inputRange.value = leftScroll;
      }
    }
  }
  fingerScroll();
}

module.exports = gallery;