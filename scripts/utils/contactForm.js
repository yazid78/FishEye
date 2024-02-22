function displayModal () {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal () {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

const myform = document.querySelector("form");

myform.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Prenom :", prenom.value);
  console.log("Nom :", nom.value);
  console.log("Email :", email.value);
  console.log("Message :", message.value);

  // Si le formulaire est valide, on ferme le modal
  closeModal();
});

const prenom = document.getElementById("first");
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const message = document.getElementById("message");

document.addEventListener("keydown", function (event) {
  if (event.key === " " || event.key === "Escape") {
    closeModal();}});