/*Script Porjet OpenClassroom n°5 "Kanap"
par Manuel MILLET le 15 août 2022 17h00
Script de la page cart.html pour l'affichage du panier dans la page cart.html
*/
let cartUser = localStorage.getItem("cartUser");
if (cartUser !== null && cartUser !== undefined && cartUser !== []){
	cartUser = JSON.parse(cartUser);
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
			numberOfCanape += Number(qty);
			totalPrice += qty * orderProduct.price;
			displayTotaux(numberOfCanape,totalPrice);
			getFeature.displayInfosOrder();// affiche les informations du canapé du panier dans la page cart.html
		});
	}
}else{
	alert('Votre panier est actuelement vide, cliquez sur "OK" pour continuer, et faire votre choix  !');
}
function displayTotaux(numberOfCanape,totalPrice){
	document.getElementById("totalQuantity").innerHTML = numberOfCanape;// "TotalNumberCanape"
	document.getElementById("totalPrice").innerHTML = totalPrice+' ,00';// "TotalNumberCanape"
}// fin de la méthode "displayTotal"