//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerData(Idphotographer) {
  let reponse = await fetch("../../data/photographers.json");
  let data = await reponse.json();

  const photographer = data.photographers.find((p) => p.id === Idphotographer);

  return photographer;
}
async function displayPhotographerDetails(photographer) {
  const detailSection = document.querySelector(".photograph-header");

  const nameElement = document.createElement("h2");
  nameElement.textContent = photographer.name;
  detailSection.appendChild(nameElement);

  const locationElement = document.createElement("p");
  locationElement.textContent = photographer.city + ", " + photographer.country;
  detailSection.appendChild(locationElement);

  const taglineElement = document.createElement("p");
  taglineElement.textContent = photographer.tagline;
  taglineElement.id = "tagline";
  detailSection.appendChild(taglineElement);

  const picture = "assets/photographers/" + photographer.portrait;
  const imageElement = document.createElement("img");
  imageElement.src = picture;
  detailSection.appendChild(imageElement);

  const photosContainer = document.createElement("div");
  photosContainer.classList.add("photographer_photos");

//Images des photographes
let reponse = await fetch("../../data/photographers.json");
let data = await reponse.json();
const medias = data.media.filter(
  (media) => media.photographerId === photographer.id
);

medias.forEach((media, index) => {
  const mediaSource =
    "assets/" + photographer.name + "/" + (media.image || media.video);

  if (media.image) {
    const photo = document.createElement("img");
    photo.src = mediaSource;
    photosContainer.appendChild(photo);

    // Ajoute un écouteur d'événements "click" à chaque image
    photo.addEventListener("click", function () {
      openModal(index); // Appelle la fonction openModal avec l'index de l'image
    });

  } else if (media.video) {
    const video = document.createElement("video");
    video.src = mediaSource;
    video.controls = true;
    photosContainer.appendChild(video);
  }
});


  const mainSection = document.getElementById("main");
  mainSection.appendChild(photosContainer);


}
let currentPhotoIndex = 0;
let modalImages = [];

function openModal(index) {
  currentPhotoIndex = index;
  modalImages = document.querySelectorAll(".photographer_photos img");
  const modal = document.querySelector(".modal_carroussel");
  const modalImage = document.getElementById("modalImage");
  modalImage.src = modalImages[currentPhotoIndex].src;
  modal.style.display = "block";
}

function closeCarroussel() {
  const modal = document.querySelector(".modal_carroussel");
  modal.style.display = "none";
}

function changePhoto(offset) {
  currentPhotoIndex += offset;
  if (currentPhotoIndex < 0) {
    currentPhotoIndex = modalImages.length - 1;
  } else if (currentPhotoIndex >= modalImages.length) {
    currentPhotoIndex = 0;
  }
  const modalImage = document.getElementById("modalImage");
  modalImage.src = modalImages[currentPhotoIndex].src;
}

// Ajoutez cet écouteur d'événements dans la fonction init
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeCarroussel();
  } else if (event.key === "ArrowLeft") {
    changePhoto(-1);
  } else if (event.key === "ArrowRight") {
    changePhoto(1);
  }
});



function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const Idphotographer = parseInt(urlParams.get("id"));

  if (Idphotographer) {
    getPhotographerData(Idphotographer).then(displayPhotographerDetails);
  }
}

document.addEventListener("DOMContentLoaded", init);
