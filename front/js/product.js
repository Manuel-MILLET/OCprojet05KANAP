/*
Script OpenClassRoonms Projet 05 Kanap par Manuel MILLET le 24 août 2022 15h00
Script javascript de la page HTML product.html pour l'affichage dynamique du canapé choisi
*/
// construction de l'adresse url pour l'API fetch qui retourne les données d'un produit via son ID
const urlCatalogue = "http://localhost:3000" + "/api/products/";
const idProduct = window.location.search.substring(4);
// ID de l'élément button "Ajouter au panier" pour la validation du choix
const idOfSubmitButton = 'addToCart';
// Instance de l'objet "canapSelected" avec la classe "ProductUser" définie dans le fichier "classeProductUser.js"
// avec l'affichage des caractéristiques du produit selectioné dans la page product.html 
const canapSelected = new ProductUser(urlCatalogue,idProduct,idOfSubmitButton);
//gestion de l'ajout au panier ?
canapSelected.selectedChoice(idProduct,idOfSubmitButton);