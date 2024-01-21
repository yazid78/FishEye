async function getPhotographerData(Idphotographer) {
  let reponse = await fetch("http://127.0.0.1:5500/data/photographers.json", {
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

  let reponse = await fetch("http://127.0.0.1:5500/data/photographers.json");
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
      mediaContainer.classList.add("Container")
      const photo = document.createElement("img");
      photo.src = mediaSource;

      const titleElement = document.createElement("h2");
      titleElement.textContent = media.title;
      titleElement.id = "title";
      const priceElement = document.createElement("h2");
      priceElement.textContent = media.price + "€";
      priceElement.id = "price";

      //Likes
      const likesElement = document.createElement("h2");
      likesElement.setAttribute("data-likes", media.likes.toString());
      likesElement.classList.add("like-button");

      const heartIcon = document.createElement("i");
      heartIcon.classList.add("fas", "fa-heart");
      likesElement.appendChild(document.createTextNode(media.likes + " "));
      likesElement.appendChild(heartIcon);

      likesElement.addEventListener("click", () => {
        like(likesElement);
      });

      mediaContainer.appendChild(photo);
      InformationsContainer.appendChild(titleElement);
      InformationsContainer.appendChild(priceElement);
      InformationsContainer.appendChild(likesElement);

      photosContainer.appendChild(mediaContainer);
      mediaContainer.appendChild(InformationsContainer);

      photo.addEventListener("click", function () {
        openModal(index);
      });

    } else if (media.video) {
      const video = document.createElement("video");
      video.src = mediaSource;
      video.controls = true;

      const titleElement = document.createElement("h2");
      titleElement.textContent = media.title;
      titleElement.id = "title";

      const mediaContainer = document.createElement("div");
      const InformationsContainer = document.createElement("div");
      InformationsContainer.classList.add("Informations");
      mediaContainer.classList.add("Container")

      const likesElement = document.createElement("h2");
      likesElement.setAttribute("data-likes", media.likes.toString());
      likesElement.classList.add("like-button");

      const heartIcon = document.createElement("i");
      heartIcon.classList.add("fas", "fa-heart");
      likesElement.appendChild(document.createTextNode(media.likes + " "));
      likesElement.appendChild(heartIcon);
      mediaContainer.appendChild(video);

      likesElement.addEventListener("click", () => {
        like(likesElement);
      });
      
      InformationsContainer.appendChild(titleElement);
      photosContainer.appendChild(mediaContainer);
      InformationsContainer.appendChild(likesElement);
      mediaContainer.appendChild(InformationsContainer);
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
  modalImages = document.querySelectorAll(".Container");
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
    const currentMedia = media.likes[0]; // Remplacez 0 par l'indice du média que vous souhaitez utiliser
    const medialike = currentMedia.likes;
    
    console.log(currentMedia)
    console.log(medialike)

    console.log("Trier par popularité ici");
  } else if (selectedValue === "date") {
    console.log("Trier par date ici");
  } else if (selectedValue === "title") {
    console.log("Trier par titre ici");
  }
});


//init 
function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const Idphotographer = parseInt(urlParams.get("id"));

  if (Idphotographer) {
    getPhotographerData(Idphotographer).then(displayPhotographerDetails);
  }
}


//like function 
function like(element) {
  let likes = parseInt(element.getAttribute("data-likes"));
  let isLiked = element.classList.contains("liked");
  const heartIcon = element.querySelector(".fa-heart");
  console.log(likes);
  console.log(element);
  if (isLiked) {
    likes--;
    heartIcon.style.color = "";
    element.classList.remove("liked");
  } else {
    likes++;
    heartIcon.style.color = "red";
    element.classList.add("liked");
  }

  element.setAttribute("data-likes", likes.toString());
  element.childNodes[0].nodeValue = likes + " "; 
}

document.addEventListener("DOMContentLoaded", init);
