const sortSelect = document.getElementById("sortSelect");

// Ajouter un écouteur d'événements pour le changement dans le menu déroulant
sortSelect.addEventListener("change", () => {
  const selectedSort = sortSelect.value;
  applySort(selectedSort);
  
  // Sélection de la flèche
  const arrow = document.querySelector(".select-arrow");
  
  // Ajouter ou supprimer la classe "down" en fonction de la sélection
  arrow.classList.toggle("down", selectedSort !== "");
});

// Fonction pour appliquer le tri
function applySort(selectedSort) {
  if (selectedSort) {
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
  }
}
