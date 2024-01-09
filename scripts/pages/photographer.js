//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerData(photographerId){

      let reponse = await fetch("../../data/photographers.json");
      let data = await reponse.json();

return  data.photographers.find(p=>p.id === photographerId);
  
}
function displayPhotographerDetails(photographer){
      const detailSection = document.querySelector(".photograph-header");

      const nameElement = document.createElement("h2");
      nameElement.textContent = photographer.name;
      detailSection.appendChild(nameElement);

      const locationElement = document.createElement("p");
      locationElement.textContent = photographer.city + ', ' + photographer.country;
      detailSection.appendChild(locationElement);

      const taglineElement = document.createElement("p");
      taglineElement.textContent = photographer.tagline;
      detailSection.appendChild(taglineElement);

      const picture = "assets/photographers/" + photographer.portrait;
      console.log(picture)
      const imageElement = document.createElement("img");
      imageElement.src = picture;
      detailSection.appendChild(imageElement);


}

function init() {
      const urlParams = new URLSearchParams(window.location.search);
      const photographerId = parseInt (urlParams.get('id'));

      if(photographerId) {
            getPhotographerData(photographerId).then(displayPhotographerDetails)
      }
}

document.addEventListener('DOMContentLoaded' , init)