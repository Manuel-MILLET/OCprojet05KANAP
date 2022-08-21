/*   
Script Projet OpenClassrooms n°05 "Kanap"
par Manuel MILLET le 21 août 2022 18h00
Script Javascript executé dans la page index.html pour l'affichage dynamique des Canapés disponible
*/
// construction de l'adresse url pour l'API products par leurs ID
const urlStocker = "http://localhost:3000" + "/api/products/";
catalogueCanapes = new Catalogue(urlStocker);