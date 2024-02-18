class PhotographerMedias {
  constructor(photographer, medias) {
    this.photographer = photographer;
    this.medias = medias;
    this.totalLikesElement = null;
    this.totalLikes = 0;
    
  }

  createPhotographerMedias() {
    const photosContainer = document.createElement("section");
    photosContainer.classList.add("photographer_photos");
    photosContainer.id = "effacer";
   
    
    this.medias.forEach((media) => {
      const mediaContainer = document.createElement("div");
      mediaContainer.classList.add("media_container");
      const InformationsContainer = document.createElement("div");
      InformationsContainer.classList.add("Informations");

      const mediaInstance = new MediasFactory(media);
      const element = mediaInstance instanceof Image ? "img" : "video";
      const mediaElement = document.createElement(element);
      mediaElement.alt = media.alt

      mediaElement.src = `assets/${this.photographer.name}/${mediaInstance.image || mediaInstance.video}`;
      if (element === "video") {
        mediaElement.controls = true;
      }

      // Création du titre en dessous de l'image
      const titleElement = document.createElement("h2");
      titleElement.textContent = media.title;
      titleElement.id = "title";

      let likes = media.likes;

      const heartIcon = document.createElement("i");
      heartIcon.classList.add("fas", "fa-heart");

      const likesElement = document.createElement("h2");
      likesElement.setAttribute("data-likes", likes.toString());
      likesElement.classList.add("like-button");
      likesElement.appendChild(document.createTextNode(likes + " "));
      likesElement.appendChild(heartIcon);

      likesElement.addEventListener("click", () => {
        this.toggleLike(likesElement); // Appel de la méthode pour ajouter ou supprimer un like
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
    this.totalLikesElement.setAttribute("data-total", this.totalLikes.toString());
    
    // Création du texte pour le total des likes, y compris le prix
    const totalLikesText = document.createTextNode(this.totalLikes + " ");
    
    // Création de l'icône de cœur
    const heartTotal = document.createElement("i");
    heartTotal.classList.add("fas", "fa-heart");
  
    // Création du prix
    const priceText = document.createTextNode(" " + this.medias[0].price + "€ / jour"); // Supposons que le prix est le même pour tous les médias
  
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
    this.totalLikesElement.setAttribute("data-total", this.totalLikes.toString());
    this.totalLikesElement.childNodes[0].nodeValue = this.totalLikes + " ";
  }
}