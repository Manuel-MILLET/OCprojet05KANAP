/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 21 août 2022 18h00
ce fichier contient les classes "Canape"
*/
//*********************************************************************************************************************************************************************************************//
// La classe "Canape" contient les propriétés et les méthodes des produits représentant les canapés disponibles enregisteés dans le serveur en vu d'être afficher dans la page "index.html"
//*********************************************************************************************************************************************************************************************//
class Canape {  
  // Propriétées de l'objet Canape
  constructor(urlCatalogue,_id,insertHtml) {
    fetch(urlCatalogue + _id) // l'API fetch retourne les caractéristiques de l'objet "getCanapSelected" venant du seveur à l'adresse "urlProductSelected"
    .then(statusConnect => statusConnect.json())
    .then(canape => {
      this._id = canape._id;
      this.colors = canape.colors;
      this.altTxt = canape.altTxt;
      this.imageUrl = canape.imageUrl;
      this.name = canape.name;
      this.price = canape.price;
      this.description = canape.description;
      this.displayHomePage(insertHtml);
    })
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
    let nodeName = document.createTextNode(this.name);// noeud "name"
    let nodeDescription = document.createTextNode(this.description);// noeud "description"
    //Création des tag pour les attributs
    const tagClassProductName = "productName";
    const tagClassProductDescription = "productDescription";
    let urlIdProduct = "./product.html?id=" + this._id;
    //Creation de l'élément HTML "a" avec le lien du produit 
    //const parentDiv = "items";  
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
  }
}// fin de la classe "Canape"