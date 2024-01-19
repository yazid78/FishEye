//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerData(Idphotographer) {
  let reponse = await fetch("../../data/photographers.json", {
    method: "GET",
    mode: "cors",
  });
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
      const mediaContainer = document.createElement("div");
      const InformationsContainer = document.createElement("div");
      InformationsContainer.classList.add("Informations");

      const photo = document.createElement("img");
      photo.src = mediaSource;

      const titleElement = document.createElement("h2");
      titleElement.textContent = media.title;
      titleElement.id = "title";
      const priceElement = document.createElement("h2");
      priceElement.textContent = media.price + "€";
      priceElement.id = "price";

      const likesElement = document.createElement("h2");
      likesElement.innerHTML = media.likes + '<i class="fas fa-heart"></i>';
      let a = media.likes;
      let rouge = likesElement.querySelector(".fas.fa-heart")
      let b = rouge.style.color ='red'
      console.log("ok ok");
      const heartIcon = likesElement.querySelector(".fas.fa-heart");
      console.log(heartIcon);
      heartIcon.addEventListener("click", function () {
       a++;
      console.log(a);
      likesElement.innerHTML = media.likes + b;
      });
      console.log(media.image);

      mediaContainer.appendChild(photo);
      InformationsContainer.appendChild(titleElement);
      InformationsContainer.appendChild(priceElement);
      InformationsContainer.appendChild(likesElement);

      photosContainer.appendChild(mediaContainer);
      mediaContainer.appendChild(InformationsContainer);

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
//CAROUSSEL//
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

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeCarroussel();
  } else if (event.key === "ArrowLeft") {
    changePhoto(-1);
  } else if (event.key === "ArrowRight") {
    changePhoto(1);
  }
});

//filtre//

const sortSelect = document.getElementById("sortSelect");
let images = document.querySelectorAll(".photographer_photos img");

sortSelect.addEventListener("change", () => {
  const selectedValue = sortSelect.value;

  if (selectedValue === "Popularité") {
    console.log("Trier par popularité ici");
  } else if (selectedValue === "date") {
    console.log("Trier par date ici");
  } else if (selectedValue === "title") {
    console.log("Trier par titre ici");
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
