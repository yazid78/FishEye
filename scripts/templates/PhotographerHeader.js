class PhotographerHeader {
  constructor(photographer) {
    this.photographer = photographer;
  }

  createPhotographerHeader() {
    const detailSection = document.querySelector(".photograph-header");

    const nameElement = document.createElement("h2");
    nameElement.textContent = this.photographer.name;
    detailSection.appendChild(nameElement);

    const locationElement = document.createElement("p");
    locationElement.textContent =
      this.photographer.city + ", " + this.photographer.country;
    detailSection.appendChild(locationElement);

    const taglineElement = document.createElement("p");
    taglineElement.textContent = this.photographer.tagline;
    taglineElement.id = "tagline";
    detailSection.appendChild(taglineElement);

    const picture = "assets/photographers/" + this.photographer.portrait;
    const imageElement = document.createElement("img");
    imageElement.src = picture;
    imageElement.alt = this.photographer.name;
    detailSection.appendChild(imageElement);
    if (picture === "assets/photographers/MimiKeel.jpg") {
      imageElement.id = "MimiKeel_id";
    }
  }
}
