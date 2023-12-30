  function photographerTemplate(data) {
  const { name, portrait, id, tagline, city, country, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const h3 = document.createElement("h3");
    h3.textContent = city + "," + country;
    const tag = document.createElement("p");
    tag.textContent = tagline;
    const prix = document.createElement("p");
    prix.textContent = price + " " + "€";
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(tag);
    article.appendChild(prix);

    article.addEventListener("click", () => {
      window.location = `../photographer.html`;
      const truc = new URLSearchParams(data);
      console.log(truc);
      
      
    });
    return article;
  }
  return { name, picture, getUserCardDOM };
}
