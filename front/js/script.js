/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 03 setembre 2022 12h00
Script Javascript executé dans la page index.html pour l'affichage dynamique des Canapés disponible
*/
// construction de l'adresse url pour l'API "/api/products" pour charger la liste des canapés disponibles et les affaicher dans la page d'accueil "index.html"
const urlString = "http://localhost:3000" + "/api/products/";
const urlStocker = new URL(urlString);
// 'items' représente l'id de l'élément html <section> (dans la page d'accueil index.html) où l'on désir afficher les caractéristiques de chaque canapé
const insertHtml = 'items';
fetch(urlStocker) // l'API fetch retourne l'objet "dataCollectStock" qui contient tout les caractéristiques de tous les canapés disponibles et enrgistrées dans le seveur à l'adresse "urlStocker"
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
            getCanape.displayHomePage(insertHtml);// insertHtml = 'items' représente l'id de l'élément html <section> (dans la page d'accueil index.html) où l'on désir afficher les caractéristiques de chaque canapé
        }
    })
// fin du script "script.js"