/*
Script OpenClassRoonms Projet 05 Kanap par Manuel MILLET le 15 août 13h00
Script javascript de la page HTML product.html pour l'affichage dynamique du canapé choisi
*/
// construction de l'adresse url pour l'API fetch qui retourne les données d'un produit via son ID
const urlProductSelected = "http://localhost:3000" + "/api/products/" + window.location.search.substring(4);
// ID de l'élément button "Ajouter au panier" pour la validation du choix dans la fonction "getDataSelected"
const idOfSubmitButon = 'addToCart';
// L'API fetch dans la fonction "getDataSelectCanape" Charge les données qui sont dans le serveur de la fiche produit du canapé selectionné par son "ID".
// Puis affiche les caractéristiques du canapé dans la page "product.html"
fetch(urlProductSelected) // l'API fetch retourne les caractéristiques de l'objet "getCanapSelected" venant du seveur à l'adresse "urlProductSelected"
  .then(statusConnect => statusConnect.json())
  .then(product => {
  // Instance de l'objet "CanapSelected" avec la classe "Canape" définie dans le fichier "classeCanape.js"
  let canapSelected = new Canape(product.colors,product._id,product.name,product.price,product.imageUrl,product.description,product.altTxt);
  let idOfProduct = product._id;
  // Cette méthode affiche les caractéristiques du canapé selectioné par le client dans la page product.html
  canapSelected.displayCard('item__img', 'title', 'price', 'description', 'colors');
  let productUser = new ProductUser();
  // Cette méthode ajoute le canapé, avec la couleur et la quantité  selectioné par le client dans localStorage
  productUser.addToCart(idOfProduct,idOfSubmitButon);
  });