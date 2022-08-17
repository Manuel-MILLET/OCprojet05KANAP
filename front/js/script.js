/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 17 août 2022 18h00
Script Javascript executé dans la page index.html pour l'affichage dynamique des Canapés disponible
*/
// construction de l'adresse url pour l'API products par leurs ID
const urlProducts = "http://localhost:3000" + "/api/products";
fetch(urlProducts) // l'API fetch retourne l'objets "avialableCanapes"  qui contient toutes les caractéristiques de tous les canapés disponibles enrgistrées dans le seveur à l'adresse "urlProducts"
.then(statusConnect => statusConnect.json())
.then(availableCanape => {
    for (let i in availableCanape) {
		// La classe "Canape" est définie dans le fichier "classeCanape.js" 
		let getCanap = new Canape(availableCanape[i].colors, availableCanape[i]._id, availableCanape[i].name, availableCanape[i].price, availableCanape[i].imageUrl, availableCanape[i].description, availableCanape[i].altTxt, availableCanape[i].parentDiv, '');
		getCanap.displayHomePage();// méthode "displayInfosCanape" affiche tout les canapés dispononibles dans la page index.html
	}
})