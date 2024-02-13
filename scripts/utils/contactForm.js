function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const envoyer = document.getElementById("envoyer");
let myform = document.querySelector("form")


myform.addEventListener('submit', (e) => {
  e.preventDefault()
 
 // Si le formulaire est valide, on ferme le modal
  closeModal();
  
});


