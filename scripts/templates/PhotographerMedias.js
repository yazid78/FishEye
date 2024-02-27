class PhotographerMedias {
  constructor(photographer, medias) {
    this.photographer = photographer;
    this.medias = medias;
    this.totalLikesElement = null;
    this.totalLikes = 0;
  }

  createPhotographerMedias() {
    const photosContainer = document.createElement("div");
    photosContainer.classList.add("photographer_photos");
    photosContainer.id = "effacer";

    this.medias.forEach((media) => {
      const mediaContainer = document.createElement("div");

      mediaContainer.classList.add("media_container");
      const InformationsContainer = document.createElement("div");
      InformationsContainer.classList.add("Informations");
      InformationsContainer.setAttribute("tabindex", "0");
      const mediaInstance = new MediasFactory(media);
      const element = mediaInstance instanceof Image ? "img" : "video";
      const mediaElement = document.createElement(element);
      mediaElement.alt = media.alt;

      if (element === "video") {
        mediaElement.setAttribute(
          "aria-label",
          "Woman doing aerial tricks suspended by one arm"
        );
      }

      mediaElement.src = `assets/${this.photographer.name}/${
        mediaInstance.image || mediaInstance.video
      }`;

      // Création du titre en dessous de l'image
      const titleElement = document.createElement("h2");
      titleElement.textContent = media.title;
      titleElement.id = "title";

      const likes = media.likes;

      const heartIcon = document.createElement("i");
      heartIcon.classList.add("fas", "fa-heart");

      const likesElement = document.createElement("h2");
      likesElement.setAttribute("data-likes", likes.toString());
      likesElement.classList.add("like-button");
      likesElement.setAttribute("tabindex", "0");
      likesElement.appendChild(document.createTextNode(likes + " "));
      likesElement.appendChild(heartIcon);

      likesElement.addEventListener("click", () => {
        this.toggleLike(likesElement);
      });
      likesElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.toggleLike(likesElement);
        }
      });

      InformationsContainer.appendChild(titleElement);
      InformationsContainer.appendChild(likesElement);

      mediaContainer.appendChild(mediaElement);
      mediaContainer.appendChild(InformationsContainer);
      photosContainer.appendChild(mediaContainer);

      // Ajouter les likes au total
      this.totalLikes += likes;
    });

    const mainSection = document.getElementById("main");
    mainSection.appendChild(photosContainer);

    // Créer l'élément totalLikesElement
    this.createTotalLikesElement();
  }

  createTotalLikesElement() {
    // Création de l'élément totalLikesElement
    this.totalLikesElement = document.createElement("aside");
    this.totalLikesElement.classList.add("total");
    this.totalLikesElement.setAttribute(
      "data-total",
      this.totalLikes.toString()
    );

    // Création du texte pour le total des likes, y compris le prix
    const totalLikesText = document.createTextNode(this.totalLikes + " ");

    const heartTotal = document.createElement("i");
    heartTotal.classList.add("fas", "fa-heart");
    const priceText = document.createTextNode(
      " " + this.medias[0].price + "€ / jour"
    );

    // Ajout des éléments à totalLikesElement
    this.totalLikesElement.appendChild(totalLikesText);
    this.totalLikesElement.appendChild(heartTotal);
    this.totalLikesElement.appendChild(priceText);

    // Ajout de totalLikesElement à mainSection
    const mainSection = document.getElementById("main");
    mainSection.appendChild(this.totalLikesElement);
  }

  toggleLike(likesElement) {
    let currentLikes = parseInt(likesElement.getAttribute("data-likes"));
    if (likesElement.classList.contains("liked")) {
      // Si déjà aimé, retirer le like
      currentLikes--;
      this.totalLikes--;
      likesElement.classList.remove("liked");
    } else {
      // Si non aimé, ajouter le like
      currentLikes++;
      this.totalLikes++;
      likesElement.classList.add("liked");
    }
    likesElement.setAttribute("data-likes", currentLikes.toString());
    likesElement.childNodes[0].nodeValue = currentLikes + " ";

    // Mettre à jour le total des likes
    this.totalLikesElement.setAttribute(
      "data-total",
      this.totalLikes.toString()
    );
    this.totalLikesElement.childNodes[0].nodeValue = this.totalLikes + " ";
  }
}
