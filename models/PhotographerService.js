class PhotographerService {
  async getPhotographers() {
    const response = await fetch(
      "data/photographers.json",
      { method: "GET", mode: "cors" }
    );
    const photographers = await response.json();
    return photographers;
  }

  async getInfoPhotographer(idPhotographer, sort) {
    const { photographers, media } = await this.getPhotographers();
    const photographer = photographers
      .map((photographer) => new Photographer(photographer))
      .find((photographer) => photographer.id == idPhotographer); // eslint-disable-line eqeqeq

    const medias = media
      .map((media) => new MediasFactory(media))
      // eslint-disable-next-line eqeqeq
      .filter((media) => media.photographerId == idPhotographer);
      
      // Systeme de tri
    if (sort !== undefined) {
      switch (sort) {
        case "Popularité":
          medias.sort((a, b) => b.likes - a.likes);
          console.log(medias);
          break;

        case "Title":
          medias.sort((a, b) => a.title.localeCompare(b.title));
          console.log(medias);
          break;
        case "Date":
          medias.sort((a, b) => b.date.localeCompare(a.date));
          console.log(medias);

          break;
        default:
          break;
      }
    }
    return { photographer, medias };
  }
}
