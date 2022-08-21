/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 21 août 2022 18h00
ce fichier contient les classes "ProductUser".
*/
//*********************************************************************************************************************************************************************************************//
// La classe "ProductUser" contient les propriétés et les méthodes du produit représentant le produit selectionné par le client dans la page product.html
//*********************************************************************************************************************************************************************************************//
class ProductUser {
    constructor(urlCatalogue,idProduct,idOfSubmitButton) {
        fetch(urlCatalogue + idProduct) // l'API fetch retourne les caractéristiques de l'objet "getCanapSelected" venant du seveur à l'adresse "urlProductSelected"
        .then(statusConnect => statusConnect.json())
        .then(product => {
            this._id = product._id;
            this.colors = product.colors;
            this.altTxt = product.altTxt;
            this.imageUrl = product.imageUrl;
            this.name = product.name;
            this.price = product.price;
            this.description = product.description;
            this.buttonName = idOfSubmitButton;
            this.displayProduct('item__img', 'title', 'price', 'description', 'colors');
        })
    }

    // Cette méthode "displayProduct" affiche les caractéristiques de la fiche produit du canapé choisi par le client
    //  dans la page product.html dès la reception de l'API fetch.
    displayProduct(imgClassname, titleId, priceId, descriptionId, colorsId) {
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
  
    // Méthodes de l'objet ProductUser
    // Cette méthode "inputChoice" teste la saisie les informations (couleur et quantité) sur le canapé selectionné par le client dans la page "product.html"
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
                console.log('ici ligne 75 data of choiceProduct',idProduct,'couleur du produit :',colors.value,' quatité de produit',qty);
                let choiceProduct = {id:idProduct, color:colors.value, quantity:qty};
                console.log(' ici ligne 77 choix du produit',choiceProduct);
                let cartUser = new CartUser();
                cartUser.addToCart(choiceProduct);
            } 
        })// Fin de addEventListener
    }// Fin de la méthode selectedChoice
}// Fin de la classe "ProductUser"