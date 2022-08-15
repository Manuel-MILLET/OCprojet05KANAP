/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 15 août 2022 11h00
ce fichier contient les classes "Canape".
*/
//*********************************************************************************************************************************************************************************************//
// La classe "Canape" contient les propriétés et les méthodes des produits représentant les canapés disponibles enregisteés dans le serveur en vu d'être afficher dans la page "index.html"
//*********************************************************************************************************************************************************************************************//
class Canape {
  constructor(colors, _id, name, price, imageUrl, description, altTxt, parentDiv) {
    // Propriétées de l'objet Canape
    this.colors = colors;
    this._id = _id;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.altTxt = altTxt;
    this.parentDiv = parentDiv;
    }

    // Méthode "displayInfosCanape" affiche les caractéristiques de l'objet "Canape" dans la page d'accueil index.html
    displayInfosCanape() {
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
    // Cette méthode "displayCard" affiche les caractéristiques de la fiche produit du canapé choisi
    //  dans la page product.html dès la reception de l'API fetch.
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
}// fin de la classe "Canape"