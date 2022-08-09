/*
Script OpenClassRoonms Projet 05 Kanap par Manuel MILLET le 09 août 15h00
Script javascript de la page HTML product.html pour l'affichage dynamique du canapé choisi
*/

// L'API fetch dans la fonction "getDataSelectCanape" Charge les données qui sont dans le serveur de la fiche produit du canapé selectionné par son "ID".
// Puis affiche les caractéristiques du canapé dans la page "product.html"
function getDataSelectCanape() {
  // construction de l'adresse url pour l'API fetch qui retourne les données d'un produit via son ID
  const urlProductSelected = "http://localhost:3000" + "/api/products/" + window.location.search.substring(4);
  // ID de l'élément button "Ajouter au panier" pour la validation du choix dans la fonction "getDataSelected"
  const idOfSubmitButon = 'addToCart';
  fetch(urlProductSelected) // l'API fetch retourne les caractéristiques de l'objet "getCanapSelected" venant du seveur à l'adresse "urlProductSelected"
  .then(statusConnect => statusConnect.json())
  .then(productCard => {
    let getCanapSelected = new CartUser(productCard.colors, productCard._id, productCard.name, productCard.price, productCard.imageUrl, productCard.description, productCard.altTxt, idOfSubmitButon);    
    getCanapSelected.displayCard('item__img', 'title', 'price', 'description', 'colors');// affiche les caractéristiques du canapé choisi dans la page d'accueil
  }); 
}
getDataSelectCanape();// cette fonction Lance l'API pour charger les données du produit dans l'objet "getCanapSelected" et les affiche dans la page "product.html"

// Cettte fonction  "getCartUser" retourne le contenu du panier du client enregistré dans "localStorage" (cart), qui contient l'ensemble des produits selectionnés sous forme d'un tableau JSON.
function getCartUser(){
	let cart = JSON.parse(localStorage.getItem("cartUser"));// "cart" représente l'objet au format tableau qui contient tout le panier du client
  let cartLive = Array.isArray(cart);// cartLive = true si le tableau "cartUser" exsiste dans le panier
  if (cartLive){
    // ici le tableau "cartUser" exsiste
    let cartLength = cart.length;
    if (cartLength <=0){ // si cartLenght est <=0 alors le panier exsiste mais il est vide
      let vide = [];
      localStorage.setItem("cartUser",JSON.stringify(vide));
      return vide;// retourne un tableau vide car le panier est vide
    }else{
      return cart;
    }
  }else{
    // ici le tableau "cartUser" n'est pas encore créer alors il faut le céer et retourner un tableau vide
    //console.log('ici pas de tableau , et donc Le panier du client est vide');
    let vide = [];
    localStorage.setItem("cartUser",JSON.stringify(vide));
    return vide;// retourne un tableau vide car le panier est vide
  }
}

// Cette fonction sauvegarde dans localStorage en ajoutant le contenu du produit choisi par le client dans "cart"  
function saveCartUser(cart){
  let panier = JSON.stringify(cart);
  localStorage.setItem("cartUser",panier);// "carteUser" est le panier du client au format tableau stocké dans localStorage
  alert('Votre demande de modification à votre panier, a bien été effectue, cliquez su "OK" pour continuer !');
}

// Cette fonction supprime le produit de rang "indice" dans le tableau du panier du client "cartUser" enregistré dans localStorage
function removeProduct(indice) {
  let cart = getCartUser();
  cart.splice(indice,1);
  saveCartUser(cart);
}
 
// Cette méthode retourne le nombre total de canapé selectionné dans le panier du client "cartUser" enregistré dans localStorage.
function getNumberCanape() {
  let cart = getCartUser();
  console.log('dans la fonction getNumberCanape: ',cart);
	let numberCanape = 0;
	for(let canape of cart){
		numberCanape += Number(canape.quantity);
	}
	console.log('Il y a: ',numberCanape,' canapés en tous');
	return numberCanape
}

// Cette méthode retourne la somme totale des montants de tous les canapés ajoutés au panier du client ("cartUser") enregistrés dans localStorage.
function getTotalPrice() {
  let cart = getCartUser();
	let totalPrice = 0;
	for(let product of cart){
		totalPrice += Number(product.quantity) * Number(product.price);
	}
	console.log('La somme totale de tous les canapés est: ',totalPrice,'€');
	return totalPrice
}

// cette fonction affiche le contenu du panier dans la console
function displayCartUser() {
	let cart = getCartUser();
	console.log('Dans le panier il y a:',cart);
}