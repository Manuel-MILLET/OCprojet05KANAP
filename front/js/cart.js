/*
Script Porjet OpenClassroom n°5 "Kanap"
par Manuel MILLET le 08 août 2022 15h00
Script de la page cart.html pour l'affichage dynamique de produits
*/

panier = getCartUser();				
for (let i in panier){
	let idProduct = String(panier[i].id);
	// Récupération des caractéristiques du produit via l'ID et l'API fetch du product dans l'item du panier
	let item = i;
	let couleur = panier[i].color;
	let qty = panier[i].quantity;
	getDataSelectOrder(idProduct,item,couleur,qty);
}

function getDataSelectOrder(idProduct,item,couleur,qty) {
	// construction de l'adresse url pour l'API fetch "products par ID"
	const urlProductSelected = "http://localhost:3000" + "/api/products/" + idProduct;
	// ID de l'élément button "Ajouter au panier" pour la validation du choix dans la fonction "getDataSelected"
	fetch(urlProductSelected) // l'API fetch retourne l'objet productCard venant du seveur à l'adresse "urlProductSelected"
	  .then(statusConnect => statusConnect.json())
	  .then(orderProduct => {
		let getFeature = new Order();
		getFeature.cart__item = Number(item);// valeur "item" enregisté dans le panier
		getFeature._id = orderProduct._id;
		getFeature.color = couleur;// valeur "couleur" enregisté dans le panier
		getFeature.imageUrl = orderProduct.imageUrl;
		getFeature.altTxt = orderProduct.altTxt;
		getFeature.name = orderProduct.name;
		getFeature.description = orderProduct.description;
		getFeature.price = orderProduct.price;
		getFeature.quantity = qty;// valeur "qty" enregisté dans le panier
		getFeature.displayInfosOrder();
	  }
	);
}

/***********************************************/
// Fonctions supplémentaires
/***********************************************/
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
    	// ici le tableau "cartUser" n est pas encore créer alors il faut le céer et retourner un tableau vide
    	let vide = [];
    	localStorage.setItem("cartUser",JSON.stringify(vide));
    	return vide;// retourne un tableau vide car le panier est vide
  	}
}

// Cette fonction sauvegarde le contenu du panier "cartUser" dans localStorage  
function saveCartUser(cart){
  let panier = JSON.stringify(cart);
  localStorage.setItem("cartUser",panier);// "carteUser" est le panier du client au format tableau stocké dans localStorage
  alert('Votre demande de modification à votre panier, a bien été effectue, cliquez su "OK" pour continuer !');
}

// Cette fonction supprime l'éléments d'indice "indice" au panier "cartUser" enregistré dans localStorage
function removeProduct(indice) {
	let cart = getCartUser();
	cart.splice(indice,1);
	saveCartUser(cart);
}
   
// Cette méthode retourne le nombre total de canapé selectionné dans le panier client ("cartUser") dans localStorage.
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
  
// Cette méthode retourne la somme totale des montants de tous les canapés ajoutés au panier du client ("cartUser") dans localStorage.
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