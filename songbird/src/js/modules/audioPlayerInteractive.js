function audioPlayerInteractive(audioSelector) {
    const inputRangeTime = document.querySelector(`${audioSelector} .audio-player__time-range input`);
    const inputRangeVolume = document.querySelector(`${audioSelector} .audio-player__volume__range input`);
    const volumeIcon = document.querySelector(`${audioSelector} .audio-player__volume__svg`);
    const min = document.querySelector(`${audioSelector} .m0`),
        avr = document.querySelector(`${audioSelector} .m5`),
        minNone = document.querySelector(`${audioSelector} .m0-none`);

    inputRangeTime.addEventListener("input", (e) => {
        let value = e.target.value;
        inputRangeTime.style.backgroundImage = `linear-gradient(to right, #008966 ${value}%, rgba(255, 255, 255, 0) ${value}%)`;
    });

    inputRangeVolume.addEventListener("input", (e) => {
        let value = e.target.value;

        inputRangeVolume.style.backgroundImage = `linear-gradient(to right, #fff ${value*10}%, rgba(255, 255, 255, 0) ${value*10}%)`;
        inputRangeVolume.style.backgroundColor = "#555";

        min.style.transition = "1s";
        avr.style.transition = "1s";

        if (value <= 6 && value >= 3) {
            avr.style.opacity = 0;
            min.style.opacity = 1;
            minNone.style.opacity = 0;
        }
        if (value < 3) {
            min.style.opacity = 0;
            avr.style.opacity = 0;
            minNone.style.opacity = 0;
        }
        if (value > 6) {
            min.style.opacity = 1;
            avr.style.opacity = 1;
            minNone.style.opacity = 0;
        }

        if (inputRangeVolume.value == 0) {
            min.style.opacity = 1;
            avr.style.opacity = 1;
            minNone.style.opacity = 1;
        } else if(inputRangeVolume.value == 10) {
            minNone.style.opacity = 0;
            min.style.opacity = 1;
            avr.style.opacity = 1;
        }
    });

    inputRangeVolume.addEventListener("dragstart",(e)=>{
        e.preventDefault();
    });

    volumeIcon.addEventListener("click", (e) => {
        e.preventDefault();
        let value = inputRangeVolume.value;

        inputRangeVolume.style.backgroundImage = "";

        if (inputRangeVolume.value >= 5) {
            inputRangeVolume.value = 0;
            minNone.style.opacity = 1;
            inputRangeVolume.style.backgroundColor = "#555";
        } else {
            inputRangeVolume.value = 10;
            minNone.style.opacity = 0;
            min.style.opacity = 1;
            avr.style.opacity = 1;
            inputRangeVolume.style.backgroundColor = "#fff";
        }
    });
}

module.exports = audioPlayerInteractive;
