/*Script Porjet OpenClassroom n°5 "Kanap"
par Manuel MILLET le 06 septembre 2022 16h00
Script de la page cart.html pour l'affichage du panier dans la page cart.html
*/

//fonction "displayCartUser" affiche le contenu du panier dans la page cart.html (panier)
async function displayCartUser(){
	const cart = new CartUser();
	const cartUser = cart.basket;
	const urlStoker = "http://localhost:3000" + "/api/products/";
	const nbProduit = cartUser.length; // nombre d'article dans le panier du client
	// Si le panier est ni null, ni indédifini ni vide alors affichage du panier et saisie du formulaire de contact
	// sinon affichage du message "Votre panier est actuelement vide, cliquez sur "OK" puis sur la page d\'accueil  pour continuer, pour faire votre choix  !" dans le titre de la page
	if (cartUser != null && cartUser != undefined && cartUser != [] && nbProduit !=0 ){
		let = numberOfCanape = 0;
		let = totalPrice = 0;
		for (let i in cartUser) {// Pour tout les produits du panier => affachage des infos (photos,nom,clouleur,pris et quantité) dans la page cart.html
			let idProduct = String(cartUser[i].id);
			let colorSelected = cartUser[i].color; // "colorSelectedcouleur" représante la couleur du canapé choisi par le client et enregistrée dans le panier
			let qty = cartUser[i].quantity;// "qty" représante la quantité de canapé pour un produit (même id & même couleur) choisi par le client et enregistrée dans le panier
			// Construction de l'adresse url pour l'API fetch "products par ID"
			const urlProductSelected = urlStoker + idProduct;
			// Récupération des caractéristiques du produit via l'ID et l'API fetch du product dans l'item du panier pour l'afficher dans la page cart.html
			await fetch(urlProductSelected) // Cette API fetch retourne l'objet "orderProduct" venant du seveur à l'adresse "urlProductSelected"
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
				numberOfCanape += Number(qty);
				totalPrice += qty * orderProduct.price;
				setTimeout(
					getFeature.displayInfosOrder(colorSelected,qty),
					800); //getFeature.displayInfosOrder(colorSelected,qty);// Affichage dans la page cart.html ("panier") des informations des produits selectionnés dans le panier du client
				getFeature.displayTotaux(numberOfCanape,totalPrice);// Affichage du nombre total de canapé selectionnés et la somme totale à payer
			});
		}// fin de la boucle for
	}else{// ici le panier est vide donc affachage du message "Votre panier est actuelement vide, cliquez sur "OK" puis sur la page d\'accueil  pour continuer, pour faire votre choix  !" dans le titre de la page
		document.getElementsByTagName("h1")[0].innerHTML = "Votre panier est actuellement vide !";
	}
}

function essai(){
	getFeature.displayInfosOrder(colorSelected,qty);
}

// fonction "transmitOrderId" transmet le numero de commade "orderId" à la page confirmation.html via l'url
function transmitOrderId(IdOrder) {
	const urlTransmitIdOrder = "./confirmation.html" + "?orderId=" + IdOrder;
	window.location.href = urlTransmitIdOrder;
}

// La fonction "fetchORder" initialise et execute la fonction de l'API fetch pour obtenier le numero de commade "IdOrder"
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
	// L'API fetch avec la méthode "POST" pour la reception du numéro de commande "IdOrder" retourné par le server
	fetch(urlOrder,headerInit)
		.then((statusConnect) => statusConnect.json())
		.then((dataRecive) => {
			const IdOrder = dataRecive.orderId;
			transmitOrderId(IdOrder);
		});// fin de APIfetch 
}

// La fonction "isFormOrderValid" retourne "vrai" si le formulaire est correctement rempli sinon "faux"
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

// La fonction "orderFormInput" rempli la liste "listId" sous forme de tableau composé des "ID"'(s) des produit du panier
function orderFormInput (e) {
	e.preventDefault(e);
	const cart = new CartUser();
	const listId = [];
	const formOrder = document.querySelector(".cart__order__form");
	if (cart.emptyCart(cart)) {// si le panier est vide pas de commande 
		alert('Désolé mais vous ne pouvez pas faire de commande avec un panier vide !');
		return;
	}else if (!isFormOrderValid()) {// ici le formulaire n'est pas rempli correctement
		alert('Désolé, mais le formulaire n\'est pas vailide :');
		return;
	}else{// ici le formulaire est rempli correctement donc transmission des données (le formulaire contact client plus la liste des identifiants "listId")
		for (let i in cart.basket) {
			listId.push(cart.basket[i].id);
		}
		fetchOrder(formOrder,listId);
		return;
	}
}

// La fonction "displayErrorStyle" modifie le style de l'élément avec l'id = "inputId" en cas d'erreur
function displayErrorStyle (inputId,errorMsgId) {
	document.getElementById(inputId).style.background = "red";
	document.getElementById(errorMsgId).innerHTML = "Saisie invalide !";
	setTimeout(() => {
		document.getElementById(inputId).style.background = "white";
		document.getElementById(errorMsgId).innerHTML = "Nouvelle saisie SVP !";
	},"4000");
}

// La fonction "FormOrderManager" qui attend l'event listener sur le bouton "Commander!" puis transmet 
function FormOrderManager() {
	const orderButton = document.getElementById("order");
	orderButton.addEventListener('click', (e) => orderFormInput(e));
}// fin de l'event listener sur le bouton "Commander!"

// *********************   Programme principal  ******************
// Affiche le panier, puis gestion du formulaire de contact du client
displayCartUser();//La fonction "displayCartUser" affiche le contenu du panier dans la page cart.html (panier)
FormOrderManager();// La fonction "FormOrderManager" attend l'event listener sur le bouton "Commander!", puis gère le formulaire de conact le formulaire du client
//fin de cart.js