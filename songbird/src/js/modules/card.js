function createCard(selector,image,name,species,description,audio){
   const imageEl = document.querySelector(`${selector} .card__player__image img`),
        nameEl = document.querySelector(`${selector} .card__player__audio .title`),
        speciesEl = document.querySelector(`${selector} .card__player__audio .species`),
        descriptionEl = document.querySelector(`${selector} .card__descr`),
        audioEl = document.querySelector(`${selector} .audio-player_answer audio`);

        imageEl.src = image;
        nameEl.innerHTML = name;
        speciesEl.innerHTML = species;
        descriptionEl.innerHTML = description; 
        audioEl.src = audio;
}

module.exports = createCard;