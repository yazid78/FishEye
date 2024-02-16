class PhotographerService {
  async getPhotographers() {
    const response = await fetch(
      "http://127.0.0.1:5500/data/photographers.json",
      { method: "GET", mode: "cors" }
    );
    const photographers = await response.json();
    return photographers;
  }

  async getInfoPhotographer(idPhotographer, sort) {
    const { photographers, media } = await this.getPhotographers();
    const photographer = photographers
      .map((photographer) => new Photographer(photographer))
      .find((photographer) => photographer.id == idPhotographer);

    let medias = media
      .map((media) => new MediasFactory(media))
      .filter((media) => media.photographerId == idPhotographer);
    if (sort != undefined) {
      switch (sort) {
        case "Popularité":
          //medias =  medias.likes.sort()
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
