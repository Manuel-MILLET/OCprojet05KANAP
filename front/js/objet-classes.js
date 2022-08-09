/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 09 août 2022 15h00
ce fichier contient les classes "Canape", CartUser et Order.
*/

//******************************************************************************************************************************************************************//
// La classe "Canape" contient les propriétés et les méthodes des objets représentant les canapés disponibles enregisteés dans le serveur en vu d'être afficher dans la page "index.html"
//******************************************************************************************************************************************************************//
class Canape {
  constructor(colors, _id, name, price, imageUrl, description, altTxt, parentDiv, indiceCanape) {
    // Propriétées de l'objet Canape
    this.colors = colors;
    this._id = _id;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.altTxt = altTxt;
    this.parentDiv = parentDiv;
    this.indiceCanape = indiceCanape;
  // Méthode pour l'affichage dans la page d'accueil des caractéristiques de l'objet "Canape"
    this.init();
  }
  init() {
    this.displayInfosCanape();
  };
  displayInfosCanape() {;
    //Création des éléments HTML pour un canapé
    const productLink = document.createElement("a");
    const productArticle = document.createElement("article");
    const productImage = document.createElement("img");
    const productName = document.createElement("h3");
    const productDescription = document.createElement("p");
    //Création des noeuds 
    let nodeName = document.createTextNode(this.name);// noeud "name"
    let nodeDescription = document.createTextNode(this.description);// noeud "description"
    //Création des tag pour les attributs
    const parentDiv = "items";
    const tagClassProductName = "productName";
    const tagClassProductDescription = "productDescription";
    let urlIdProduct = "./product.html?id=" + this._id;
    //Creation de l'élément HTML "a" avec le lien du produit   
    document.getElementById(parentDiv).appendChild(productLink);
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
  }
}

//*************************************************************************************//
// La classe "CartUser" représente le panier du client.
// Les propriétés contiennent les caractéristiques du panier du client
// Les méthodes permetent d'afficher, d'ajouter les produits, les selectionnés etc...
//*************************************************************************************//
class CartUser {
  // Définition des propriétés de l'objet "CartUser"
  constructor(colors, _id, name, price, imageUrl, description, altTxt, submitButtonId) {
    this.colors = colors;
    this._id = _id;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.altTxt = altTxt;
    this.submitButtonId = submitButtonId;
    this.init();
  }
  // Cette méthode init() initialise l'objet "CartUser" avec la méthode "addToCart" après le clic sur "Ajouter au panier"
  init() {
    this.addToCart(this._id,this.submitButtonId,this.price);
  }
  // La méthode "addToCart" met à jour le panier objet "CartUser" dans localStorage après le click sur le bouton "Ajouter au panier":
  // Les arguments sont: this._id => c'est l'ID du produit selectionné: "idProductSelected"
  //                     this.submitButtonId => c'est le nom du bouton "Ajouter au panier" avec le name "nameButton" sur lequel le client clique pour l'ajouter à son panier
  addToCart(idProductSelected,nameButton) {
    const element = document.getElementById(nameButton);
    let check = true;// check est un flag qui signale une saisie correcte
    element.addEventListener('click', function() {// Attente de l'evenemnt "click" sur le bouton "nameButton" par l'utilisateur pour la selection du canapé
      let choiceProduct = new ChoiceProduct;
      choiceProduct = {id:idProductSelected, color:colors.value, quantity:Number(quantity.value)};
      //console.log('Le choix du client est : ', choiceProduct);
      if (colors.value == '' || colors.value == null || colors.value == undefined || typeof(colors.value) != "string") {
        alert('Le choix de la couleur n\'est pas correct, merci de recommencer !');
        check = false;
      }
      let qty = Number(quantity.value);
      if (qty <= 0 || qty > 100 || qty == null || qty == undefined || typeof(qty) != "number" ) {
        alert('La quantité doit être comprise entre 1 et 100, merci de recommencer !');
        check = false;
      }
      if (check) {// ici traitement du choix si la saisie (check) est correcte
        let cartUser = getCartUser();
        let cartLive = Array.isArray(cartUser);
        let cartLength = cartUser.length;
        if ( cartLive && cartLength <= 0 ){// Si le panier dans localStorage exsiste et si il est vide alors on ajoute le choix du client 
          //console.log('ici cartUser était vide donc on ajoute le choix ',choiceProduct);
          cartUser.push(choiceProduct);
          saveCartUser(cartUser); 
        }else{
          let update = 0;
          for (let indice in cartUser) {
            if (cartUser[indice].id != undefined && choiceProduct.id != undefined && cartUser[indice].id == choiceProduct.id) { // test si le produit choisi par le client et un produit du panier déjà enregistré ont le même id
              console.log('test si il y a déjà un canapé avec meme ID ddans le panier','avec l indice à  ',indice,cartUser[indice].id,choiceProduct.id);
              if (cartUser[indice].color != undefined && choiceProduct.color != undefined && cartUser[indice].color == choiceProduct.color) {// si le produit choisi et le produit enregistré ont le même id et la même couleur 
                if (cartUser[indice].quantity <= 0) {// si la quantité cumulée est négative alors on supprime le choix du client du panier
                  alert('Désolé, mais une quatité négative n\'est pas possible, le produit est supprimé du panier !');
                  removeChoiceUser(indice);// si la quantité cumulé est négative on supprime le produit d'indice "indice" du panier 
                }else{// ici il y a déjà un canapé enregistré avec le même ID et la même couleur, donc on cumul les deux quantités(canapé choisi et canapé enregistré)
                  cartUser[indice].quantity += choiceProduct.quantity;
                  update = 1;
                  break
                }
              }
            }
          }// Fin de la boucle for itération possibilité qu'il y a déjà un meme canapé dans le panier
          if (update == 0) {
            cartUser.push(choiceProduct);
          }
          saveCartUser(cartUser);
        }// Fin traitement panier vide
      }else{
      } // Fin condition check saisie
    })// Fin de addEventListener
  }// Fin de la méthode addToCart

  // Cette méthode "displayCard" affiche les caractéristiques de la fiche produit du canapé choisi
  //  dans la page HTML product.html dès la reception de l API fetch.
  displayCard(imgClassname, titleId, priceId, descriptionId, colorsId) {
    let selectedCanapeImage = document.createElement("img");
    document.getElementsByClassName(imgClassname)[0].appendChild(selectedCanapeImage);
    selectedCanapeImage.setAttribute("src",this.imageUrl);
    selectedCanapeImage.setAttribute("alt",this.altTxt);
    // insertion du nom du canapé selectionné
    document.getElementById(titleId).innerHTML = this.name;
    // insertion du prix du canapé selectionné
    document.getElementById(priceId).innerHTML = this.price;
    //console.log('au display le prix du canape est: ',this.price,'le type est :',typeof(this.price));
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
  }
}// Fin de la classe "CartUser"

class ChoiceProduct {
  // Définition des propriétés de l'objet "ChoiceProduct"
  constructor(id, color, quantity) {
    this.id = id;
    this.color = color;
    this.quantity = quantity;
    this.init();
  }
  // Définition de la méthode de l'objet "choiceProduct"
  init() {
    this.id = 0;
    this.color = "";
    this.quantity = 0;
  }
}// Fin de la classe "ChoiceProduct", qui comprend le choix du client pour un canapé d'une couleur

//****************************************************************************************************************//
// Classe "Order" qui conserne les commandes du panier
// Les propriétés contiennent les caractéristiques des demmandes du client
// Les méthodes permetent d' initialiser, d'afficher, d'ajouter les produits, supprimer des produits etc...
//****************************************************************************************************************//
class Order {
	constructor(cart__item, _id, color, imageUrl, altTxt, name, description, price, quantity) {
	// Propriétés de l'objet Order
	this.cart__item = cart__item;
	this._id = _id;
	this.color = color;
	this.imageUrl = imageUrl;
	this.altTxt = altTxt;
	this.name = name;
	this.description = description;
	this.price = price;
	this.quantity = quantity;
	this.init();
	}
	// Méthodes pour l'affichage de la commande
	init() {
		console.log('initialisation de la calsse Order');
	}
	displayInfosOrder() {;
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
	}// Fin de la méthode affichage de la commande
}// Fin de la classe Order