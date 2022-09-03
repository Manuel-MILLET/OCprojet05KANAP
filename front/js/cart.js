/*Script Porjet OpenClassroom n°5 "Kanap"
par Manuel MILLET le 03 septembre 2022 14h00
Script de la page cart.html pour l'affichage du panier dans la page cart.html
*/

//fonction "displayCartUser" affiche le contenu du panier dans la page cart.html (panier)
function displayCartUser(){
	const cart = new CartUser();
	const cartUser = cart.basket;
	const urlStoker = "http://localhost:3000" + "/api/products/";
	let nbProduit = cartUser.length;
	// si le panier est ni null, ni indédifini ni vide alors affachage du panier et saisi du formulaire
	// sinon affichage du message "Votre panier est actuelement vide, cliquez sur "OK" puis sur la page d\'accueil  pour continuer, pour faire votre choix  !" dans le titre de la page
	if (cartUser != null && cartUser != undefined && cartUser != [] && nbProduit !=0 ){
		let = numberOfCanape = 0;
		let = totalPrice = 0;
		for (let i in cartUser){// Pour tout les produits du panier => affachage des infos (photos,nom,clouleur,pris et quantité) dans la page cart.html
			// Récupération des caractéristiques du produit via l'ID et l'API fetch du product dans l'item du panier pour l'afficher dans la page cart.html
			let idProduct = String(cartUser[i].id);
			const urlProductSelected = urlStoker + idProduct;
			let colorSelected = cartUser[i].color;
			let qty = cartUser[i].quantity;
			// Affichage des caractéristiques d'un canapé du panier dans la page cart.html
			// Construction de l'adresse url pour l'API fetch "products par ID"
			// ID de l'élément button "Ajouter au panier" pour la validation du choix dans la fonction "getDataSelected"
			fetch(urlProductSelected) // l'API fetch retourne l'objet productCard venant du seveur à l'adresse "urlProductSelected"
				.then(statusConnect => statusConnect.json())
				.then(orderProduct => {
				const getFeature = new Product(
					orderProduct._id ,
					orderProduct.colors ,
					orderProduct.altTxt ,
					orderProduct.imageUrl ,
					orderProduct.name ,
					orderProduct.price ,
					orderProduct.description ,
				);
				colorSelected , // couleur du canapé choisi enregistrée dans le panier
				qty // quantité de canapé pour un produit (même id & même couleur) choisi par le client
				numberOfCanape += Number(qty);
				totalPrice += qty * orderProduct.price;
				getFeature.displayInfosOrder(colorSelected,qty);// affiche dans la page cart.html ("panier") les informations des produits selectionnés dans le panier par le client
				getFeature.displayTotaux(numberOfCanape,totalPrice);
			});
		}
	}else{
		// ici le panier est vide donc affachage du message "Votre panier est actuelement vide, cliquez sur "OK" puis sur la page d\'accueil  pour continuer, pour faire votre choix  !" dans le titre de la page
		document.getElementsByTagName("h1")[0].innerHTML = "Votre panier est actuellement vide !";
	}
}

// fonction "transmitOrderId" transmet le numero de commade "orderId" à la page confirmation.html via l'url
function transmitOrderId(IdOrder) {
	const urlTransmitIdOrder = "./confirmation.html" + "?orderId=" + IdOrder;
	window.location.href = urlTransmitIdOrder;
}

// fonction "fetchORder" initialise et execute la fonction de l'API fetch pour obtenier le numero de commade "IdOrder"
// puis si le formulaire est correctement rempli envoie le formulaire information client ainsi que la liste des "ID"(s) des produits du panier
function fetchOrder(formOrder,listId){
	const urlOrder = "http://localhost:3000/api/products/order";
	const bodyOrder = {
		contact: {
			firstName: formOrder.elements.firstName.value,
			lastName: formOrder.elements.lastName.value,
			address: formOrder.elements.address.value,
			city: formOrder.elements.city.value,
			email: formOrder.elements.email.value
		},
		products: 
			listId
	};
	const headerOrder = {
		"Content-Type": "application/json"
	};
	const headerInit = {
		method: "POST",
		body: JSON.stringify(bodyOrder),
		headers: headerOrder,
		mode: 'cors',
		cache: 'default'
	};
	fetch(urlOrder,headerInit)
		.then((statusConnect) => statusConnect.json())
		.then((dataRecive) => {
			const IdOrder = dataRecive.orderId;
			transmitOrderId(IdOrder);
		});// fin de APIfetch méthode "POST" pour la reception du numéro de commande "IdOrder" retourné par le server
}

// fonction "isFormOrderValid" retourne "vrai" si le formulaire est correctement rempli sinon "faux"
function isFormOrderValid() {
	const formOrder = document.querySelector(".cart__order__form");
	const firstName = formOrder.elements.firstName.value;
	const regExp_firstName = /^[a-zA-Z]+(?:-[a-zA-Z]+)?$/;
	const lastName = formOrder.elements.lastName.value;
	const regExp_lastName = /^[a-zA-Z]+(?:-[a-zA-Z]+)?$/;
	const address = formOrder.elements.address.value;
	const regExp_address = /^[a-zA-Z0-9\s-:]+[a-zA-Z-]$/;
	const city = formOrder.elements.city.value;
	const regExp_city = /^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/;
	const email = formOrder.elements.email.value;
	const regExp_email = new RegExp('^[A-Za-z0-9.-_]+[@]{1}[A-Za-z0-9.-_]+[.]{1}[a-z]{2,10}$');
	if (firstName === "" || regExp_firstName.test(firstName) === false) {
		displayErrorStyle("firstName","firstNameErrorMsg");
		return false;
	}else if (lastName ===  "" || regExp_lastName.test(lastName) === false) {
		displayErrorStyle("lastName","lastNameErrorMsg");
		return false;
	}else if (address ===  "" || regExp_address.test(address) === false) {
		displayErrorStyle("address","addressErrorMsg");
		return false;
	}else if (city ===  "" || regExp_city.test(city) === false) {
		displayErrorStyle("city","cityErrorMsg");
		return false;
	}else if (email ===  "" || regExp_email.test(email) === false) {
		displayErrorStyle("email","emailErrorMsg");
		return false;
	}else{//ici le formulaire est bien valide
		return true;
	}
}

// fonction "orderFormInput" rempli la liste (tableau "listId") avec les "ID"'(s) des produit du panier
function orderFormInput (e) {
	e.preventDefault(e);
	const cart = new CartUser();
	const listId = [];
	for (let i in cart.basket) {
		listId.push(cart.basket[i].id);
	}
	const formOrder = document.querySelector(".cart__order__form");
	if (cart.emptyCart(cart)) {// si le panier est vide ou non vadide pas de commande 
		alert('Désolé mais vous ne pouvez pas faire de commande avec un panier vide !');
		return;
	}else if (!isFormOrderValid()) {// ici le formulaire n'est pas rempli correctement
		alert('Désolé, mais le formulaire n\'est pas vailide :');
		return;
	}else{// ici le formulaire est rempli correctement donc transmission
		fetchOrder(formOrder,listId);
		return;
	}
}

//fonction "displayErrorStyle" modifie le style de l'élément avec l'id = "inputId" en cas d'erreur
function displayErrorStyle (inputId,errorMsgId) {
	document.getElementById(inputId).style.background = "red";
	document.getElementById(errorMsgId).innerHTML = "Saisie invalide !";
	setTimeout(() => {
		document.getElementById(inputId).style.background = "white";
		document.getElementById(errorMsgId).innerHTML = "Nouvelle saisie SVP !";
	},"4000");
}

// fonction "waitForOrder" qui attend l'event listener sur le bouton "Commander!" puis transmet 
function waitForOrder() {
	const orderButton = document.getElementById("order");
	orderButton.addEventListener('click', (e) => orderFormInput(e));
}// fin de l event listener sur le bouton "Commander!"

// *********************   Programme principal  ******************
displayCartUser();//La fonction "displayCartUser" affiche le contenu du panier dans la page cart.html (panier)
waitForOrder();// La fonction "waitForOrder" attend l'event listener sur le bouton "Commander!"
//fin de cart.js