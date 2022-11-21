function restartGame(){
    const restartButton = document.querySelector(".game-over__restart");
    const gameOver = document.querySelector(".game-over");
    const gameOverResult = document.querySelector(".game-over__result span");
    const mainBlock = document.querySelector("main");

    restartButton.addEventListener("click",()=>{
        restart();
    })
    
    function restart(){
        const score = document.querySelector(".score span");
        score.innerHTML = 0;
        gameOverResult.innerHTML = score.innerHTML;
        mainBlock.style.display='block';
        gameOver.style.display="none";
    }
}

module.exports = restartGame;