/*
Script OpenClassRoonms Projet 05 Kanap
 par Manuel MILLET le 03 septembre 2022 18h00
Script javascript de la page HTML product.html pour l'affichage dynamique du canapé choisi
*/
// ID de l'élément button "Ajouter au panier" pour la validation du choix
const idOfSubmitButton = 'addToCart';
// construction de l'adresse url pour l'API fetch qui retourne du server les données d'un seul produit via son "ID"
const urlString = "http://localhost:3000" + "/api/products/";
const urlStocker = new URL(urlString);
const getUrl = new URLSearchParams(document.location.search);
const idProduct = getUrl.get("id");
fetch(urlString + idProduct) // l'API fetch retourne les caractéristiques de l'objet "getCanapSelected" venant du seveur à l'adresse "urlProductSelected"
    .then(statusConnect => statusConnect.json())
    .then(product => {
        // Instance de l'objet "canapSelected" avec la classe "Product" définie dans le fichier "classeProduct.js"
        const canapSelected = new Product(
                            product._id ,
                            product.colors ,
                            product.altTxt ,
                            product.imageUrl ,
                            product.name ,
                            product.price ,
                            product.description 
                            );
        // Méthode "displayProduct" pour l'affichage des caractéristiques du produit selectioné dans la page product.html 
        canapSelected.displayProduct('item__img', 'title', 'price', 'description', 'colors');
        // Méthode "selectedChoice" pour la gestion de l'ajout du produit selectionné au panier avec la méthode "selectedChoice"
        canapSelected.selectedChoice(idProduct,idOfSubmitButton);
    });
//fin de l'API fetch 
//fin du script "product.js"