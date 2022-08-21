/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 21 août 2022 18h00
ce fichier contient la classe "Catalogue"
*/
//*********************************************************************************************************************************************************************************************************//
// La classe "Catalogue" contient les propriétés  représentant les caractéristiques de tout les produits (canapés) disponibles enregisteés dans le serveur en vu d'être afficher dans la page "index.html"
//*********************************************************************************************************************************************************************************************************//
class Catalogue {
    constructor(urlStocker) {
        fetch(urlStocker) // l'API fetch retourne l'objet "dataCollectStock" qui contient tout les caractéristiques de tous les canapés disponibles enrgistrées dans le seveur à l'adresse "urlStocker"
        .then(statusConnect => statusConnect.json())
        .then(dataCollectStock => {
            for (let i in dataCollectStock) {// pour chaque canapé disponible
		        //La classe "Canape" est définie dans le fichier "classeCanape.js" 
                // elle instancie et affiche les caractéristiques du fichier dans la page index.html
                const insertHtml = 'items';// classe de la'élément html <section> (dans la page d'accueil index.html) où l'on affiche chaque canapé
		        let getCanape = new Canape(urlStocker, dataCollectStock[i]._id,insertHtml);
	        }
        })
    }    
}// fin de la classe Catalogue