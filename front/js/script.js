/*   Script Porjet 05 Kanap par Manuel MILLET 04 juillet 2022
Script Javascript executé par la page index.html pour l'affichage dynamique des produits
*/

//const urlDeBase = "C:/Users/Manuel/Document/projet-05/sand-box-p05/back/models";
//const urlDeBase = "https://manuel-millet.github.io/OCprojet05KANAP/back/models";
const urlDeBase = "http://localhost:3000";
const urlProduits = urlDeBase + "/api/products";
class ListeCanape {
  constructor(colors, _id, name, price, imageUrl, description, altTxt) {
    this.colors = colors = [];
    this._id = _id;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.altTxt = altTxt;
  }
}
let listeCanapeDisponible = function () {
   fetch(urlProduits) // l'API fetch retourne l'objet products du seveur
    .then(statusConnect => statusConnect.json())
    .then(listeProduits => {
      console.log('données collectées => :',listeProduits);
      console.log('Il y a : ',listeProduits.length,' Canapé \(s\) disponible\(s\)');
      let blocSectionProduits = document.getElementById("items");
      for (i = 0; i < listeProduits.length; i++) {
        const productCard = `
          <a href="./product.html?id=${listeProduits[i]._id}">
            <article>
              <img
                src="${listeProduits[i].imageUrl}"
                alt="${listeProduits[i].altTxt}"
              />
              <h3 class="productName">${listeProduits[i].name}</h3>
              <p class="productDescription">
                ${listeProduits[i].description}
              </p>
            </article>
          </a>
        `;
        blocSectionProduits.innerHTML += productCard;
      }
    }); 
};
listeCanapeDisponible();




































/*
    // tableau comprenant la liste des produits Kanap au format JSON 
const products = [
  {
    "colors": ["Blue", "White", "Black"],
    "_id": "107fb5b75607497b96722bda5b504926",
    "name": "Kanap Sinopé",
    "price": 1849,
    "imageUrl": "kanap01.jpeg",
    "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "altTxt": "Photo d'un canapé bleu, deux places"
  },
  {
    "colors": ["Black/Yellow", "Black/Red"],
    "_id": "415b7cacb65d43b2b5c1ff70f3393ad1",
    "name": "Kanap Cyllène",
    "price": 4499,
    "imageUrl": "kanap02.jpeg",
    "description": "Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus.",
    "altTxt": "Photo d'un canapé jaune et noir, quattre places"
  },
  {
    "colors": ["Green", "Red", "Orange"],
    "_id": "055743915a544fde83cfdfc904935ee7",
    "name": "Kanap Calycé",
    "price": 3199,
    "imageUrl": "kanap03.jpeg",
    "description": "Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.",
    "altTxt": "Photo d'un canapé d'angle, vert, trois places"
  },
  {
    "colors": ["Pink", "White"],
    "_id": "a557292fe5814ea2b15c6ef4bd73ed83",
    "name": "Kanap Autonoé",
    "price": 1499,
    "imageUrl": "kanap04.jpeg",
    "description": "Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.",
    "altTxt": "Photo d'un canapé rose, une à deux place"
  },
  {
    "colors": ["Grey", "Purple", "Blue"],
    "_id": "8906dfda133f4c20a9d0e34f18adcf06",
    "name": "Kanap Eurydomé",
    "price": 2249,
    "imageUrl": "kanap05.jpeg",
    "description": "Ut laoreet vulputate neque in commodo. Suspendisse maximus quis erat in sagittis. Donec hendrerit purus at congue aliquam.",
    "altTxt": "Photo d'un canapé gris, trois places"
  },
  {
    "colors": ["Grey", "Navy"],
    "_id": "77711f0e466b4ddf953f677d30b0efc9",
    "name": "Kanap Hélicé",
    "price": 999,
    "imageUrl": "kanap06.jpeg",
    "description": "Curabitur vel augue sit amet arcu aliquet interdum. Integer vel quam mi. Morbi nec vehicula mi, sit amet vestibulum.",
    "altTxt": "Photo d'un canapé gris, deux places"
  },
  {
    "colors": ["Red", "Silver"],
    "_id": "034707184e8e4eefb46400b5a3774b5f",
    "name": "Kanap Thyoné",
    "price": 1999,
    "imageUrl": "kanap07.jpeg",
    "description": "EMauris imperdiet tellus ante, sit amet pretium turpis molestie eu. Vestibulum et egestas eros. Vestibulum non lacus orci.",
    "altTxt": "Photo d'un canapé rouge, deux places"
  },
  {
    "colors": ["Pink", "Brown", "Yellow", "White"],
    "_id": "a6ec5b49bd164d7fbe10f37b6363f9fb",
    "name": "Kanap orthosie",
    "price": 3999,
    "imageUrl": "kanap08.jpeg",
    "description": "Mauris molestie laoreet finibus. Aenean scelerisque convallis lacus at dapibus. Morbi imperdiet enim metus rhoncus.",
    "altTxt": "Photo d'un canapé rose, trois places"
  }
];

// mise forme de l'objet liste des produits et calcule du nombre de produit
const listeProduitsJson = JSON.stringify(products);
// liste des produits Kanap au format objet Javascript
const listeProduitsObjetJs = JSON.parse(listeProduitsJson);
let nbProduit = products.length;
//alert('nombre des produits:  ' + nbProduit);

// chemins pour les urls des liens id-produits et les images
const urlPageProduit = "./product.html?id="; //adresse url de la page "fiche produit" front/html/product.html avec l'identifiant produit en paramettre
const urlPageImage = "../../back/images/";

// fonction d'affichage des produits
function affichageProduits (nbProduit){
for (let i = 0; i < nbProduit; i++) {
  // création des éléments HTML pour un produit
  const uneAncre = document.createElement("a");
  const unArticle = document.createElement("article");
  const uneImage = document.createElement("img");
  const unTitreH3 = document.createElement("h3");
  const unPargraphe = document.createElement("p");

  // définition des noeuds
  const node0 = document.createTextNode('');
  const node1 = document.createTextNode('');
  const node2 = document.createTextNode('');

  // définition l'ancre pour le lien de id-produit
  uneAncre.appendChild(node0);
  document.getElementsByClassName("items")[0].appendChild(uneAncre);
  const urlProduit = urlPageProduit + products[i]._id;
  document.getElementsByTagName("a")[i+3].setAttribute("href", urlProduit);

  // définition de l'élément article
  unArticle.appendChild(node1);
  document.getElementsByTagName("a")[i+3].appendChild(unArticle);

  // définition de l'image du produit
  uneImage.appendChild(node2);
  document.getElementsByTagName("article")[i].appendChild(uneImage);
  const urlImageProduit = urlPageImage + products[i].imageUrl;
  const attImageProduit = products[i].altTxt;
  document.getElementsByTagName("img")[i+5].setAttribute("src", urlImageProduit);
  document.getElementsByTagName("img")[i+5].setAttribute("alt", attImageProduit);

  // définition du nom du produit titre h3
  document.getElementsByTagName("article")[i].appendChild(unTitreH3);
  document.getElementsByTagName("h3")[i].setAttribute("class", 'productName');
  document.getElementsByTagName("h3")[i].innerHTML = products[i].name ;

  // définition du paragraphe de description du produit
  document.getElementsByTagName("article")[i].appendChild(unPargraphe);
  document.getElementsByTagName("p")[i].setAttribute("class", 'productionDescription');
  document.getElementsByTagName("p")[i].innerHTML = products[i].description ;
}
};
affichageProduits(nbProduit);
*/