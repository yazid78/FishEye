const sortSelect = document.getElementById("sortSelect");

sortSelect.addEventListener("change", () => {
  const selectedSort = sortSelect.value;

  // Obtenez les informations du photographe avec le tri sélectionné
  photographerService.getInfoPhotographer(idPhotographer, selectedSort)
    .then(({ photographer, medias }) => {
      // Instanciation de la classe PhotographerMedias avec les médias triés
      const photographerMedias = new PhotographerMedias(photographer, medias);
      


      // Créez et affichez les nouveaux médias triés
      photographerMedias.createPhotographerMedias();
    })
    .catch(error => {
      console.error('Une erreur s\'est produite:', error);
    });
});
