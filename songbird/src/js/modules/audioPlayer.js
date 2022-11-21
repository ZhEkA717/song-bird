function audioPlayer(src,audioSelector) {
    const audio = document.querySelector(`${audioSelector} audio`),
        playAndPauseBtn = document.querySelector(`${audioSelector} .audio-player__button`),
        image = playAndPauseBtn.querySelector(`${audioSelector} img`),
        audioVolumeRange = document.querySelector(`${audioSelector} .audio-player__volume__range input`),
        inputRangeTime = document.querySelector(`${audioSelector} .audio-player__time-range input`),
        volumeIcon = document.querySelector(`${audioSelector} .audio-player__volume__svg`),
        durationMinute = document.querySelector(`${audioSelector} .time__minute`),
        durationSecond = document.querySelector(`${audioSelector} .time__second`),
        currentMinute = document.querySelector(`${audioSelector} .current-time__minute`),
        currentSecond = document.querySelector(`${audioSelector} .current-time__second`);

    audio.src = src;

    audio.addEventListener("canplay", () => {
        const date = new Date();
        date.setTime(audio.duration * 1000);
        durationMinute.innerHTML = addZero(date.getMinutes());
        durationSecond.innerHTML = addZero(date.getSeconds());
    });

    audio.addEventListener("ended",()=>{
        audio.currentTime = 0;
        pauseAudio();
    })

    playAndPauseBtn.addEventListener('click', (e) => {
        image.className === "play" ? playAudio() : pauseAudio();
    });

    audioVolumeRange.addEventListener("input", (e) => {
        audio.volume = e.target.value ? e.target.value / 10 : 0;
    });

    inputRangeTime.addEventListener("input", (e)=>{
        audio.volume = 0;
        audio.currentTime = e.target.value*audio.duration/100;
    });

    inputRangeTime.addEventListener("mousedown",(e)=>{
        audio.pause();
    });
    
    inputRangeTime.addEventListener("mouseup",(e)=>{
        image.className === "pause"?audio.play():false;
    });

    inputRangeTime.addEventListener("change", (e)=>{
        audio.volume = audioVolumeRange.value/10;
    });
    

    audio.addEventListener("timeupdate", updateProgress);

    function updateProgress(e) {
        const date = new Date();
        const {
            duration,
            currentTime
        } = e.target;
        const progressPercent = Math.ceil((currentTime / duration) * 100);
        date.setTime(currentTime * 1000);
        currentMinute.innerHTML = addZero(date.getMinutes());
        currentSecond.innerHTML = addZero(date.getSeconds());
        inputRangeTime.value = currentTime?progressPercent:0;
        inputRangeTime.style.backgroundImage = `linear-gradient(to right, #008966 ${progressPercent}%, rgba(255, 255, 255, 0) ${progressPercent}%)`;
    }

    volumeIcon.addEventListener("click", () => {
        if (audioVolumeRange.value >= 5) {
            audio.volume = 1;
        } else {
            audio.volume = 0;
        }
    });


    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    function playAudio() {
        image.src = "./src/assets/icons/pause.svg";
        image.classList.remove("play");
        image.classList.add("pause");
        audio.play();
    }

    function pauseAudio() {
        image.src = "./src/assets/icons/play.svg";
        image.classList.remove("pause");
        image.classList.add("play");
        audio.pause();
    }
}

module.exports = audioPlayer;