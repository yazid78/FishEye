function attachCarrouselEventListeners() {
  const carrousselImages = document.querySelectorAll(".media_container img");
  carrousselImages.forEach((image, index) => {
    image.addEventListener("click", function () {
      openModal(index);
    });
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

function openModal(index) {
  currentPhotoIndex = index;
  modalImages = Array.from(document.querySelectorAll(".media_container img"));
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