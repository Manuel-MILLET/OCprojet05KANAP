/*Script Porjet OpenClassroom n°5 "Kanap"
par Manuel MILLET le 31 août 2022 10h00
Script de la page cart.html pour l'affichage du panier dans la page cart.html
*/
// fonction "displayTotaux" affiche le nombre de canapé ainsi que la somme totale de la commande
function displayTotaux(numberOfCanape,totalPrice){
	document.getElementById("totalQuantity").innerHTML = numberOfCanape;// "TotalNumberCanape"
	document.getElementById("totalPrice").innerHTML = totalPrice+' ,00';// "TotalNumberCanape"
}// fin de la méthode "displayTotal"

//fonction "displayCartUser" affiche le contenu du panier dans la page cart.html (panier)
function displayCartUser(){
	const cart = new CartUser();
	const cartUser = cart.basket;
	let nbProduit = cartUser.length;
	if (cartUser !== null && cartUser !== undefined && cartUser !== [] && nbProduit !=0 ){
		let = numberOfCanape = 0;
		let = totalPrice = 0;
		for (let i in cartUser){// Pour tout les produits du panier => affachage des infos (photos,nom,clouleur,pris et quantité) dans la page cart.html
			// Récupération des caractéristiques du produit via l'ID et l'API fetch du product dans l'item du panier pour l'afficher dans la page cart.html
			let idProduct = String(cartUser[i].id);
			let colorSelected = cartUser[i].color;
			let qty = cartUser[i].quantity;
			// Affichage des caractéristiques d'un canapé du panier dans la page cart.html
			// Construction de l'adresse url pour l'API fetch "products par ID"
			const urlProductSelected = "http://localhost:3000" + "/api/products/" + idProduct;
			// ID de l'élément button "Ajouter au panier" pour la validation du choix dans la fonction "getDataSelected"
			fetch(urlProductSelected) // l'API fetch retourne l'objet productCard venant du seveur à l'adresse "urlProductSelected"
				.then(statusConnect => statusConnect.json())
				.then(orderProduct => {
				let getFeature = new Order();
				getFeature._id = orderProduct._id;
				getFeature.color = colorSelected;// couleur du canapé choisi enregistrée dans le panier
				getFeature.imageUrl = orderProduct.imageUrl;
				getFeature.altTxt = orderProduct.altTxt;
				getFeature.name = orderProduct.name;
				getFeature.description = orderProduct.description;
				getFeature.price = orderProduct.price;
				getFeature.quantity = qty;// quantité de canapé pour un produit choisi par le client
				getFeature.idInput  = 'input' + orderProduct._id + colorSelected ;
				getFeature.idButtonSup= 'sup' + orderProduct._id + colorSelected ;
				numberOfCanape += Number(qty);
				totalPrice += qty * orderProduct.price;
				getFeature.displayInfosOrder();// affiche dans la page cart.html ("panier") les informations des produits selectionnés dans le panier par le client
				displayTotaux(numberOfCanape,totalPrice);
			});
		}
	}else{
		// si le panier est vide : affachage du message "Votre panier est actuelement vide, cliquez sur "OK" puis sur la page d\'accueil  pour continuer, pour faire votre choix  !" dans le titre de la page
		document.getElementsByTagName("h1")[0].innerHTML = "Votre panier est actuellement vide !";
	}
}
// fonction "fetchORder" initialise et execute la fonction de l'API fetch pour obtenier le numero de commade "IdOrder"
function fetchOrder(formOrder,listId){
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
	}
	//const headerOrder = new Headers();
	const headerOrder = {
		//"Accept": "application/json",
		"Content-Type": "application/json"
	}
	const headerInit = {
		method: "POST",
		body: JSON.stringify(bodyOrder),
		headers: headerOrder,
		mode: 'cors',
		cache: 'default'
	};
	fetch("http://localhost:3000/api/products/order",headerInit)
		.then((statusConnect) => statusConnect.json())
		.then((dataRecive) => {
			const IdOrder = dataRecive.orderId;
			transmitOrderId(IdOrder);
		});// fin de APIfetch post pour la reception du IdOrder
}
// fonction "transmitOrderId" transmet le numero de commade "orderId" à la page confirmation.html via l'url
function transmitOrderId(IdOrder) {
	console.log('ici ligne 90 l IdOrder est :',IdOrder);
	window.location.href = "./confirmation.html" + "?orderId=" + IdOrder;
}
// fonction "isFormOrderValid" retourne "vrai" si le formulaire est bien valide sinon "faux"
function isFormOrderValid() {
	const formOrder = document.querySelector(".cart__order__form");
	const firstName = formOrder.elements.firstName.value;
	const regExp_firstName = / ^[a-zA-Z]+(?:-[a-zA-Z]+) ?$ /;
	const lastName = formOrder.elements.lastName.value;
	const regExp_lastName = / ^[a-zA-Z]+(?:-[a-zA-Z]+) ?$ /;
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
// fonction "orderFormInput" 
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
	}else if (!isFormOrderValid()) {
		alert('Désolé, mais le formulaire n\'est pas vailide :');
		return;
	}else{// ici le formulaire n est pas correctement rempli
		fetchOrder(formOrder,listId);
		return;
	}
}

function displayErrorStyle (inputId,errorMsgId) {
	document.getElementById(inputId).style.background = "red";
	document.getElementById(errorMsgId).innerHTML = "Saisie invalide !";
	setTimeout(() => {
		document.getElementById(inputId).style.background = "white";
		document.getElementById(errorMsgId).innerHTML = "Nouvelle saisie SVP !";
	},"4000");
}

displayCartUser();
//début de l event listener sur le bouton "Commander!"
const orderButton = document.getElementById("order");
orderButton.addEventListener('click', (e) => orderFormInput(e));
// fin de l event listener sur le bouton "Commander!"
//fin de cart.js























//sauvegarde:
//function buildOrderBody() {
	//const dataOrder = {
		//contact: {
			//firstName: "Manuel",
			//lastName: "MILLET",
			//address: "112 rue J.JAURES",
			//city: "BOURG",
			//email: "manuel.millet@numericable.fr"
		//},
		//product: ["107fb5b75607497b96722bda5b504926"]
	//};
	//return dataOrder;
//}
/*
function submitForm(e) {
	e.preventDefault();
	const firstNameElement = document.getElementById("firstName");
	const lastNameElement = document.getElementById("lastName");
	const addressElement = document.getElementById("address");
	const cityElement = document.getElementById("city");
	const emailElement = document.getElementById("email");
	const cart = new CartUser();
	if (cart.emptyCart(cart)){// si le panier est vide pas de commande ou non vadide
		alert('Désolé mais vous ne puvez pas faire de commande avec un panier vide !');
	}else{
		const form = document.querySelector(".cart__order__form");
		console.log('ligne 95 le formulaire est : ',form.elements);
		console.log('Le panier du client est :',cart);
		console.log('Prénom :',firstNameElement.value);
		console.log('Nom :',lastNameElement.value);
		console.log('Adresse :',addressElement.value);
		console.log('Ville :',cityElement.value);
		console.log('email :',emailElement.value);
		//const dataOrderBody = buildOrderBody();
		const dataOrder = {
			contact: {
				firstName: "Manuel",
				lastName: "MILLET",
				address: "112 rue J.JAURES",
				city: "BOURG",
				email: "manuel.millet@numericable.fr"
			},
			product: ["107fb5b75607497b96722bda5b504926"]
		}
		console.log('ligne 102 le body pour fetch est : ',dataOrder);

		fetch("http://localhost:3000/api/products/order",{
			method: "POST",

			body: JSON.stringify(dataOrder),

			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			}

			.then((statusConnect)  => statusConnect.json());
			.then((dataRecive) => {
				//IdOrder = dataRecive.orderId;
				console.log('retour de l apiORder',dataRecive)
			})
			
		});// fin de APIfetch post
	}
}//fin de la fonction submitForm
*/


/*
fetch('flowers.jpg',myInit)
.then(function(response) {
  return response.blob();
})
.then(function(myBlob) {
  var objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
});
*/