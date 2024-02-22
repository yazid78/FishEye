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
    // Récupérer l'ID du photographe depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const idPhotographer = urlParams.get("id");

    // Ajouter le paramètre de tri à l'URL
    urlParams.set("tri", selectedSort);
    const newUrl = window.location.pathname + '?' + urlParams.toString();

    // Supprimer le contenu existant
    const existingPhotosContainer = document.getElementById("effacer");
    if (existingPhotosContainer) {
      existingPhotosContainer.remove();
    }

    photographerService
      .getInfoPhotographer(idPhotographer, selectedSort)
      .then(({ photographer, medias }) => {
        const photographerMedias = new PhotographerMedias(photographer, medias);
        photographerMedias.createPhotographerMedias();
        // eslint-disable-next-line
        attachCarrouselEventListeners();
      })
      .catch((error) => {
        console.error("Une erreur s'est produite:", error);
      });

    // Rediriger vers la nouvelle URL avec le paramètre de tri ajouté
    window.history.replaceState({}, '', newUrl);
  }
}
// Sélection du conteneur du filtre


