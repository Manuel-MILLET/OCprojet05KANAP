/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 06 setembre 2022 18h00
Script Javascript executé dans la page index.html pour l'affichage dynamique des Canapés disponibles
*/
// Construction de l'adresse url pour l'API "/api/products" afin de charger la liste des canapés disponibles et les affaicher dans la page d'accueil "index.html"
const urlString = "http://localhost:3000" + "/api/products/";
const urlStocker = new URL(urlString);
const insertHtml = 'items';// 'items' représente l'id de l'élément html <section> (dans la page d'accueil index.html) où l'on désir afficher les caractéristiques de chaque canapé
fetch(urlStocker) // l'API fetch qui retourne l'objet "dataCollectStock" contenant toutes les caractéristiques de tout les canapés disponibles et enrgistrées dans le seveur à l'adresse "urlStocker"
    .then(statusConnect => statusConnect.json())
    .then(dataCollectStock => {
        for (let i in dataCollectStock) {// initialisation des propriétés pour chaque canapé disponible en stock:
            const getCanape = new Product(
                                    dataCollectStock[i]._id ,
                                    dataCollectStock[i].colors ,
                                    dataCollectStock[i].altTxt ,
                                    dataCollectStock[i].imageUrl ,
                                    dataCollectStock[i].name ,
                                    dataCollectStock[i].price ,
                                    dataCollectStock[i].description
                                    );
            // La méthode "displayHomePage", afffiche tout les produits disponibles dans la page "index.html "
            getCanape.displayHomePage(insertHtml);// insertHtml = 'items' représente l'id de l'élément html <section> (dans la page d'accueil index.html) où l'on désir afficher les caractéristiques de chaque canapé
        }
    })// fin de l'API fetch
// fin du script "script.js"