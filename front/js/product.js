/*
Script OpenClassRoonms Projet 05 Kanap par Manuel MILLET le 05 juillet 17h00
Script jevascript de la page HTML product.html pour l'affichage dynamique du canapé choisi
*/

// construction de l'adresse url pour l'API products par ID
const urlServer = "http://localhost:3000";
const urlProductSelected = urlServer + "/api/products/" + window.location.search.substring(4);

// Classe objet de la fiche produit du canapé selectionné
class Canape {
  constructor(colors, _id, name, price, imageUrl, description, altTxt) {
    this.colors = colors = [];
    this._id = _id;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.altTxt = altTxt;
  }
}

// Chargement des données de la fiche produit du canapé selectionné par son "ID" via l'API fetch
function getDataSelectCanape() {
  fetch(urlProductSelected) // l'API fetch retourne l'objet productCard venant du seveur à l'adresse "urlProductSelected"
    .then(statusConnect => statusConnect.json())
    .then(productCard => {
      // insertion de l'image du produit sélectionné
      const selectedCanapeImage = `<img src="${productCard.imageUrl}" alt="${productCard.altTxt}">`;
      document.getElementsByClassName("item__img")[0].innerHTML = selectedCanapeImage;
      // insertion du nom du canapé selectionné
      const selectedCanapeName = `${productCard.name}`;
      document.getElementById("title").innerHTML = selectedCanapeName;
      // insertion du prix du canapé selectionné
      const selectedCanapePrice = `${productCard.price}`;
      document.getElementById("price").innerHTML = selectedCanapePrice;
      // insertion de la description du canapé selectionné
      const selectedCanapeDescription = `${productCard.description}`;
      document.getElementById("description").innerHTML = selectedCanapeDescription;
      // insertion des couleurs proposées avec l'élément HTML option
      let blocSelectedCanapeColor = document.getElementsByName("color-select")[0];
      for (i = 0; i < productCard.colors.length; i++) {
      const selectedCanapeColor =
       `
       <option value="${productCard.colors[i]}">${productCard.colors[i]}</option>
       `;
        blocSelectedCanapeColor.innerHTML += selectedCanapeColor;
      }
    }); 
};
getDataSelectCanape();