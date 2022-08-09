/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 09 août 2022 15h00
Script Javascript executé dans la page index.html pour l'affichage dynamique des Canapés disponible
*/

// Chargement à partir du serveur via l'API fetch, puis affichage des caractéristiques des canapés disponibles dans la page d'accueil
function getCanapes () {
  const urlProducts = "http://localhost:3000" + "/api/products";// construction de l'adresse url pour l'API products par leurs ID
	fetch(urlProducts) // l'API fetch retourne l'objets "avialableCanapes"  qui contient toutes les caractéristiques de tous les canapés disponibles enrgistrées dans le seveur à l'adresse "urlProducts"
	.then(statusConnect => statusConnect.json())
	.then(availableCanapes => {
    	for (let i in availableCanapes) {
			let getCanap = new Canape(availableCanapes[i].colors, availableCanapes[i]._id, availableCanapes[i].name, availableCanapes[i].price, availableCanapes[i].imageUrl, availableCanapes[i].description, availableCanapes[i].altTxt, availableCanapes[i].parentDiv, i);
		}
  	}); 
};
getCanapes();