/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 10 août 2022 10h00
ce fichier contient la classe CartUser.
*/
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
  //  dans la page product.html dès la reception de l API fetch.
  displayCard(imgClassname, titleId, priceId, descriptionId, colorsId) {
    let selectedCanapeImage = document.createElement("img");
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
  }
}// Fin de la classe "CartUser"