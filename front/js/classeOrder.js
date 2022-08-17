/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 17 août 2022 18h00
ce fichier contient la classe Order.
*/
//****************************************************************************************************************//
// La Classe "Order" conserne les produits du panier selectionnés par le client.
// Les propriétés contiennent les caractéristiques des produits.
// Les méthodes permetent d' initialiser, d'afficher, d'ajouter ou de supprimer des produits etc...
//****************************************************************************************************************//
class Order {
	constructor(_id, color, imageUrl, altTxt, name, description, price, quantity) {
		// Propriétés de l'objet Order
		this._id = _id;
		this.color = color;
		this.imageUrl = imageUrl;
		this.altTxt = altTxt;
		this.name = name;
		this.description = description;
		this.price = price;
		this.quantity = quantity;
	}
	// Méthodes pour l'affichage de la commande dadns la page cart.html
	// la méthode "" affiche les caractéristiques de tout les produits selectionnés par la client dans la page panier "cart.html"
	displayInfosOrder() {
		// Création des éléments HTML pour la commande
		const orderArticle = document.createElement("article");//class="cart__item" data-id="{product-ID}" data-color="{product-color}
		const orderDiv1 = document.createElement("div");//class="cart__item__img"
		const orderImage = document.createElement("img");//src="../images/product01.jpg" alt="Photographie d'un canapé"
		const orderDiv2 = document.createElement("div");//class="cart__item__content"
		const orderDiv3 = document.createElement("div");//class="cart__item__content__description
		const orderName = document.createElement("h2");// ici le nom du produit
		const orderColor = document.createElement("p");// ici la couleur du produit
		const orderPrice = document.createElement("p");// ici le prix du produit xx,yy €
		const orderDiv4 = document.createElement("div");// class="cart__item__content__settings"
		const orderDiv5 = document.createElement("div");// class="cart__item__content__settings__quantity"
		const orderParagrapheQuantity = document.createElement("p");// ici la Quantite du produit
		const orderInput = document.createElement("input");// type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42"
		const orderDiv6 = document.createElement("div");// class="cart__item__content__settings__delete"
		const orderParagrapheSupprimer = document.createElement("p");// class="deleteItem" texte paragraphe "Supprimer"
		// Création des syntaxes data
		let dataId = String(this._id);
		let dataColor = String(this.color);
		// Création des noeuds
		let nodeName = document.createTextNode(this.name);// noeud "name"
		let nodeColor = document.createTextNode(this.color);// noeud "color"
		let nodePrice = document.createTextNode(this.price + ",00" + " €");// noeud  "price"
		let nodeQuantity = document.createTextNode('Qté : ' + this.quantity);// noeud "Quantity"
		let nodeSupprimer = document.createTextNode('Supprimer');// noeud "Suppimer"
		// Création des tags pour les attributs
		const parentSection = "cart__items";// section parent => <section id="cart__items">
		const tagClassArticle = "cart__item";
		const tagClassDiv1 = "cart__item__img";
		const tagClassDiv2 = "cart__item__content";
		const tagClassDiv3 = "cart__item__content__description";
		const tagClassDiv4 = "cart__item__content__settings";
		const tagClassDiv5 = "cart__item__content__settings__quantity";
		const tagClassInput = 'itemQuantity' + ' type="number" ' + ' name="itemQuantity" ' + ' min="1" ' + ' max="100" ' + ' value="42" ';
		const tagClassDiv6 = "cart__item__content__settings__delete";
		const tagClasspara = "deleteItem";
		// Création des éléments HTML article
		document.getElementById(parentSection).appendChild(orderArticle);
		orderArticle.setAttribute("class",tagClassArticle);
		orderArticle.setAttribute("data-id",dataId);
		orderArticle.setAttribute("data-color",dataColor);
		// Création des éléments div cart__item__img
		orderArticle.appendChild(orderDiv1);
		orderDiv1.setAttribute("class",tagClassDiv1);
		// Création des éléments img
		orderDiv1.appendChild(orderImage);
		orderImage.setAttribute("src", this.imageUrl);
		orderImage.setAttribute("alt", this.altTxt);
		// Création des éléments DIV2 cart__item__content
		orderArticle.appendChild(orderDiv2);
		orderDiv2.setAttribute("class",tagClassDiv2);
		// Création de l'éléments DIV3 cart__item__content__description
		orderName.appendChild(nodeName);
		orderDiv2.appendChild(orderDiv3);
		orderDiv3.setAttribute("class",tagClassDiv3);
		// Création des éléments h2
		orderDiv3.appendChild(orderName);									
		// Création des éléments paragraphe COULEUR
		orderColor.appendChild(nodeColor);
		orderDiv3.appendChild(orderColor);
		// Création des éléments paragraphe PRIX
		orderPrice.appendChild(nodePrice);
		orderDiv3.appendChild(orderPrice);
		// Création de l'élément DIV4 class="cart__item__content__settings"
		orderDiv2.appendChild(orderDiv4);
		orderDiv4.setAttribute("class",tagClassDiv4);
		// Création de l'élément DIV5 class="cart__item__content__settings__quantity"
		orderDiv4.appendChild(orderDiv5);
		orderDiv5.setAttribute("class",tagClassDiv5);
		// Création de l'élément paragraphe QUANTITY
		orderParagrapheQuantity.appendChild(nodeQuantity);
		orderDiv5.appendChild(orderParagrapheQuantity);
		// Création de l'élément input
		orderDiv5.appendChild(orderInput);
		orderInput.setAttribute("class",tagClassInput);
		// Création de l'élément DIV6 class="cart__item__content__settings__delete"
		orderDiv5.appendChild(orderDiv6);
		orderDiv6.setAttribute("class",tagClassDiv6);
		// Création de l'élément paragraphe class="deleteItem" texte paragraphe "Supprimer"
		orderParagrapheSupprimer.appendChild(nodeSupprimer);
		orderDiv6.appendChild(orderParagrapheSupprimer);
		orderParagrapheSupprimer.setAttribute("class",tagClasspara);
	}// Fin de la méthode d'affichage du panier dans la page cart.html
}// Fin de la classe Order