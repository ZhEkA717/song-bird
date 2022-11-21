function randomWhatBird(arr, num = 0) {
    const whatBirdImg = document.querySelector(".what-bird__img img")
    const whatBirdTitle = document.querySelector(".what-bird .title")
    const audioPlayer = document.querySelector(".what-bird .audio-player");
    const loadingEl = document.querySelector(".what-bird__loading");
    const whatBirdAudio = document.querySelector(".what-bird audio");

    let {audio} = arr[num][randBird(0,5)];

    whatBirdImg.src = "./src/assets/images/bird-hide.jpg";
    whatBirdTitle.innerHTML = `******`;
    whatBirdAudio.src = audio;

    whatBirdAudio.oncanplay = () => {
        audioPlayer.style.display = "flex";
        loadingEl.style.display = "none";
        whatBirdAudio.oncanplay = "";
    }

    function randBird(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

module.exports = randomWhatBird;