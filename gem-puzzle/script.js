alert("Не успел доделать adaptive и drag&drop, проверь позже или перепроверь в конце кроссчек")

const tableRecord = document.createElement("div");
const closeTableRec = document.createElement("div");
const innertableRec = document.createElement("div");
const records = document.createElement("div");

tableRecord.id = "tableRec";
closeTableRec.id = "closeTableRec";
innertableRec.id = "innertableRec";
records.id = "records";

innertableRec.append(records);

tableRecord.append(closeTableRec);
tableRecord.append(innertableRec);

document.body.append(tableRecord);

closeTableRec.innerHTML = "&times;";

const wrapper = document.createElement("div");
wrapper.classList.add(".wrapper");
document.body.prepend(wrapper);

function createRandomArray(size) {
    // let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,15];
    let arr = [];
    while (arr.length < size * size) {
        let r = Math.floor(Math.random() * size * size);
        if (arr.indexOf(r) === -1) {
            arr.push(r);
        }
    }
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != 0) {
            let el = arr[i];
            for (let j = i + 1; j < arr.length; j++) {
                if (el > arr[j] && arr[j] != 0) {
                    sum++;
                }
            }
        }
    }
    return sum % 2 ? createRandomArray(size) : arr;
}

function createField(size, fieldSize) {
    let arr = createRandomArray(size);

    const field = document.createElement('div');
    let count = 0;
    field.classList.add("field");
    field.style.width = fieldSize + "px";
    field.style.height = fieldSize + "px";
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.innerHTML = arr[count];
            cell.style.top = (0 + i * fieldSize / size) + 'px';
            cell.style.left = (0 + j * fieldSize / size) + "px";
            cell.style.width = fieldSize / size + "px";
            cell.style.height = fieldSize / size + "px";
            field.append(cell);
            count++;
        }
    }
    const fieldBlock = document.createElement("div");
    fieldBlock.classList.add("field-block");
    field.append(fieldBlock);
    return field;
}

function addFieldInPage(size, fieldSize) {
    let field = document.querySelector(".field")
    if (field) {
        wrapper.innerHTML = "";
        wrapper.append(createField(size, fieldSize));
    } else {
        wrapper.append(createField(size, fieldSize));
    }

    const cells = document.querySelectorAll(".cell");

    cells.forEach(item => {
        if (item.innerHTML === "0") {
            item.classList.add("empty-cell");
            item.innerHTML = "";
        }

        if (!item.classList.contains("empty-cell")) {
            item.style.outline = "1px solid black";
        }
    });
    return size;
}

addFieldInPage(4, 700);

function findChildEmptyCeil(size) {
    const cells = document.querySelectorAll(".cell");
    const cell = document.querySelector(".empty-cell");

    const fieldArr = [];
    let arr = [];

    for (let i = 0; i < cells.length; i++) {
        arr.push(cells[i]);
        if (arr.length === size) {
            fieldArr.push(arr);
            arr = [];
        }
    }

    let prevChild = null,
        nextChild = null,
        upChild = null,
        downChild = null;
    let a = fieldArr,
        n = m = size;

    function isValidPos(i, j, n, m) {
        return (i < 0 || j < 0 || i > n - 1 || j > m - 1) ? 0 : 1;
    }

    for (let i = 0; i < fieldArr.length; i++) {
        for (let j = 0; j < fieldArr[i].length; j++) {
            if (a[i][j] == cell) {
                if (isValidPos(i, j + 1, n, m)) {
                    nextChild = a[i][j + 1];
                }
                if (isValidPos(i + 1, j, n, m)) {
                    downChild = a[i + 1][j];
                }
                if (isValidPos(i - 1, j, n, m)) {
                    upChild = a[i - 1][j];
                }
                if (isValidPos(i, j - 1, n, m)) {
                    prevChild = a[i][j - 1];
                }
            }
        }
    }
    return {
        prevChild,
        nextChild,
        upChild,
        downChild
    };
}

let audioCell = new Audio();
audioCell.src = "audio-cell.mp3";

wrapper.addEventListener("click", funMovingCell);
function funMovingCell(EO) {
    const cells = document.querySelectorAll(".cell");
    const movesCount = document.querySelector(".moves span");
    let isClicked = true;
    let {
        prevChild,
        nextChild,
        upChild,
        downChild
    } = findChildEmptyCeil(Math.pow(cells.length, 0.5));

    let cell = document.querySelector(".empty-cell"),
        cellTop = cell.offsetTop;
    cellLeft = cell.offsetLeft;
    let elEvent = EO.target,
        elTop = elEvent.offsetTop;
    elLeft = elEvent.offsetLeft;
    let count = +movesCount.innerHTML;
    if (elEvent == prevChild || elEvent == nextChild ||
        elEvent == upChild || elEvent == downChild && isClicked) {

        if (!pauseBtn.classList.contains("stop-active")) {
            eventForStartTimer();
        }

        if (!pauseBtn.classList.contains("stop-active")) {
            pauseBtn.classList.add("stop-active");
        }

        movesCount.innerHTML = ++count;
        isClicked = false;

        elEvent.style.top = cellTop + "px";
        elEvent.style.left = cellLeft + "px";
        elEvent.style.transition = ".2s"

        cell.style.top = elTop + "px";
        cell.style.left = elLeft + "px";

        elEvent.addEventListener("transitionend", funTransitionEnd);

        function funTransitionEnd() {
            const range = document.querySelector(".range");
            if(range.value==10){
                audioCell.play();
            }

            let clonedCell = cell.cloneNode(true);
            let clonedElEvent = elEvent.cloneNode(true);

            elEvent.parentElement.replaceChild(clonedCell, elEvent);
            cell.parentElement.replaceChild(clonedElEvent, cell);

            if (gameOver()) {
                gameOverPopap();
                saveIsEnabled();
            } else {
                saveIsDisabled();
            }
            isClicked = true;
            elEvent.removeEventListener("transitionend", funTransitionEnd);
        };
    }
}


// window.addEventListener("mousedown", cellMouseDown);
// window.addEventListener("mouseup", cellMouseUp);

// let x = 0;
// let y = 0;
// let glob;
// let leftGr;
// let rightGr;
// let upGr;
// let downGr;
// function cellMouseDown(EO) {
//     // wrapper.removeEventListener("mousedown", funMovingCell);
//     EO.preventDefault();
//     const cells = document.querySelectorAll(".cell");
//     let emptyCell = document.querySelector(".empty-cell");

//     let {
//         prevChild,
//         nextChild,
//         upChild,
//         downChild
//     } = findChildEmptyCeil(Math.pow(cells.length, 0.5));
    
//     let cell = EO.target;
//     cell.style.zIndex=99;
//     if(cell == prevChild || cell == nextChild){
//         x = EO.pageX - cell.offsetLeft;
//     }
//     if(cell == upChild || cell == downChild){
//         y = EO.pageY - cell.offsetTop;
//     }
//     window.addEventListener("mousemove", cellMouseMove);
//         leftGr = cell.offsetLeft;
//         rightGr = emptyCell.offsetLeft;
//         upGr = cell.offsetTop;
//         downGr = emptyCell.offsetTop;
//     function cellMouseMove(EO) {
//         EO.preventDefault();
//         if(cell == prevChild){
//             if(EO.pageX -x >leftGr && EO.pageX -x < rightGr+1){
//                 cell.style.left = (EO.pageX - x) + 'px';
//             }
//         }else if(cell == nextChild){
//             if(EO.pageX -x < leftGr && EO.pageX -x > rightGr+1){
//                 cell.style.left = (EO.pageX - x) + 'px';
//             }
//         }else if(cell == upChild){
//             if(EO.pageY -y >upGr && EO.pageY -y < downGr){
//                 cell.style.top = (EO.pageY - y) + 'px';
//             }
//         }else if(cell == downChild){
//             if(EO.pageY - y < upGr && EO.pageY -y > downGr){
//                 cell.style.top = (EO.pageY - y) + 'px';
//             }
//         }
//     }
//     glob = cellMouseMove;
// }

// function cellMouseUp(EO) {
//     EO.preventDefault();

//     let left = EO.target.offsetLeft,
//     top = EO.target.offsetTop;

//     const cells = document.querySelectorAll(".cell");
//     const empty = document.querySelector(".empty-cell");
    
//     let {
//         prevChild,
//         nextChild,
//         upChild,
//         downChild
//     } = findChildEmptyCeil(Math.pow(cells.length, 0.5));

//     if(Math.abs(EO.target.offsetLeft-empty.offsetLeft)<=empty.offsetWidth/2 ){
//         left = empty.offsetLeft;
//     }else{
//         if(EO.target == nextChild){
//             left = Math.abs(empty.offsetLeft + empty.offsetWidth);
//         }else{
//             left = Math.abs(empty.offsetLeft - empty.offsetWidth);
//         }
//     }

//     if(Math.abs(EO.target.offsetTop-empty.offsetTop)<=empty.offsetHeight/2){
//         top = empty.offsetTop;
//     }else{
//         if(EO.target == downChild){
//             top = Math.abs(empty.offsetTop + empty.offsetHeight);
//         }else{
//             top = Math.abs(empty.offsetTop - empty.offsetHeight);
//         }
//     }


//     if (EO.target == prevChild || EO.target == nextChild ||
//         EO.target == upChild || EO.target == downChild) {
//         EO.target.style.left = left + "px";
//         EO.target.style.top = top + "px";
//     }

    
//     window.removeEventListener('mousemove', glob);
// }

const menu = document.createElement("div");
const shuffle = document.createElement("div");
stop = document.createElement("div"),
    save = document.createElement("div"),
    result = document.createElement("div");

menu.classList.add("menu");
shuffle.classList.add("shuffle");
stop.classList.add("stop");
save.classList.add("save");
result.classList.add("result");

menu.prepend(result);
menu.prepend(save);
menu.prepend(stop);
menu.prepend(shuffle);

document.body.prepend(menu);

shuffle.innerHTML = "Shuffle and restart";
stop.innerHTML = "Stop";
save.innerHTML = "Save";
result.innerHTML = "Results";

const movesAndTime = document.createElement("div");
const moves = document.createElement("div"),
    time = document.createElement("div");


movesAndTime.classList.add("movesAndTime");
moves.classList.add("moves");
time.classList.add("time-block");

movesAndTime.prepend(time);
movesAndTime.prepend(moves);

document.body.prepend(movesAndTime);

moves.innerHTML = "Moves:<span>0</span>";
time.innerHTML = "Time:<span class='time minute'>00</span>:<span class ='time second'>00</span>";

const otherSize = document.createElement("div");
otherSize.classList.add("other-size");

document.body.prepend(otherSize);

otherSize.innerHTML = `Other size:  <span>3&times;3</span>  <span class="other-size_active">4&times;4</span>  <span>5&times;5</span>  <span>6&times;6</span>  <span>7&times;7</span>  <span>8&times;8</span>`;

const sound = document.createElement("div");
sound.classList.add("sound");
otherSize.append(sound);
sound.innerHTML = ` <input class="range" type="range"  min="0" max="10" value="10"
step="1">`;

otherSize.addEventListener("mouseup", (e) => {
   if (e.target.classList.contains("range")) {
       if (e.target.value > 5) {
           e.target.value = 10;
       } else if (e.target.value <= 5) {
           e.target.value = 0;
       }
   }
});


shuffle.addEventListener("click", funShuffleAndRestart)

function funShuffleAndRestart() {
    const field = document.querySelector(".field");
    const cells = document.querySelectorAll(".cell");
    const size = Math.pow(cells.length, 0.5);
    let cellWidth = field.offsetWidth;
    const movesCount = document.querySelector(".moves span");
    movesCount.innerHTML = 0;
    addFieldInPage(size, cellWidth);
    funStopTimer();
    pauseBtnIsDisable();
    saveIsDisabled();
};

const size = document.querySelector(".other-size");

size.addEventListener('click', (e) => {
    e.preventDefault();
    const field = document.querySelector(".field");
    const movesCount = document.querySelector(".moves span");
    if (!e.target.classList.contains("other-size_active") && +e.target.innerHTML[0]) {
        let answer = confirm("Are you sure to resize and restart?");
        if (answer) {
            let activeEl = document.querySelector(".other-size_active");
            activeEl.classList.remove("other-size_active");
            e.target.classList.add("other-size_active");

            movesCount.innerHTML = 0;
            if (e.target.innerHTML[0] === "3") {
                addFieldInPage(3, field.offsetWidth);
            } else if (e.target.innerHTML[0] === "4") {
                addFieldInPage(4, field.offsetWidth);
            } else if (e.target.innerHTML[0] === "5") {
                addFieldInPage(5, field.offsetWidth);
            } else if (e.target.innerHTML[0] === "6") {
                addFieldInPage(6, field.offsetWidth);
            } else if (e.target.innerHTML[0] === "7") {
                addFieldInPage(7, field.offsetWidth);
            } else if (e.target.innerHTML[0] === "8") {
                addFieldInPage(8, field.offsetWidth);
            }
            funStopTimer();
            pauseBtnIsDisable();
            saveIsDisabled();
        }
    }
});

function gameOver() {
    const cells = document.querySelectorAll(".cell");

    let winValues = ""

    switch (cells.length) {
        case 9:
            winValues = "123456780";
            break;
        case 16:
            winValues = "1234567891011121314150";
            break;
        case 25:
            winValues = "1234567891011121314151617181920212223240";
            break;
        case 36:
            winValues = "12345678910111213141516171819202122232425262728293031323334350";
            break;
        case 49:
            winValues = "1234567891011121314151617181920212223242526272829303132333435363738394041424344454647480";
            break;
        case 64:
            winValues = "1234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859606162630";
            break;
    }
    let cellsValues = "";

    cells.forEach(item => {
        if (item.innerHTML === "") {
            cellsValues += "0";
        } else {
            cellsValues += `${item.innerHTML}`;
        }
    })

    return winValues === cellsValues ? true : false;
}


function gameOverPopap() {
    const backgroundPopap = document.createElement("div");
    const popap = document.createElement("div");
    const closePopap = document.createElement("div");
    backgroundPopap.classList.add("background-popap");
    popap.classList.add("popap");
    closePopap.classList.add("close-popap");

    backgroundPopap.append(popap);
    backgroundPopap.append(closePopap);
    document.body.prepend(backgroundPopap);

    const countMoves = document.querySelector(".moves span").innerHTML;
    const minute = document.querySelector(".minute").innerHTML;
    const second = document.querySelector(".second").innerHTML;

    popap.innerHTML = `
    Hooray!<br> 
    You solved the puzzle 
    in <span class="curr-time">${minute}:${second}</span> and <span class="count-moves">${countMoves}</span> moves!
    `;
    closePopap.innerHTML = "&times;";
    funPauseTimer();
    pauseBtnIsDisable();
}


function saveIsEnabled() {
    const save = document.querySelector(".save");
    save.classList.add("save-active");

    const backgroundPopap = document.querySelector(".background-popap");
    backgroundPopap.addEventListener("click", funBackgroundPopapClose);

    function funBackgroundPopapClose(e) {
        e.preventDefault();
        e.currentTarget.remove();
        backgroundPopap.removeEventListener("click", funBackgroundPopapClose);

        const fieldBlock = document.querySelector(".field-block");
        fieldBlock.style.display = "block";
    };
}

function pauseBtnIsDisable() {
    if (pauseBtn.classList.contains("stop-active")) {
        pauseBtn.classList.remove("stop-active");
    }
}

function saveIsDisabled() {
    const save = document.querySelector(".save");
    if (save.classList.contains("save-active")) {
        save.classList.remove("save-active");
    }
}

save.addEventListener("click", (e) => {

    if (save.classList.contains("save-active")) {
        document.querySelector("*").style.cursor = "wait";
        save.style.cursor = "wait";

        setTimeout(() => {
            saveRecord();
            const fieldBlock = document.querySelector(".field-block");
            fieldBlock.style.display = "none";
            saveIsDisabled();
            funShuffleAndRestart();

            document.querySelector("*").style.cursor = "auto";
            save.style.cursor = "";
        }, 1000);
    }

});

// timer

const minuteElement = document.querySelector(".minute");
const secondElement = document.querySelector(".second");

const pauseBtn = document.querySelector(".stop");

function eventForStartTimer() {
    clearInterval(interval);
    interval = setInterval(startTimer, 1000);
}

pauseBtn.addEventListener("click", funPauseTimer)

function funPauseTimer() {
    clearInterval(interval);
    pauseBtn.classList.remove("stop-active");

};

function funStopTimer() {
    clearInterval(interval);
    minute = 00;
    second = 00;
    minuteElement.innerHTML = "00";
    secondElement.innerHTML = "00";
};

let minute = 00,
    second = 00,
    interval;

function startTimer() {
    second++;
    if (second <= 9) {
        secondElement.innerHTML = `0${second}`;
    }
    if (second > 9) {
        secondElement.innerHTML = `${second}`;
    }
    if (second > 59) {
        minute++;
        if (minute <= 9) {
            minuteElement.innerHTML = `0${minute}`;
        }
        if (minute > 9) {
            minuteElement.innerHTML = `${minute}`;
        }
        if (minute == 60) {
            funPauseTimer(); // game over
            alert("Time is over! You lost..");
            funShuffleAndRestart();
        }
        second = 0;
        secondElement.innerHTML = `0${second}`;
    }
}

// save current data in local storage
window.addEventListener("beforeunload", sendDataInLS);

function sendDataInLS() {
    const save = document.querySelector(".save");

    const countState = document.querySelector(".moves span").innerHTML;
    const minuteState = document.querySelector(".minute").innerHTML;
    const secondState = document.querySelector(".second").innerHTML;
    saveState = save.classList.contains("save-active") ? true : false;
    const fieldInnerState = document.querySelector('.field').innerHTML;
    const otherSizeState = document.querySelector(".other-size").innerHTML;

    const gameState = JSON.stringify({
        saveState,
        countState,
        minuteState,
        secondState,
        fieldInnerState,
        otherSizeState
    });

    localStorage.setItem("gameState", gameState);
}

function getDataofLS() {
    const gameState = localStorage.getItem("gameState");
    const {
        saveState,
        countState,
        minuteState,
        secondState,
        fieldInnerState,
        otherSizeState
    } = JSON.parse(gameState);

    const save = document.querySelector(".save"),
        countElement = document.querySelector(".moves span"),
        minuteElement = document.querySelector(".minute"),
        secondElement = document.querySelector(".second"),
        field = document.querySelector(".field"),
        otherSize = document.querySelector(".other-size"),
        sound = document.querySelector(".sound");

    if (saveState) {
        save.classList.add("save-active");
    }

    countElement.innerHTML = countState;
    minuteElement.innerHTML = minuteState;
    minute = +minuteState;
    secondElement.innerHTML = secondState;
    second = +secondState;
    field.innerHTML = fieldInnerState;
    otherSize.innerHTML = otherSizeState;
    sound.innerHTML = ` <input class="range" type="range"  min="0" max="10" value="0"
    step="1">`;
}
getDataofLS();

function saveRecord(){
    const moves = document.querySelector(".moves span").innerHTML,
        minute = document.querySelector(".minute").innerHTML,
        second = document.querySelector(".second").innerHTML,
        sizeState = document.querySelector(".other-size_active").innerHTML;
    
    const recordState = {
        moves,
        minute,
        second,
        sizeState
    };

    let recordsArr;
    if(localStorage.recordState){
        recordsArr = JSON.parse(localStorage.getItem("recordState"));

    }else{
        recordsArr=[];
    }   

    recordsArr.push(recordState);

    localStorage.setItem("recordState",JSON.stringify(recordsArr));
}

function sortLocalStorageArr(arr) {
   if(arr){
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (+arr[j + 1].moves < +arr[j].moves) {
                let t = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = t;
            }
            
            if (+arr[j + 1].moves === +arr[j].moves) {
                if (+arr[j + 1].sizeState[0] > +arr[j].sizeState[0]) {
                    let t = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = t;
                }
            }

            if (+arr[j + 1].moves === +arr[j].moves && 
                +arr[j+1].sizeState[0] === +arr[j].sizeState[0]) {
                let l = +arr[j+1].minute*60 + +arr[j+1].second;
                let r = +arr[j].minute*60 + +arr[j].second;
                if (l < r) {
                    let t = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = t;
                }
            }
        }
    }
    return arr;
   }else{
    return false;
   }
}

function showTableRecord() {
    const mas = sortLocalStorageArr(JSON.parse(localStorage.getItem("recordState")));
    if (mas && mas.length<10) {
        for (let i = 0; i < mas.length; i++) {
            var divBox = document.createElement('div');
            divBox.classList.add('delBox');
            divBox.style.position = 'relative';
            divBox.style.display = 'flex';
            divBox.style.alignItems = 'center';
            divBox.style.paddingLeft = 20 + 'px';
            divBox.style.marginBottom = 20 + 'px';
        
            var divCircle = document.createElement('div');
            divCircle.style.position = 'absolute';
            divCircle.style.width = 60 + 'px';
            divCircle.style.height = 60 + 'px';
            divCircle.style.borderRadius = 50 + '%';
            divCircle.style.border = '2px solid black';
            if(i>2){
                if (i % 2) {
                    divCircle.style.backgroundColor = "pink";
                }else{
                    divCircle.style.backgroundColor = "rgb(99, 153, 99)";
                }
            }else if(i===0){
                divCircle.style.backgroundColor = "#ffd700";
            }else if(i===1){
                divCircle.style.backgroundColor = "#C0C0C0";
            }else if(i===2){
                divCircle.style.backgroundColor = "#8C7853";
            }
            divCircle.style.display = 'flex';
            divCircle.style.alignItems = 'center';
            divCircle.style.justifyContent = 'center';
            divCircle.style.fontSize = 22 + 'px';
            divCircle.innerHTML = i + 1;
    
            var divRec = document.createElement('div');
            divRec.id = 'divRec';
            if(i>2){
                if (i % 2) {
                    divRec.style.background = 'linear-gradient(90deg,' + "pink" + ' 0%,rgba(0, 0, 0, 0) 100% )';
                } else{
                    divRec.style.background = 'linear-gradient(90deg,' + "rgb(99, 153, 99)" + ' 0%,rgba(0, 0, 0, 0) 100% )';
                }
            }else if(i===0){
                divRec.style.background = 'linear-gradient(90deg,' + "#ffd700" + ' 0%,rgba(0, 0, 0, 0) 100% )';
            }else if(i===1){
                divRec.style.background = 'linear-gradient(90deg,' + "#C0C0C0" + ' 0%,rgba(0, 0, 0, 0) 100% )';
            }else if(i===2){
                divRec.style.background = 'linear-gradient(90deg,' + "#8C7853" + ' 0%,rgba(0, 0, 0, 0) 100% )';
            }
            divRec.style.width = 90 + '%';
            divRec.style.height = 47 + 'px';
            divRec.style.marginLeft = 45 + 'px';
            divRec.style.paddingLeft = 35 + 'px';
            divRec.style.display = 'flex';
            divRec.style.alignItems = 'center';
            divRec.innerHTML = `
                <img style = "margin-right:10px" width="30" src="tap.png">${mas[i].moves}
                 &#9200; ${mas[i].minute}:${mas[i].second} 	
                &#128270; ${mas[i].sizeState}`; //nik
    
            divBox.appendChild(divCircle);
            divBox.appendChild(divRec);
            records.appendChild(divBox);
        }
    }else{
        records.innerHTML = 
        `<div class='no-data'>
        No saving records. 
        Play and save record!
        </div>`;
    }

}
const resultBtn = document.querySelector(".result");

resultBtn.addEventListener("click",()=>{
    const table = document.querySelector("#tableRec");
    if(!table.classList.contains("done")){
        table.classList.add("done");
        showTableRecord();
    }
   const closeTableRec = document.querySelector("#closeTableRec");
   const innertableRec =document.querySelector("#innertableRec");
    closeTableRec.style.top = innertableRec.offsetTop - 10 + "px";
    closeTableRec.style.left = innertableRec.offsetLeft + innertableRec.offsetWidth + 10 + "px";


})

const tableRec =document.querySelector("#tableRec");

tableRec.addEventListener("click",(e)=>{
    const table = document.querySelector("#tableRec"),
    records = document.querySelector("#records"),
    closeTableRec = document.querySelector("#closeTableRec");

    if(e.target === table || e.target === closeTableRec){
        setTimeout(() => {
            records.innerHTML = "";
        }, 500);
        table.classList.remove("done");
    }
});


const m727 = window.matchMedia('(max-width: 727px)');

window.addEventListener("resize",()=>{
    if(m727.matches){
        addFieldInPage(4, 600);
    }else{
        addFieldInPage(4, 700);

    }
})