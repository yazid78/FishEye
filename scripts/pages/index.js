async function getPhotographers() {
  const response = await fetch("http:127.0.0.1:5500/data/photographers.json", { method: 'GET', mode: 'cors' }); 
  const photographers = await response.json();
  console.log(photographers);
  return photographers;
}


async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();

