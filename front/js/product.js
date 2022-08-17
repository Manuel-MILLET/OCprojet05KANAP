/*
Script OpenClassRoonms Projet 05 Kanap par Manuel MILLET le 17 août 18h00
Script javascript de la page HTML product.html pour l'affichage dynamique du canapé choisi
*/
// construction de l'adresse url pour l'API fetch qui retourne les données d'un produit via son ID
const urlProductSelected = "http://localhost:3000" + "/api/products/" + window.location.search.substring(4);
// ID de l'élément button "Ajouter au panier" pour la validation du choix dans la fonction "getDataSelected"
const idOfSubmitButton = 'addToCart';
let idProductGlobal = "";
// L'API fetch dans la fonction "getDataSelectCanape" Charge les données qui sont dans le serveur de la fiche produit du canapé selectionné par son "ID".
// Puis affiche les caractéristiques du canapé dans la page "product.html"
function getDataSelectedCanape () {
  fetch(urlProductSelected) // l'API fetch retourne les caractéristiques de l'objet "getCanapSelected" venant du seveur à l'adresse "urlProductSelected"
  .then(statusConnect => statusConnect.json())
  .then(product => {
  // Instance de l'objet "CanapSelected" avec la classe "Canape" définie dans le fichier "classeCanape.js"
  let canapSelected = new Canape(product.colors,product._id,product.name,product.price,product.imageUrl,product.description,product.altTxt);
  let  idProductGlobal = product._id;
  // Cette méthode affiche les caractéristiques du canapé selectioné par le client dans la page product.html
  canapSelected.displayProduct('item__img', 'title', 'price', 'description', 'colors');
  let productUser = new ProductUser(idProductGlobal,'une couleur',0,idOfSubmitButton);
  productUser.inputChoice(idProductGlobal,idOfSubmitButton);
  });
}
getDataSelectedCanape ();