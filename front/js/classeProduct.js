/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 03 septemnre 18h00
ce fichier contient la classe "Product"
*/
//*********************************************************************************************************************************************************************************************//
// La classe "Product" contient les propriétés et les méthodes des produits représentant les canapés disponibles enregisteés dans le serveur en vu d'être afficher dans la page "index.html"
//*********************************************************************************************************************************************************************************************//
//La classe "Product" est définie dans le fichier "classeProduct.js"
class Product { 
  // Proproétés de l'objet "Product"
  constructor (_id,colors,altTxt,imageUrl,name,price,description) {
    this._id = _id;
    this.colors = colors;//tableau avec la liste des couleurs proposées
    this.altTxt = altTxt;
    this.imageUrl = imageUrl;
    this.name = name;
    this.price = price;
    this.description = description;
  }
  
  // Méthode "displayHomePage" affiche les caractéristiques de l'objet "Canape" dans la page d'accueil index.html
  displayHomePage(insertHtml) {
  //Création des éléments HTML pour un canapé
    const productLink = document.createElement("a");
    const productArticle = document.createElement("article");
    const productImage = document.createElement("img");
    const productName = document.createElement("h3");
    const productDescription = document.createElement("p");
    //Création des noeuds 
    const nodeName = document.createTextNode(this.name);// noeud "name"
    const nodeDescription = document.createTextNode(this.description);// noeud "description"
    //Création des tag pour les attributs
    const tagClassProductName = "productName";
    const tagClassProductDescription = "productDescription";
    const urlIdProduct = "./product.html?id=" + this._id;
    //Creation de l'élément HTML "a" avec le lien du produit 
    //insertHtml = "items";  
    document.getElementById(insertHtml).appendChild(productLink);
    productLink.setAttribute("href",urlIdProduct);
    //Creation de l'élément HTML "article"
    productLink.appendChild(productArticle);
    //Creation de l'élément HTML "img" avec le lien de l'image
    productArticle.appendChild(productImage);
    productImage.setAttribute("src", this.imageUrl);
    productImage.setAttribute("alt", this.altTxt);
    //Création de l'élément HTML titre "h3" avec le nom du produit
    productArticle.appendChild(productName);
    productName.setAttribute("class", tagClassProductName);
    productName.appendChild(nodeName);// noeud "name"  
    //Création de l'élément HTML "p" avec la descripttion
    productArticle.appendChild(productDescription);
    productDescription.setAttribute("class", tagClassProductDescription);
    productDescription.appendChild(nodeDescription);// noeud "description"
  }//fin de la méthode "displayHomePage"

  // Cette méthode "displayProduct" affiche les caractéristiques de la fiche produit du canapé choisi par le client
  //  dans la page product.html dès la reception de l'API fetch.
  displayProduct(imgClassname, titleId, priceId, descriptionId, colorsId) {
    const selectedCanapeImage = document.createElement("img");
    document.getElementsByClassName(imgClassname)[0].appendChild(selectedCanapeImage);
    selectedCanapeImage.setAttribute("src",this.imageUrl);
    selectedCanapeImage.setAttribute("alt",this.altTxt);
    // insertion du nom du canapé selectionné
    document.getElementById(titleId).innerHTML = this.name;
    // insertion du prix du canapé selectionné
    document.getElementById(priceId).innerHTML = this.price;
    // insertion de la description du canapé selectionné
    document.getElementById(descriptionId).innerHTML = this.description;
    // insertion des couleurs proposées avec l'élément HTML option
    for (let i in this.colors) {
      let colorChoiceProduct = String(this.colors[i]);
      let  selectedCanapeColor = document.createElement("option");
      let nodecolorOption = document.createTextNode(colorChoiceProduct);
      selectedCanapeColor.value = colorChoiceProduct;
      selectedCanapeColor.appendChild(nodecolorOption);
      let element = document.getElementById(colorsId);
      element.appendChild(selectedCanapeColor);
      }
  }// fin e la méthode "displayProduct"

  // Méthodes de l'objet ProductUser
  // Cette méthode "selectedChoice" teste la saisie les informations (couleur et quantité) sur le canapé selectionné par le client dans la page "product.html"
  // puis envoie le choix du client pour l'ajouter au panier dans "localStorage"
  selectedChoice(idProduct,buttonName) {
    const element = document.getElementById(buttonName);
    element.addEventListener('click', function() {// Attente de l'evenemnt "click" sur le bouton "nameButton" par l'utilisateur pour la selection du canapé
      let qty = Number.parseInt(Number(quantity.value));
      let testInteger = Number.isInteger(Number(quantity.value));
      // test de la validité pour la saisie de la couleur
      let checkInputProduct = false;
      if (colors.value == '' || colors.value == null || colors.value == undefined || typeof(colors.value) != "string") {
        alert('Le choix de la couleur n\'est pas correct, merci de recommencer !');
        checkInputProduct = false;
      }else{
        checkInputProduct = true;
      }
      // test de la validité de la saisie de la quantité
      if (qty <= 0 || qty > 100 || qty == null || qty == undefined || typeof(qty) != "number" || !testInteger) {
        alert('La quantité doit être un nombre entier compris entre 1 et 100, merci de recommencer !');
        checkInputProduct = false;
      }else{
        checkInputProduct = true;
      }
      if (checkInputProduct) {
        const choiceProduct = {id:idProduct, color:colors.value, quantity:qty};
        const cartUser = new CartUser();
        cartUser.addToCart(choiceProduct);
      } 
    })// Fin de addEventListener
  }// Fin de la méthode "selectedChoice"

  	// Méthodes pour l'affichage de la commande dadns la page cart.html
	// la méthode "displayInfosOrder" affiche les caractéristiques de tout les produits selectionnés par la client dans la page panier "cart.html"
	displayInfosOrder(colorSelected,qty) {
		//Création des éléments HTML pour la commande
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
		const orderButtonSupprimer = document.createElement("button");// class="deleteItem" texte bouton "Supprimer"
		// Création des syntaxes data
		const dataId = String(this._id);
		const dataColor = String(this.color);
		// Création des noeuds
		const nodeName = document.createTextNode(this.name);// noeud "name"
		const nodeColor = document.createTextNode(colorSelected);// noeud "color"
		const nodePrice = document.createTextNode(this.price + ",00" + " €");// noeud  "price"
		const nodeQuantity = document.createTextNode('Qté : ' + qty);// noeud "Quantity"
		const nodeSupprimer = document.createTextNode('Supprimer');// noeud "Suppimer"
		// Création des tags pour les attributs
		const parentSection = "cart__items";// section parent => <section id="cart__items">
		const tagClassArticle = "cart__item";
		const tagClassDiv1 = "cart__item__img";
		const tagClassDiv2 = "cart__item__content";
		const tagClassDiv3 = "cart__item__content__description";
		const tagClassDiv4 = "cart__item__content__settings";
		const tagClassDiv5 = "cart__item__content__settings__quantity";
		const tagClassInput = 'itemQuantity' + ' type="number" ' + ' name="itemQuantity" ' + ' min="1" ' + ' max="100" ' + ' value="42" ';
		const tagIdInput = "input" + this._id + colorSelected;
		const tagClassDiv6 = "cart__item__content__settings__delete";
		const tagClassButton = "deleteItem";
		const tagIdButton = "sup" + this._id + colorSelected;
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
		orderInput.setAttribute("id",tagIdInput);
		// *********************   Possibilité de modifier la quantité  *****************
		const elementInput = document.getElementById(tagIdInput);// tagInput = "input" + this._id + colorSelected
		elementInput.addEventListener('change', function() {
			let newQuantity = Number.parseInt(Number(elementInput.value));
			const testInteger = Number.isInteger(Number(elementInput.value));
			if (newQuantity === 0) {// quantité saisie = 0 
				alert('Pour modifier la quantité à "0" cliquez sur le bouton "Supprime"');
			}else if (typeof(newQuantity) !="number" || newQuantity == null || newQuantity == undefined || !testInteger){
				alert('La quantité saisie n\'est pas valide, merci de saisir un nombre entier compris entre 1 et 100');
			}else if (newQuantity < 0 || newQuantity > 100 ){
				alert('La quantité du produit selectionné doir être comprise entre 1 et 100 compris');
			}else{// ici la quqntité saisie est coorecte
				const cartUser = new CartUser();
				cartUser.updateQuantity(this._id,colorSelected,orderInput.value);
			}
		}.bind(this));	
		// Création de l'élément DIV6 class="cart__item__content__settings__delete"
		orderDiv5.appendChild(orderDiv6);
		orderDiv6.setAttribute("class",tagClassDiv6);
		// Création de l'élément paragraphe class="deleteItem" texte paragraphe "Supprimer"
		orderButtonSupprimer.appendChild(nodeSupprimer);
		orderDiv6.appendChild(orderButtonSupprimer);
		orderButtonSupprimer.setAttribute("class",tagClassButton);
		orderButtonSupprimer.setAttribute("id",tagIdButton);// tagIdButton = "sup" + this._id + colorSelected
		// *********************   Possibilité de supprimer une référence produit (son "ID" et sa "couleur") dans le panier   *****************
		const elementSup = document.getElementById(tagIdButton);
		elementSup.addEventListener('click', function() {
			if (confirm("Voulez-vous vraiment supprimer ce produit ?"+
						"\n avec le nom: "+ this.name +
						"\n et la couleur: "+ colorSelected
						) == true) {
				const cartUser = new CartUser();
				cartUser.removeFromCart(this._id,colorSelected);
			}else{
				alert("Suppression annulé !");
			}
		}.bind(this));
	}// Fin de la méthode d'affichage du panier dans la page cart.html

  // Méthode "displayTotaux" affiche le nombre total de canapé du panier ainsi que la somme totale de la commande dans la page panier "cart.js"
  displayTotaux(numberOfCanape,totalPrice){
    document.getElementById("totalQuantity").innerHTML = numberOfCanape;// "TotalNumberCanape"
    document.getElementById("totalPrice").innerHTML = totalPrice+' ,00';// "TotalNumberCanape"
  }// fin de la méthode "displayTotal"

}//fin de la classe "Product" 