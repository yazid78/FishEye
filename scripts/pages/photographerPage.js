
let photographerService = new PhotographerService();
let idPhotographer = new URLSearchParams(window.location.search).get("id");

photographerService.getInfoPhotographer(idPhotographer)
    .then(({ photographer, medias }) => {
        const photographerHeader = new PhotographerHeader(photographer);
        photographerHeader.createPhotographerHeader();
        const photographerMedias = new PhotographerMedias(photographer, medias);
        photographerMedias.createPhotographerMedias();
       
        
        
    })
    .catch(error => console.error('Error fetching photographer details:', error));
