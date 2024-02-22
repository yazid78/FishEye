function attachCarrouselEventListeners() {
  const carrousselImages = document.querySelectorAll(".media_container img, .media_container video");
  carrousselImages.forEach((image, index) => {
    image.addEventListener("click", function () {
      openModal(index);
    });
    image.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        openModal(index);
      }
    });
    // Ajout d'un attribut tabindex pour permettre à l'élément d'être focus
    image.setAttribute("tabindex", "0");
  });
}

photographerService.getInfoPhotographer(idPhotographer).then(() => {
  attachCarrouselEventListeners();
})
.catch((error) => {
  console.error("Une erreur s'est produite:", error);
});

let currentPhotoIndex = 0;
let modalImages = [];

function openModal (index) {
  currentPhotoIndex = index;
  modalImages = Array.from(document.querySelectorAll(".media_container img, .media_container video"));
  const modal = document.querySelector(".modal_carroussel");
  const modalContent = document.querySelector(".modal-content");

  modalContent.innerHTML = '';

  const selectedMedia = modalImages[currentPhotoIndex];
  let mediaElement;

  if (selectedMedia.tagName === "IMG") {
    mediaElement = document.createElement("img");
    mediaElement.src = selectedMedia.src;
    mediaElement.alt = selectedMedia.alt;
  } else if (selectedMedia.tagName === "VIDEO") {
    mediaElement = document.createElement("video");
    mediaElement.setAttribute("aria-label", "Woman doing aerial tricks suspended by one arm");
    const sources = selectedMedia.querySelectorAll("source");
    if (sources.length > 0) {
      sources.forEach(source => {
        const newSource = document.createElement("source");
        newSource.src = source.src;
        newSource.type = source.type;
        mediaElement.appendChild(newSource);
      });
    } else {
      mediaElement.src = selectedMedia.src;
    }
    mediaElement.controls = true;
    mediaElement.autoplay = true;
  }

  modalContent.appendChild(mediaElement);
  modal.style.display = "block";
}

function closeCarroussel () {
  const modal = document.querySelector(".modal_carroussel");
  modal.style.display = "none";
}

function changePhoto (offset) {
  currentPhotoIndex += offset;
  if (currentPhotoIndex < 0) {
    currentPhotoIndex = modalImages.length - 1;
  } else if (currentPhotoIndex >= modalImages.length) {
    currentPhotoIndex = 0;
  }

  const modalContent = document.querySelector(".modal-content");
  modalContent.innerHTML = '';

  const selectedMedia = modalImages[currentPhotoIndex];
  let mediaElement;

  if (selectedMedia.tagName === "IMG") {
    mediaElement = document.createElement("img");
    mediaElement.src = selectedMedia.src;
    mediaElement.alt = selectedMedia.alt;
  } else if (selectedMedia.tagName === "VIDEO") {
    mediaElement = document.createElement("video");
    mediaElement.setAttribute("aria-label", "Woman doing aerial tricks suspended by one arm");
    const sources = selectedMedia.querySelectorAll("source");
    if (sources.length > 0) {
      sources.forEach(source => {
        const newSource = document.createElement("source");
        newSource.src = source.src;
        newSource.type = source.type;
        mediaElement.appendChild(newSource);
      });
    } else {
      mediaElement.src = selectedMedia.src;
    }
    mediaElement.controls = true;
    mediaElement.autoplay = true;
  }

  modalContent.appendChild(mediaElement);
}

document.addEventListener("keydown", function (event) {
  if (event.key === " " || event.key === "Escape") {
    closeCarroussel();
  } else if (event.key === "ArrowLeft") {
    changePhoto(-1);
  } else if (event.key === "ArrowRight") {
    changePhoto(1);
  }
});
