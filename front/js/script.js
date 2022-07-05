/*   
Script Porjet 05 Kanap par Manuel MILLET 04 juillet 2022
Script Javascript executé par la page index.html pour l'affichage dynamique des produits
*/

// construction de l'adresse url pour l'API products par ID
const urlDeBase = "http://localhost:3000";
const urlProducts = urlDeBase + "/api/products";

// Classe objet des caractéristiques des canapés disponibles
class Canape {
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

// Chargement des données des caractéristiques canapés disponibles via l'API fetch

function getCanapes () {
  fetch(urlProducts) // l'API fetch retourne l'objet avialableCanapes venant du seveur à l'adresse "urlProducts"
    .then(statusConnect => statusConnect.json())
    .then(avialableCanapes => {
      let blocSectionProduits = document.getElementById("items");
      for (i = 0; i < avialableCanapes.length; i++) {
        const productCard =
        `
        <a href="./product.html?id=${avialableCanapes[i]._id}">
          <article>
            <img src="${avialableCanapes[i].imageUrl}" alt="${avialableCanapes[i].altTxt}"/>
            <h3 class="productName">${avialableCanapes[i].name}</h3>
            <p class="productDescription">${avialableCanapes[i].description}</p>
          </article>
        </a>
        `;
        blocSectionProduits.innerHTML += productCard;
      }
    }); 
};
getCanapes();
