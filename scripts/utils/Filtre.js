const sortSelect = document.getElementById("sortSelect");

sortSelect.addEventListener("change", () => {
  const selectedSort = sortSelect.value;

  const existingPhotosContainer = document.getElementById("effacer");
  if (existingPhotosContainer) {
    existingPhotosContainer.remove();
  }

  photographerService
    .getInfoPhotographer(idPhotographer, selectedSort)
    .then(({ photographer, medias }) => {
      const photographerMedias = new PhotographerMedias(photographer, medias);

      photographerMedias.createPhotographerMedias();

      attachCarrouselEventListeners();
    })
    .catch((error) => {
      console.error("Une erreur s'est produite:", error);
    });
});