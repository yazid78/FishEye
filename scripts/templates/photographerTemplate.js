function photographerTemplate(data) {
  const { name, portrait, id, tagline, city, country, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const a = document.createElement("a");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    const h2 = document.createElement("h2");
    h2.textContent = name;
    const h3 = document.createElement("h3");
    h3.textContent = city + "," + country;
    const tag = document.createElement("p");
    tag.textContent = tagline;
    const prix = document.createElement("p");
    prix.textContent = price + " " + "€";
    a.appendChild(img);
    a.appendChild(h2);
    a.appendChild(h3);
    a.appendChild(tag);
    a.appendChild(prix);
    a.setAttribute("aria-label", "Voir le profil de "+ name)
   
   article.appendChild(a)

    a.addEventListener("click", () => {
      window.location = `http://127.0.0.1:5500/photographer.html?id=${id}`;
    });
    return article;
  }
  return { name, picture, getUserCardDOM };
}
